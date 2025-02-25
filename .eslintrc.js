export default {
  env: {
    browser: true,
    webextensions: true,
    es2022: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022
  },
  globals: {
    browser: true,
    chrome: true
  }
}
