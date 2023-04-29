export const writeStorageData = (storageKey, value, callback) => {
  chrome.storage.local.set({ [storageKey]: value }, () => {
    if(callback) {
      callback(value)
    }
  })
}

export const readStorageData = (storageKey, callback) => {
  chrome.storage.local.get([storageKey], function(result) {
    const value = result[storageKey]

    callback(value)
  })
}
