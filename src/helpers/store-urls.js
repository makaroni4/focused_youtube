/* global process */

const storeUrls = {
  chromium: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-youtube/",
  edge: "https://microsoftedge.microsoft.com/addons/detail/focused-youtube/[edge-extension-id]"
}

const reviewUrls = {
  chromium: "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/focused-youtube/reviews",
  edge: "https://microsoftedge.microsoft.com/addons/detail/focused-youtube/[edge-extension-id]"
}

const currentPlatform = process.env.MODE || "chromium"

export const storeUrl = storeUrls[currentPlatform] || storeUrls.chromium
export const reviewsUrl = (reviewUrls[currentPlatform] || reviewUrls.chromium)
