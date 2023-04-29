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
    "vue/multi-word-component-names": "off",
    "quotes": ["error", "double"]
  },
  globals: {
    chrome: true,
    observer: true
  }
}
