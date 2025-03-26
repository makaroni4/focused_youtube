import {
  INFINITE_SCROLL_KEY,
  SETTINGS_SHORTS_KEY,
  readStorageKeys
} from "@helpers/chrome-storage"

export const initSearchPage = () => {
  document.body.classList.add("fy-results-page")

  readStorageKeys([INFINITE_SCROLL_KEY, SETTINGS_SHORTS_KEY], (config) => {
    const $body = document.querySelector("body")

    if(typeof(config[INFINITE_SCROLL_KEY]) === "undefined" || config[INFINITE_SCROLL_KEY]) {
      $body.classList.add("fy-results-page--infinite-scroll-enabled")
    } else {
      $body.classList.remove("fy-results-page--infinite-scroll-enabled")
    }

    if (typeof(config[SETTINGS_SHORTS_KEY]) === "undefined" || config[SETTINGS_SHORTS_KEY]) {
      $body.classList.add("fy--shorts-visible")
    } else {
      $body.classList.remove("fy--shorts-visible")
    }
  })
}
