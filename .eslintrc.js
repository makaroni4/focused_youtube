module.exports = {
  env: {
    browser: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  rules: {
    "vue/multi-word-component-names": "off"
  },
  globals: {
    chrome: true,
    observer: true
  }
}
