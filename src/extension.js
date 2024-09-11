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

const EXTENSION_ENABLED_KEY = "settings:extension_enabled"
const SETTINGS_COMMENTS_KEY = "settings:comments"
const INFINITE_SCROLL_KEY = "settings:infinite_scroll"
const SETTINGS_DESCRIPTION_KEY = "settings:description"

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
const clearTheaterModeCookie = () => {
  document.cookie = "wide=; Max-Age=0; path=/; domain=.youtube.com"
}

const enableTheaterMode = () => {
  clearTheaterModeCookie()

  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  document.cookie = "wide=1; expires="+oneYearFromNow.toUTCString()+"; path=/; domain=.youtube.com"
}


const initFY = () => {
  console.log("--> Sending message")

  mountReviewReminder()

  setTimeout(3000, () => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      id: chrome.runtime.id,
      action: "rating-reminder"
    })
  })

  cleanUpFYClasses()

  enableTheaterMode()

  const pathname = window.location.pathname

  if (pathname === "/") {
    initHomePage()
  } else if (pathname === "/results") {
    initResultsPage()
  } else if (pathname === "/watch" || pathname.match(/\/live\/[\w-]+/)) {
    initWatchPage()
  } else if (pathname === "/feed/history") {
    initHistoryPage()
  } else if (pathname === "/playlist") {
    initPlaylistPage()
  } else if (pathname.startsWith("/@") || pathname.startsWith("/channel")) {  // channel begins with /@ or /channel
    initChannelPage()
  }
}

const mountLogoMenu = () => {
  const logoMenu = document.querySelector(".fy-logo-menu")

  if (logoMenu) {
    return
  }

  let logo = document.querySelector("#logo")

  if (!logo) {
    logo = document.querySelector(".fy-home-page__logo")
  }

  if (!logo) {
    return
  }

  const menu = document.createElement("div")
  menu.classList = "fy-logo-menu"

  menu.innerHTML = `
    <div class="fy-logo-menu__body">
      <div class="fy-logo-menu__links">
        <a href="/feed/history" class="fy-logo-menu__link">Watch history</a>

        <a href="/feed/playlists" class="fy-logo-menu__link">Playlists</a>

        <a href="/playlist?list=WL" class="fy-logo-menu__link">Watch later</a>

        <a href="/playlist?list=LL" class="fy-logo-menu__link">Liked videos</a>

        <a href="/account" class="fy-logo-menu__link">Account</a>
      </div>
    </div>
  `

  logo.appendChild(menu)
}

const mountReviewReminder = () => {
  const menu = document.createElement("div")
  menu.classList = "fy-review-reminder"

  menu.innerHTML = `
    <div class="fy-review-reminder__body">
      LEAVE A REVIEW PLEASE
    </div>
  `

  const $body = document.querySelector("body")
  $body.appendChild(menu)
}

const initWatchPage = () => {
  document.body.classList.add("fy-watch-page")

  readStorageKeys([SETTINGS_COMMENTS_KEY, SETTINGS_DESCRIPTION_KEY], (config) => {
    const $body = document.querySelector("body")

    if(config[SETTINGS_COMMENTS_KEY]) {
      $body.classList.add("fy-watch-page--comments-visible")
    } else {
      $body.classList.remove("fy-watch-page--comments-visible")
    }

    if(config[SETTINGS_DESCRIPTION_KEY]) {
      $body.classList.add("fy-watch-page--description-visible")
    } else {
      $body.classList.remove("fy-watch-page--description-visible")
    }
  })
}

const initHistoryPage = () => {
  document.body.classList.add("fy-history-page")
}

const initPlaylistPage = () => {
  document.body.classList.add("fy-playlist-page")
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
      <div id="logo" class="fy-home-page__logo">
      </div>

      <div class="fy-home-page__body">
        <form class="fy-home-page__form fy-search-form" action="#">
          <input class="fy-search-form__text-input" type="text" placeholder="Search" autofocus />
          <button class="fy-search-form__submit"></button>
        </form>
      </div>
    </div>
  `

  anchor.querySelector(".fy-search-form").onsubmit = search

  mountLogoMenu()

  mountReviewReminder()
}

const nodeMatchesSelector = (node, selector) => {
  if (!node) return false

  if (node.matches && node.matches(selector)) {
    return true
  }

  if (node.querySelector && node.querySelector(selector)) {
    return true
  }

  return false
}

const observeDOM = (function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  const eventListenerSupported = window.addEventListener

  return function (obj, selector, callback) {
    if (MutationObserver) {
      let obs = new MutationObserver(function (mutations) {
        if(mutations[0].addedNodes.length &&
          Array.from(mutations[0].addedNodes).some(node => nodeMatchesSelector(node, selector))) {

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

const hideSectionByTitle = (titleText) => {
  const sections = document.querySelectorAll("ytd-shelf-renderer.style-scope.ytd-item-section-renderer")
  const section = Array.from(sections).find(section => {
    const title = section.querySelector("#title")

    if (title) {
      return title.innerText.includes(titleText)
    } else {
      return false
    }
  })

  if (section) {
    section.classList.add("fy-invisible")
  }
}

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

    if(key === SETTINGS_DESCRIPTION_KEY) {
      const $body = document.querySelector("body")

      if(newValue) {
        $body.classList.add("fy-watch-page--description-visible")
      } else {
        $body.classList.remove("fy-watch-page--description-visible")
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

    if(key === EXTENSION_ENABLED_KEY) {
      if(newValue) {
        enableTheaterMode()
      } else {
        clearTheaterModeCookie()
      }

      window.location.reload()
    }
  }
})

readStorageKeys([EXTENSION_ENABLED_KEY], (config) => {
  if(config[EXTENSION_ENABLED_KEY] || typeof(config[EXTENSION_ENABLED_KEY]) === "undefined") {
    initFY()

    mountLogoMenu()

    observeDOM(document.body, "*", function () {
      if (currentUrl !== window.location.href) {
        currentUrl = window.location.href

        initFY()
      }
    })

    observeDOM(document.body, "ytd-shelf-renderer.style-scope.ytd-item-section-renderer", function () {
      hideSectionByTitle("For you")
      hideSectionByTitle("Latest posts from")
      hideSectionByTitle("Latest from")
      hideSectionByTitle("Popular today")
    })

    observeDOM(document.body, "ytd-topbar-logo-renderer#logo", function () {
      mountLogoMenu()
    })
  } else {
    clearTheaterModeCookie()
  }
})
