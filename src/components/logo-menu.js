export const mountLogoMenu = () => {
  const logoMenu = document.querySelector(".fy-logo-menu")

  if (logoMenu) {
    return
  }

  let logo = document.querySelector("#logo")

  if (!logo) {
    logo = document.querySelector(".fy-home-page__logo-container")
  }

  if (!logo) {
    return
  }

  const menu = document.createElement("div")
  menu.classList = "fy-logo-menu"

  menu.innerHTML = `
    <div class="fy-logo-menu__body">
      <div class="fy-logo-menu__links">
        <a href="/feed/subscriptions" class="fy-logo-menu__link fy-logo-menu__link--sub">Subscriptions</a>

        <a href="/feed/history" class="fy-logo-menu__link fy-logo-menu__link--history">Watch history</a>

        <a href="/feed/playlists" class="fy-logo-menu__link fy-logo-menu__link--playlists">Playlists</a>

        <a href="/playlist?list=WL" class="fy-logo-menu__link fy-logo-menu__link--watch-later">Watch later</a>

        <a href="/playlist?list=LL" class="fy-logo-menu__link fy-logo-menu__link--liked-videos">Liked videos</a>

        <a href="/account" class="fy-logo-menu__link fy-logo-menu__link--settings">Account</a>
      </div>
    </div>
  `

  logo.appendChild(menu)
}
