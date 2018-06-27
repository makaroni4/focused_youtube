(function() {
  document.body.style.display = "block";

  if(window.location.pathname !== "/") {
    return;
  }

  const body = document.querySelector("body");
  const anchor = document.createElement("div");
  anchor.id = "mega-app"

  body.innerHTML = "";
  document.body.appendChild(anchor);

  var app = new Vue({
    el: "#mega-app",
    data: {
      searchQuery: ""
    },
    methods: {
      search: function (event) {
        event.preventDefault();

        window.location.href = "https://www.youtube.com/results?search_query=" + encodeURI(this.searchQuery);
      }
    },
    template: `
      <div class="focused-youtube">
        <div class="focused-youtube__logo">
        </div>

        <div class="focused-youtube__body">
          <form class="focused-youtube__form search-form" action="#" v-on:submit="search">
            <input class="search-form__text-input" type="text" v-model="searchQuery" placeholder="Search" />
            <button class="search-form__submit"></button>
          </form>
        </div>
      </div>
    `
  });
})();
