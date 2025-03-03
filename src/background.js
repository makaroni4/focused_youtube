import { browserAPI } from "@helpers/browser.js"

browserAPI.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browserAPI.tabs.create({
      url: "welcome.html"
    })
  }
})
