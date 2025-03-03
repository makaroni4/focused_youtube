/* global browser, __BROWSER_PLATFORM__ */

export const browserAPI = typeof browser !== "undefined" ? browser : chrome

export const browserPlatform = __BROWSER_PLATFORM__

export const extensionPageUrl = (pageName) => {
  const extensionId = browserAPI.runtime.id

  if (browserPlatform === "firefox") {
    return browser.runtime.getURL("welcome.html")
  }

  return `chrome-extension://${extensionId}/${pageName}`
}

const STORE_URLS = {
  chrome: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

const REVIEW_URLS = {
  chrome: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube/reviews/",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

export const storeUrl = STORE_URLS[browserPlatform]
export const reviewsUrl = REVIEW_URLS[browserPlatform]
