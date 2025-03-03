import { browserPlatform } from "@helpers/browser.js"

const storeUrls = {
  chrome: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

const reviewUrls = {
  chrome: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube/reviews/",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

export const storeUrl = storeUrls[browserPlatform] || storeUrls.chrome
export const reviewsUrl = (reviewUrls[browserPlatform] || reviewUrls.chrome)
