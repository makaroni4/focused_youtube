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

export const cleanUpFYClasses = () => {
  const currentFYBodyClasses = Array.from(document.body.classList).filter(className => className.startsWith("fy-"))

  currentFYBodyClasses.forEach(fyClassName => {
    document.body.classList.remove(fyClassName)
  })
}
