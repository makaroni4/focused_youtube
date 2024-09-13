export const mountLogoMenu = () => {
  const logoMenu = document.querySelector(".fy-logo-menu")

  if (logoMenu) {
    return
  }

  let logo = document.querySelector("#logo")

  if (!logo) {
    logo = document.querySelector(".fy-home-page__logo")
  }

  if (!logo) {
    return
  }

  const menu = document.createElement("div")
  menu.classList = "fy-logo-menu"

  menu.innerHTML = `
    <div class="fy-logo-menu__body">
      <div class="fy-logo-menu__links">
        <a href="/feed/history" class="fy-logo-menu__link">Watch history</a>

        <a href="/feed/playlists" class="fy-logo-menu__link">Playlists</a>

        <a href="/playlist?list=WL" class="fy-logo-menu__link">Watch later</a>

        <a href="/playlist?list=LL" class="fy-logo-menu__link">Liked videos</a>

        <a href="/account" class="fy-logo-menu__link">Account</a>
      </div>
    </div>
  `

  logo.appendChild(menu)
}
