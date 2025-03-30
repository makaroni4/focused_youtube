import { readStorageKeys, SETTINGS_SHORTS_KEY } from "@helpers/chrome-storage"
import { observeDOM } from "@helpers/dom"

export const initSubscriptionsPage = () => {
  const $body = document.querySelector("body")
  $body.classList.add("fy-subscriptions-page")

  readStorageKeys([SETTINGS_SHORTS_KEY], (config) => {
    if (typeof(config[SETTINGS_SHORTS_KEY]) === "undefined" || config[SETTINGS_SHORTS_KEY]) {
      $body.classList.add("fy--shorts-visible")
    } else {
      $body.classList.remove("fy--shorts-visible")
    }
  })

  const markShortsContainers = () => {
    // Find the first desktop Shorts element
    const desktopShort = document.querySelector("ytm-shorts-lockup-view-model-v2")

    if (desktopShort) {
      // Get the parent container for all Shorts
      let desktopContainer = desktopShort.closest("ytd-rich-section-renderer")
      if (desktopContainer) {
        desktopContainer.setAttribute("data-fy-shorts-container", "true")
      }
    }

    // Find the mobile Shorts container
    const mobileShort = document.querySelector("ytm-reel-shelf-renderer")
    if (mobileShort) {
      // Get the parent container for all Shorts
      let mobileContainer = mobileShort.closest("ytm-item-section-renderer")
      if (mobileContainer) {
        mobileContainer.setAttribute("data-fy-shorts-container", "true")
      }
    }
  }

  // Observe DOM for changes to mark new shorts containers
  observeDOM(document.body, "*", markShortsContainers)
  markShortsContainers()
} 