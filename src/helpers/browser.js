/* global browser, __BROWSER_PLATFORM__ */

export const browserAPI = typeof browser !== "undefined" ? browser : chrome

export const browserPlatform = __BROWSER_PLATFORM__
