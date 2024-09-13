import {
  SETTINGS_COMMENTS_KEY,
  EXTENSION_ENABLED_KEY,
  INFINITE_SCROLL_KEY,
  SETTINGS_DESCRIPTION_KEY,
  readStorageKeys,
  recordInstalledAtTimestamp
} from "@helpers/chrome-storage"

import "./style-overrides.css"

import {
  enableTheaterMode,
  clearTheaterModeCookie
} from "@helpers/youtube"

import {
  observeDOM,
  hideSectionByTitle,
  cleanUpFYClasses
} from "@helpers/dom"

import { mountReviewReminder } from "@components/review-reminder"
import { mountLogoMenu } from "@components/logo-menu"
import { initHomePage } from "@helpers/pages/home-page"
import { initVideoPage } from "@helpers/pages/video-page"
import { initPlaylistPage } from "@helpers/pages/playlist-page"
import { initPlaylistsPage } from "@helpers/pages/playlists-page"
import { initHistoryPage } from "@helpers/pages/history-page"
import { initChannelPage } from "@helpers/pages/channel-page"
import { initSearchPage } from "@helpers/pages/search-page"

recordInstalledAtTimestamp()

document.body.style.display = "block"

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
  } else if (pathname === "/feed/playlists") {
    initPlaylistsPage()
  } else if (pathname.startsWith("/@") || pathname.startsWith("/channel")) {  // channel begins with /@ or /channel
    initChannelPage()
  }

  setTimeout(() => {
    mountReviewReminder()
  }, 5000)
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
  let currentUrl = window.location.href

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
