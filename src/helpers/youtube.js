// Since we're removing sidebar recommendations, let's make a video occupy full width
export const clearTheaterModeCookie = () => {
  document.cookie = "wide=; Max-Age=0; path=/; domain=.youtube.com"
}

// YouTube restores the last playback quality from localStorage on every load,
// so pinning it to 144p makes hidden videos stream at the smallest size.
const YT_QUALITY_KEY = "yt-player-quality"
const FY_SAVED_QUALITY_KEY = "fy-saved-quality"
const YT_LOWEST_QUALITY = 144

const readQuality = () => {
  try {
    const raw = window.localStorage.getItem(YT_QUALITY_KEY)
    if (!raw) return null

    const quality = JSON.parse(JSON.parse(raw).data).quality
    return typeof quality === "number" ? quality : null
  } catch {
    return null
  }
}

const writeQuality = (quality) => {
  try {
    window.localStorage.setItem(YT_QUALITY_KEY, JSON.stringify({
      data: JSON.stringify({ quality, previousQuality: quality }),
      expiration: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      creation: new Date().getTime()
    }))
  } catch {
    // localStorage may be unavailable
  }
}

export const pinLowestQuality = () => {
  writeQuality(YT_LOWEST_QUALITY)
}

// Remember the user's quality before we pin it low, so we can put it back later.
export const saveOriginalQuality = () => {
  const quality = readQuality()

  if (quality && quality !== YT_LOWEST_QUALITY) {
    try {
      window.localStorage.setItem(FY_SAVED_QUALITY_KEY, String(quality))
    } catch {
      // localStorage may be unavailable
    }
  }
}

// Put the remembered quality back when returning to full video. If there's
// nothing to restore, just drop our pin so YouTube falls back to auto.
export const restoreSavedQuality = () => {
  let saved = null

  try {
    saved = window.localStorage.getItem(FY_SAVED_QUALITY_KEY)
    window.localStorage.removeItem(FY_SAVED_QUALITY_KEY)
  } catch {
    // localStorage may be unavailable
  }

  if (saved) {
    writeQuality(Number(saved))
  } else if (readQuality() === YT_LOWEST_QUALITY) {
    try {
      window.localStorage.removeItem(YT_QUALITY_KEY)
    } catch {
      // localStorage may be unavailable
    }
  }
}

// Reload the watch page but keep the playback position via YouTube's ?t= param,
// so the quality change applies without sending the video back to the start.
export const reloadPreservingPosition = () => {
  const video = document.querySelector("#movie_player video")
  const url = new URL(window.location.href)

  if (video && video.currentTime > 0) {
    url.searchParams.set("t", Math.floor(video.currentTime) + "s")
  }

  if (url.toString() === window.location.href) {
    window.location.reload()
  } else {
    window.location.href = url.toString()
  }
}

export const enableTheaterMode = () => {
  clearTheaterModeCookie()

  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  document.cookie = "wide=1; expires="+oneYearFromNow.toUTCString()+"; path=/; domain=.youtube.com"
}
