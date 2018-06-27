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
      header: "Search Youtube",
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
        <div class="focused-youtube__body">
          <div class="focused-youtube__header">
            {{ header }}
          </div>

          <form class="focused-youtube__form" action="#" v-on:submit="search">
            <input type="text" v-model="searchQuery" />
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>
    `
  });
})();
