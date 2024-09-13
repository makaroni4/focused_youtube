import {
  INFINITE_SCROLL_KEY,
  readStorageKeys
} from "@helpers/chrome-storage"

export const initSearchPage = () => {
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
