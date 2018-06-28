(function() {
  document.body.style.display = "block";

  var currentUrl = window.location.href;

  var initFY = function() {
    console.log("--> initFY");

    if(window.location.pathname === "/") {
      initHomePage();
    } else if(window.location.pathname === "/results") {
      initResultsPage();
    }
  }

  var initResultsPage = function() {
    document.body.classList.add("fy-results-page");
  }

  var initHomePage = function() {
    document.body.classList.add("fy-home-page");

    const body = document.querySelector("body");
    const anchor = document.createElement("div");
    anchor.id = "mega-app";

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
  }

  var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
      if(MutationObserver){
        var obs = new MutationObserver(function(mutations, observer){
            if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                callback();
        });

        obs.observe( obj, { childList:true, subtree:true });
      } else if(eventListenerSupported){
        obj.addEventListener("DOMNodeInserted", callback, false);
        obj.addEventListener("DOMNodeRemoved", callback, false);
      }
    };
  })();

  initFY();

  observeDOM(document.body, function(){
    if(currentUrl !== window.location.href) {
      currentUrl = window.location.href;
      initFY();
    }
  });

  console.log("--> Loading Focused Youtube Extension");
})();
