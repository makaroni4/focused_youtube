/* global process */

const storeUrls = {
  chromium: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

const reviewUrls = {
  chromium: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube/reviews/",
  edge: "https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil"
}

const currentPlatform = process.env.MODE || "chromium"

export const storeUrl = storeUrls[currentPlatform] || storeUrls.chromium
export const reviewsUrl = (reviewUrls[currentPlatform] || reviewUrls.chromium)
