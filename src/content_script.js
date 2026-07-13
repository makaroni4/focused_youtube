import {
  SETTINGS_COMMENTS_KEY,
  EXTENSION_ENABLED_KEY,
  INFINITE_SCROLL_KEY,
  SETTINGS_DESCRIPTION_KEY,
  SETTINGS_SHORTS_KEY,
  SETTINGS_VIDEO_DISPLAY_KEY,
  VIDEO_DISPLAY_DEFAULT,
  readStorageKeys,
  recordInstalledAtTimestamp
} from "@helpers/chrome-storage"

import "./style-overrides.css"

import {
  enableTheaterMode,
  clearTheaterModeCookie,
  saveOriginalQuality,
  restoreSavedQuality,
  reloadPreservingPosition
} from "@helpers/youtube"

import {
  observeDOM,
  hideSectionByTitle,
  cleanUpFYClasses,
  applyVideoDisplayMode
} from "@helpers/dom"

import { browserAPI } from "@helpers/browser.js"

import { mountReviewReminder } from "@components/review-reminder"
import { mountLogoMenu } from "@components/logo-menu"
import { initHomePage } from "@helpers/pages/home-page"
import { initVideoPage } from "@helpers/pages/video-page"
import { initPlaylistPage } from "@helpers/pages/playlist-page"
import { initPlaylistsPage } from "@helpers/pages/playlists-page"
import { initHistoryPage } from "@helpers/pages/history-page"
import { initChannelPage } from "@helpers/pages/channel-page"
import { initSearchPage } from "@helpers/pages/search-page"
import { initSubscriptionsPage } from "@helpers/pages/subscriptions-page"

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
  } else if (pathname === "/feed/subscriptions") {
    initSubscriptionsPage()
  } else if (pathname === "/playlist") {
    initPlaylistPage()
  } else if (pathname === "/feed/playlists") {
    initPlaylistsPage()
  } else if (pathname.startsWith("/@") || pathname.startsWith("/channel")) {  // channel begins with /@ or /channel
    initChannelPage()
  }

  document.body.classList.add("fy-page")

  setTimeout(() => {
    mountReviewReminder()
  }, 5000)
}

browserAPI.storage.onChanged.addListener((changes) => {
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

    if(key === SETTINGS_VIDEO_DISPLAY_KEY) {
      const mode = newValue || VIDEO_DISPLAY_DEFAULT
      const previousMode = changes[key].oldValue || VIDEO_DISPLAY_DEFAULT

      const enteringHidden = mode !== "video" && previousMode === "video"
      const returningToVideo = mode === "video" && previousMode !== "video"

      if (enteringHidden) {
        saveOriginalQuality()
      } else if (returningToVideo) {
        restoreSavedQuality()
      }

      applyVideoDisplayMode(mode)

      // YouTube only applies a quality change on load, so reload when toggling
      // between video and a hidden mode (keeping the playback position).
      // Thumbnail and black share the same quality, so switching between them
      // needs no reload.
      if (enteringHidden || returningToVideo) {
        if (document.visibilityState === "visible") {
          reloadPreservingPosition()
        } else {
          sessionStorage.setItem("fy_pending_reload", "true")
        }
      }
    }

    if(key === SETTINGS_SHORTS_KEY) {
      const $body = document.querySelector("body")

      if(newValue) {
        $body.classList.add("fy--shorts-visible")
      } else {
        $body.classList.remove("fy--shorts-visible")
      }
    }

    if(key === EXTENSION_ENABLED_KEY) {
      if(newValue) {
        enableTheaterMode()
      } else {
        clearTheaterModeCookie()
      }

      // When changing the extension state, we need to reload the page to properly
      // apply UI changes. That works terribly when we refresh 5 open YouTube tabs —
      // they start playing all at once. To mitigate that, we only reload
      // the current page and set the session flag to reload the page we can check
      // when opening another tab.
      if (document.visibilityState === "visible") {
        window.location.reload()
      } else {
        sessionStorage.setItem("fy_pending_reload", "true")
      }
    }
  }
})

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" &&
    sessionStorage.getItem("fy_pending_reload") === "true") {

    sessionStorage.removeItem("fy_pending_reload")
    window.location.reload()
  }
})

readStorageKeys([EXTENSION_ENABLED_KEY], (config) => {
  if(config[EXTENSION_ENABLED_KEY] || typeof(config[EXTENSION_ENABLED_KEY]) === "undefined") {
    initFY()

    mountLogoMenu()

    observeDOM(document.body, "ytd-shelf-renderer.style-scope.ytd-item-section-renderer", function () {
      hideSectionByTitle("For you")
      hideSectionByTitle("Latest posts from")
      hideSectionByTitle("Latest from")
      hideSectionByTitle("Popular today")
    })

    observeDOM(document.body, "ytd-topbar-logo-renderer#logo", function () {
      mountLogoMenu()
    })

    let currentUrl = window.location.href

    observeDOM(document.body, "*", function () {
      if (currentUrl !== window.location.href) {
        currentUrl = window.location.href

        initFY()
      }
    })
  } else {
    clearTheaterModeCookie()
  }
})
