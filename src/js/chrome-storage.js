export const writeStorageData = (storageKey, value, callback) => {
  chrome.storage.local.set({ [storageKey]: value }, () => {
    console.log(`${storageKey} is set to: `, value);

    if(callback) {
      callback(value);
    }
  });
}

export const readStorageData = (storageKey, callback) => {
  chrome.storage.local.get([storageKey], function(result) {
    console.log(`${storageKey} read as: `, result);

    const value = result[storageKey];

    callback(value);
  });
};
