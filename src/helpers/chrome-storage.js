export const EXTENSION_ENABLED_KEY = "settings:extension_enabled"
export const SETTINGS_COMMENTS_KEY = "settings:comments"
export const INFINITE_SCROLL_KEY = "settings:infinite_scroll"
export const SETTINGS_DESCRIPTION_KEY = "settings:description"
export const SETTINGS_SHORTS_IN_SUBSCRIPTIONS_KEY = "settings:shorts_in_subscriptions"
export const SETTINGS_RATING_LINK_CLICKED = "settings:rating_link_clicked"
export const EXTENSION_INSTALLED_AT = "settings:extension_installed_at"
export const SETTINGS_RATING_REMINDER_DISMISSED_AT = "settings:rating_reminder_dismissed_at"
import { browserAPI } from "@helpers/browser.js"

export const writeStorageData = (storageKey, value, callback) => {
  browserAPI.storage.local.set({ [storageKey]: value }, () => {
    if(callback) {
      callback(value)
    }
  })
}

export const readStorageKey = (storageKey, callback) => {
  browserAPI.storage.local.get([storageKey], function(result) {
    const value = result[storageKey]

    callback(value)
  })
}

export const readStorageKeys = (storageKeys, callback) => {
  browserAPI.storage.local.get(storageKeys, function(result) {
    callback(result)
  })
}

export const recordInstalledAtTimestamp = () => {
  readStorageKeys([EXTENSION_INSTALLED_AT], (config) => {
    if (config[EXTENSION_INSTALLED_AT]) {
      return
    } else {
      const now = Math.floor(new Date().getTime() / 1000)

      writeStorageData(EXTENSION_INSTALLED_AT, now, () => {})
    }
  })
}
