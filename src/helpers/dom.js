import { pinLowestQuality } from "@helpers/youtube"

const nodeMatchesSelector = (node, selector) => {
  if (!node) return false

  if (node.matches && node.matches(selector)) {
    return true
  }

  if (node.querySelector && node.querySelector(selector)) {
    return true
  }

  return false
}

export const hideSectionByTitle = (titleText) => {
  const sections = document.querySelectorAll("ytd-shelf-renderer.style-scope.ytd-item-section-renderer")
  const section = Array.from(sections).find(section => {
    const title = section.querySelector("#title")

    if (title) {
      return title.innerText.includes(titleText)
    } else {
      return false
    }
  })

  if (section) {
    section.classList.add("fy-invisible")
  }
}

export const observeDOM = (obj, selector, callback) => {
  let observer = new window.MutationObserver(function (mutations) {
    if(mutations[0].addedNodes.length &&
      Array.from(mutations[0].addedNodes).some(node => nodeMatchesSelector(node, selector))) {

      callback()
    }
  })

  observer.observe(obj, {
    childList: true,
    subtree: true
  })
}

const THUMBNAIL_COVER_ID = "fy-thumbnail-cover"
let thumbnailCoverRetryTimer = null

const currentVideoId = () => {
  const fromQuery = new URLSearchParams(window.location.search).get("v")
  if (fromQuery) return fromQuery

  const liveMatch = window.location.pathname.match(/\/live\/([\w-]+)/)
  return liveMatch ? liveMatch[1] : null
}

export const removeThumbnailCover = () => {
  if (thumbnailCoverRetryTimer) {
    clearTimeout(thumbnailCoverRetryTimer)
    thumbnailCoverRetryTimer = null
  }

  const cover = document.getElementById(THUMBNAIL_COVER_ID)
  if (cover) {
    cover.remove()
  }
}

// Cover the player with the video's own thumbnail from i.ytimg.com. The player
// may not be mounted yet right after a navigation, so retry briefly.
const showThumbnailCover = (attempt = 0) => {
  if (thumbnailCoverRetryTimer) {
    clearTimeout(thumbnailCoverRetryTimer)
    thumbnailCoverRetryTimer = null
  }

  const videoId = currentVideoId()
  const player = document.querySelector("#movie_player")

  if (!videoId || !player) {
    if (attempt < 20) {
      thumbnailCoverRetryTimer = setTimeout(() => showThumbnailCover(attempt + 1), 250)
    }
    return
  }

  let cover = document.getElementById(THUMBNAIL_COVER_ID)
  if (!cover) {
    cover = document.createElement("div")
    cover.id = THUMBNAIL_COVER_ID
  }

  if (cover.parentElement !== player) {
    player.appendChild(cover)
  }

  // maxresdefault isn't available for every video; hqdefault always is and shows
  // through as a second background layer when the first one fails to load.
  cover.style.backgroundImage =
    `url("https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg"), ` +
    `url("https://i.ytimg.com/vi/${videoId}/hqdefault.jpg")`
}

// "video" plays normally, "thumbnail" and "black" hide the video and pin
// YouTube to its lowest quality to save data (audio is a separate stream).
export const applyVideoDisplayMode = (mode) => {
  const $body = document.body

  $body.classList.remove("fy-video-display--thumbnail", "fy-video-display--black")

  if (mode === "thumbnail") {
    $body.classList.add("fy-video-display--thumbnail")
    showThumbnailCover()
    pinLowestQuality()
  } else if (mode === "black") {
    $body.classList.add("fy-video-display--black")
    removeThumbnailCover()
    pinLowestQuality()
  } else {
    removeThumbnailCover()
  }
}

export const cleanUpFYClasses = () => {
  removeThumbnailCover()

  const currentFYBodyClasses = Array.from(document.body.classList).filter(className => className.startsWith("fy-"))

  currentFYBodyClasses.forEach(fyClassName => {
    document.body.classList.remove(fyClassName)
  })
}
