import { mountLogoMenu } from "@components/logo-menu"

export const initHomePage = () => {
  const search = (event) => {
    event.preventDefault()

    const query = anchor.querySelector(".fy-search-form__text-input").value
    window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query)
  }

  document.body.classList.add("fy-home-page")

  const body = document.querySelector("body")
  const anchor = document.createElement("div")
  anchor.id = "mega-app"

  body.innerHTML = ""
  document.body.appendChild(anchor)

  anchor.innerHTML = `
    <div class="fy-home-page">
      <div id="logo" class="fy-home-page__logo">
      </div>

      <div class="fy-home-page__body">
        <form class="fy-home-page__form fy-search-form" action="#">
          <input class="fy-search-form__text-input" type="text" placeholder="Search" autofocus />
          <button class="fy-search-form__submit"></button>
        </form>
      </div>
    </div>
  `

  anchor.querySelector(".fy-search-form").onsubmit = search

  mountLogoMenu()
}
