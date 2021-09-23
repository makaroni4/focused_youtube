(function() {
  document.body.style.display = "block";

  var currentUrl = window.location.href;

  var cleanUpFYClasses = function() {
    document.body.classList.forEach(className => {
      if(className.startsWith("fy-")) {
        document.body.classList.remove(className);
      }
    });
  }

  var initFY = function() {
    cleanUpFYClasses();

    if(window.location.pathname === "/") {
      initHomePage();
    } else if(window.location.pathname === "/results") {
      initResultsPage();
    } else if(window.location.pathname === "/watch") {
      initWatchPage();
    }
  }

  var initWatchPage = function() {
    document.body.classList.add("fy-watch-page");
  }

  var initResultsPage = function() {
    document.body.classList.add("fy-results-page");
  }

  var initHomePage = function() {
	function search(event) {
	  event.preventDefault();

	  window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(anchor.querySelector('.search-form__text-input').value);
	}
	  
    document.body.classList.add("fy-home-page");

    const body = document.querySelector("body");
    const anchor = document.createElement("div");
    anchor.id = "mega-app";

    body.innerHTML = "";
    document.body.appendChild(anchor);
	anchor.innerHTML = `
        <div class="focused-youtube">
          <div class="focused-youtube__logo">
          </div>

          <div class="focused-youtube__body">
            <form class="focused-youtube__form search-form" action="#">
              <input class="search-form__text-input" type="text" placeholder="Search" />
              <button class="search-form__submit"></button>
            </form>
          </div>
        </div>
      `;
	  anchor.querySelector('.search-form').onsubmit = search;
  }

  var observeDOM = (function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var eventListenerSupported = window.addEventListener;

    return function(obj, callback) {
      if(MutationObserver) {
        var obs = new MutationObserver(function(mutations, observer) {
          if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            callback();
          }
        });

        obs.observe(obj, {
          childList:true,
          subtree:true
        });
      } else if(eventListenerSupported) {
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
})();
