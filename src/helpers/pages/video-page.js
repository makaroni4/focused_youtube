import {
  SETTINGS_COMMENTS_KEY,
  SETTINGS_DESCRIPTION_KEY,
  SETTINGS_VIDEO_DISPLAY_KEY,
  VIDEO_DISPLAY_DEFAULT,
  readStorageKeys
} from "@helpers/chrome-storage"

import { applyVideoDisplayMode } from "@helpers/dom"

export const initVideoPage = () => {
  document.body.classList.add("fy-watch-page")

  readStorageKeys([
    SETTINGS_COMMENTS_KEY,
    SETTINGS_DESCRIPTION_KEY,
    SETTINGS_VIDEO_DISPLAY_KEY
  ], (config) => {
    const $body = document.querySelector("body")

    if(typeof(config[SETTINGS_COMMENTS_KEY]) === "undefined" || config[SETTINGS_COMMENTS_KEY]) {
      $body.classList.add("fy-watch-page--comments-visible")
    } else {
      $body.classList.remove("fy-watch-page--comments-visible")
    }

    if(typeof(config[SETTINGS_DESCRIPTION_KEY]) === "undefined" || config[SETTINGS_DESCRIPTION_KEY]) {
      $body.classList.add("fy-watch-page--description-visible")
    } else {
      $body.classList.remove("fy-watch-page--description-visible")
    }

    applyVideoDisplayMode(config[SETTINGS_VIDEO_DISPLAY_KEY] || VIDEO_DISPLAY_DEFAULT)
  })
}
