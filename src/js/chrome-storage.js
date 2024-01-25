// IMPORTANT: the SETTINGS_COMMENTS_KEY and readStorageKey are
// duplicated in the extension.js file to avoid using modules. An extension
// with an import statement fails with It fails with "Can't use import
// statement outside a module".

export const SETTINGS_COMMENTS_KEY = "settings:comments"
export const INFINITE_SCROLL_KEY = "settings:infinite_scroll"

export const writeStorageData = (storageKey, value, callback) => {
  chrome.storage.local.set({ [storageKey]: value }, () => {
    if(callback) {
      callback(value)
    }
  })
}

export const readStorageKey = (storageKey, callback) => {
  chrome.storage.local.get([storageKey], function(result) {
    const value = result[storageKey]

    callback(value)
  })
}

export const readStorageKeys = (storageKeys, callback) => {
  chrome.storage.local.get(storageKeys, function(result) {
    callback(result)
  })
}
