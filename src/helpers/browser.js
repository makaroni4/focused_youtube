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
