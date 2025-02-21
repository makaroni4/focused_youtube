const browsers = {
  chrome: {
    target: 'chrome',
    manifestVersion: 3,
    browserSpecific: {}
  },
  firefox: {
    target: 'firefox',
    manifestVersion: 2,
    browserSpecific: {
      browser_specific_settings: {
        gecko: {
          id: "{focused-youtube@example.com}",
          strict_min_version: "57.0"
        }
      }
    }
  },
  edge: {
    target: 'edge',
    manifestVersion: 3,
    browserSpecific: {}
  },
  brave: {
    target: 'brave',
    manifestVersion: 3,
    browserSpecific: {}
  }
}

module.exports = { browsers }
