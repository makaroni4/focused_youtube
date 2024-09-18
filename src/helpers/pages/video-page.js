import {
  SETTINGS_COMMENTS_KEY,
  SETTINGS_DESCRIPTION_KEY,
  readStorageKeys
} from "@helpers/chrome-storage"

export const initVideoPage = () => {
  document.body.classList.add("fy-watch-page")

  readStorageKeys([SETTINGS_COMMENTS_KEY, SETTINGS_DESCRIPTION_KEY], (config) => {
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
  })
}
