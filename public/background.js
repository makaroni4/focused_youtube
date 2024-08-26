const EXTENSION_ENABLED_KEY = "settings:extension_enabled"
const CONTENT_SCRIPT = {
  matches: [
    "https://www.youtube.com/*",
    "https://m.youtube.com/*"
  ],
  js: ["assets/extension.js"],
  css: ["assets/extension.css"],
  runAt: "document_end",
  allFrames: true
}

const updateContentScript = (enabled) => {
  chrome.scripting.getRegisteredContentScripts((scripts) => {
    const scriptExists = scripts.some(script => script.id === "focused-youtube-script")

    if (enabled && !scriptExists) {
      chrome.scripting.registerContentScripts([{
        id: "focused-youtube-script",
        ...CONTENT_SCRIPT
      }], () => {
        // console.log("Content script injected.")
      })
    } else if (!enabled && scriptExists) {
      chrome.scripting.unregisterContentScripts({ ids: ["focused-youtube-script"] }, () => {
        // console.log("Content script removed.")
      })
    }
  })
}

chrome.storage.local.get([EXTENSION_ENABLED_KEY], (result) => {
  updateContentScript(result[EXTENSION_ENABLED_KEY] !== false)
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes[EXTENSION_ENABLED_KEY]) {
    updateContentScript(changes[EXTENSION_ENABLED_KEY].newValue !== false)
  }
})
