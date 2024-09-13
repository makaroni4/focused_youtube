import {
  SETTINGS_COMMENTS_KEY,
  EXTENSION_INSTALLED_AT,
  EXTENSION_ENABLED_KEY,
  INFINITE_SCROLL_KEY,
  SETTINGS_DESCRIPTION_KEY,
  writeStorageData,
  readStorageKeys
} from "@helpers/chrome-storage"

import "./style-overrides.css"

import {
  enableTheaterMode,
  clearTheaterModeCookie
} from "@helpers/youtube"

import { mountReviewReminder } from "@components/review-reminder"
import { mountLogoMenu } from "@components/logo-menu"
import { observeDOM, hideSectionByTitle } from "@helpers/dom"
import { initHomePage } from "@helpers/pages/home-page"
import { initVideoPage } from "@helpers/pages/video-page"
import { initPlaylistPage } from "@helpers/pages/playlist-page"
import { initHistoryPage } from "@helpers/pages/history-page"
import { initChannelPage } from "@helpers/pages/channel-page"
import { initSearchPage } from "@helpers/pages/search-page"

readStorageKeys([EXTENSION_INSTALLED_AT], (config) => {
  if (config[EXTENSION_INSTALLED_AT]) {
    return
  } else {
    const now = Math.floor(new Date().getTime() / 1000)

    writeStorageData(EXTENSION_INSTALLED_AT, now, () => {})
  }
})

document.body.style.display = "block"

let currentUrl = window.location.href

let cleanUpFYClasses = () => {
  document.body.classList.forEach(className => {
    if (className.startsWith("fy-")) {
      document.body.classList.remove(className)
    }
  })
}

const initFY = () => {
  cleanUpFYClasses()

  enableTheaterMode()

  const pathname = window.location.pathname

  if (pathname === "/") {
    initHomePage()
  } else if (pathname === "/results") {
    initSearchPage()
  } else if (pathname === "/watch" || pathname.match(/\/live\/[\w-]+/)) {
    initVideoPage()
  } else if (pathname === "/feed/history") {
    initHistoryPage()
  } else if (pathname === "/playlist") {
    initPlaylistPage()
  } else if (pathname.startsWith("/@") || pathname.startsWith("/channel")) {  // channel begins with /@ or /channel
    initChannelPage()
  }

  mountReviewReminder()
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
