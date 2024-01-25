// import { SETTINGS_COMMENTS_KEY, readStorageKey } from "@js/chrome-storage"

// I can't import SETTINGS_COMMENTS_KEY and readStorageKey since
// it'll produce a dist/chrome-storage.js file that can't be imported
// when the dist/extension.js is injected into a page. It fails with
// an error "Can't use import statement outside a module".

const readStorageKeys = (storageKeys, callback) => {
  chrome.storage.local.get(storageKeys, function(result) {
    callback(result)
  })
}

const SETTINGS_COMMENTS_KEY = "settings:comments"
const INFINITE_SCROLL_KEY = "settings:infinite_scroll"

import "./style-overrides.css"

document.body.style.display = "block"

let currentUrl = window.location.href

let cleanUpFYClasses = () => {
  document.body.classList.forEach(className => {
    if (className.startsWith("fy-")) {
      document.body.classList.remove(className)
    }
  })
}

// Since we're removing sidebar recommendations, let's make a video occupy full width
const enableTheaterMode = () => {
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  document.cookie = "wide=; Max-Age=0; path=/; domain=.youtube.com"
  document.cookie = "wide=1; expires="+oneYearFromNow.toUTCString()+"; path=/; domain=.youtube.com"
}

const initFY = () => {
  cleanUpFYClasses()

  enableTheaterMode()

  if (window.location.pathname === "/") {
    initHomePage()
  } else if (window.location.pathname === "/results") {
    initResultsPage()
  } else if (window.location.pathname === "/watch") {
    initWatchPage()
  } else if (window.location.pathname.startsWith("/@") || window.location.pathname.startsWith("/channel")) {  // channel begins with /@ or /channel
    initChannelPage()
  }
}

const initWatchPage = () => {
  document.body.classList.add("fy-watch-page")

  readStorageKeys([SETTINGS_COMMENTS_KEY], (config) => {
    const $body = document.querySelector("body")

    if(config[SETTINGS_COMMENTS_KEY]) {
      $body.classList.add("fy-watch-page--comments-visible")
    } else {
      $body.classList.remove("fy-watch-page--comments-visible")
    }
  })
}

const initResultsPage = () => {
  document.body.classList.add("fy-results-page")

  readStorageKeys([INFINITE_SCROLL_KEY], (config) => {
    const $body = document.querySelector("body")

    if(config[INFINITE_SCROLL_KEY]) {
      $body.classList.add("fy-results-page--infinite-scroll-enabled")
    } else {
      $body.classList.remove("fy-results-page--infinite-scroll-enabled")
    }
  })
}

const initChannelPage = () => {
  document.body.classList.add("fy-channel-page")
}

const initHomePage = () => {
  const search = (event) => {
    event.preventDefault()

    const query = anchor.querySelector(".fy-search-form__text-input").value
    window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query)
  }

  document.body.classList.add("fy-home-page")

  const body = document.querySelector("body")
  const anchor = document.createElement("div")
  anchor.id = "mega-app"

  body.innerHTML = ""
  document.body.appendChild(anchor)

  anchor.innerHTML = `
    <div class="fy-home-page">
      <div class="fy-home-page__logo">
      </div>

      <div class="fy-home-page__body">
        <form class="fy-home-page__form fy-search-form" action="#">
          <input class="fy-search-form__text-input" type="text" placeholder="Search" />
          <button class="fy-search-form__submit"></button>
        </form>
      </div>
    </div>
  `

  anchor.querySelector(".fy-search-form").onsubmit = search
}

const observeDOM = (function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  const eventListenerSupported = window.addEventListener

  return function (obj, callback) {
    if (MutationObserver) {
      let obs = new MutationObserver(function (mutations) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback()
        }
      })

      obs.observe(obj, {
        childList: true,
        subtree: true
      })
    } else if (eventListenerSupported) {
      obj.addEventListener("DOMNodeInserted", callback, false)
      obj.addEventListener("DOMNodeRemoved", callback, false)
    }
  }
})()

initFY()

observeDOM(document.body, function () {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href

    initFY()
  }
})

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if(key === SETTINGS_COMMENTS_KEY) {
      const $body = document.querySelector("body")

      if(newValue) {
        $body.classList.add("fy-watch-page--comments-visible")
      } else {
        $body.classList.remove("fy-watch-page--comments-visible")
      }
    }

    if(key === INFINITE_SCROLL_KEY) {
      const $body = document.querySelector("body")

      if(newValue) {
        $body.classList.add("fy-results-page--infinite-scroll-enabled")
      } else {
        $body.classList.remove("fy-results-page--infinite-scroll-enabled")
      }
    }
  }
})
