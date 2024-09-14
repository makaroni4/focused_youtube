import {
  EXTENSION_INSTALLED_AT,
  SETTINGS_RATING_REMINDER_DISMISSED_AT,
  SETTINGS_RATING_LINK_CLICKED,
  writeStorageData,
  readStorageKeys
} from "@helpers/chrome-storage"
import {
  getTime,
  timeDiffInDays
} from "@helpers/time"

export const mountReviewReminder = () => {
  if (document.querySelector(".fy-review-reminder")) {
    return
  }

  readStorageKeys([
      SETTINGS_RATING_REMINDER_DISMISSED_AT,
      SETTINGS_RATING_LINK_CLICKED,
      EXTENSION_INSTALLED_AT
    ], (config) => {
    if(!config[EXTENSION_INSTALLED_AT]) {
      return
    }

    if (config[SETTINGS_RATING_LINK_CLICKED]) {
      return
    }

    const dismissedAt = config[SETTINGS_RATING_REMINDER_DISMISSED_AT]
    const installedAt = config[EXTENSION_INSTALLED_AT]
    const now = getTime()
    const dismissedDaysAgo = dismissedAt ? timeDiffInDays(dismissedAt, now) : -1
    const installedDaysAgo = timeDiffInDays(installedAt, now)
    const RATING_REMINDER_FREQUENCY = 90 // days
    const RATING_REMINDER_DELAY = 7 // days

    if (installedDaysAgo <= RATING_REMINDER_DELAY) {
      return
    }

    if (dismissedDaysAgo <= RATING_REMINDER_FREQUENCY) {
      return
    }

    const menu = document.createElement("div")
    menu.classList = "fy-review-reminder"

    menu.innerHTML = `
      <div class="fy-review-reminder__body">
        <div class="fy-review-reminder__close js-fy-close-review-reminder">
          Dismiss
        </div>

        <div class="fy-review-reminder__container">
          <div class="fy-review-reminder__logo">
          </div>

          <div class="fy-review-reminder__copy">
            Focused YouTube is built with your feedback – leave a review and help spread the word! ⭐️
          </div>

          <a class="fy-review-reminder__cta js-fy-leave-review">
            Leave a review
          </a>
        </div>
      </div>
    `

    const $body = document.querySelector("body")
    $body.appendChild(menu)

    const $closeLink = $body.querySelector(".js-fy-close-review-reminder")

    $closeLink.addEventListener("click", e => {
      e.preventDefault()

      const now = getTime()

      writeStorageData(SETTINGS_RATING_REMINDER_DISMISSED_AT, now, () => {
        menu.remove()
      })
    })

    const $reviewLink = $body.querySelector(".js-fy-leave-review")
    $reviewLink.addEventListener("click", e => {
      e.preventDefault()

      writeStorageData(SETTINGS_RATING_LINK_CLICKED, 1, () => {
        window.location.href = "https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en"
      })
    })
  })
}
