chrome.runtime.onMessage.addListener(function(request) {
  console.log("--> RATING REMINDER MESSAGE RECEIVED", request)

  chrome.action.openPopup({}, () => {
    console.log("--> openPopup")
  })
})
