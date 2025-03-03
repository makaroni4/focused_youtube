# Focused YouTube <a href="https://chrome.google.com/webstore/detail/focused-YouTube/nfghbmabdoakhobmimnjkamfdnpfammn"><img width="124" alt="Add to Chrome" src="https://user-images.githubusercontent.com/768070/113516074-a1513500-9578-11eb-9eb9-06326003cf66.png"></a>

:mag: **Focused YouTube** (FY) is a browser extension that helps you stay focused by blocking recommendations and other elements on YouTube.

:computer: **Focused YouTube** is available for

* [Chrome](https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn)
* [Brave](https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/focused-for-youtube)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/fkipbhecgloafeodihbhahjnhmainlil)

:cookie: FY **does not track any user data**. It's a simple Vanilla JS application made with only one purpose – to help you avoid YouTube's rabbit hole.

## Table of Contents

- [Focused YouTube ](#focused-youtube-)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [🏠 Distraction-free YouTube homepage](#-distraction-free-youtube-homepage)
    - [🔍 Clean search page](#-clean-search-page)
    - [📺 Noise-free video page](#-noise-free-video-page)
    - [🌚 Dark mode (depends of your system settings)](#-dark-mode-depends-of-your-system-settings)
    - [💬 Options to show/hide comments/description](#-options-to-showhide-commentsdescription)
    - [🔗 Hover over YouTube logo to see the navigation menu](#-hover-over-youtube-logo-to-see-the-navigation-menu)
    - [📱 Works in mobile browser as well](#-works-in-mobile-browser-as-well)
  - [Development](#development)
    - [How to load the extension locally](#how-to-load-the-extension-locally)
      - [Chrome](#chrome)
      - [Firefox](#firefox)
      - [Edge](#edge)
    - [Debugging storage API](#debugging-storage-api)
      - [For Chromium browsers (Chrome, Edge, Brave)](#for-chromium-browsers-chrome-edge-brave)
      - [For Firefox](#for-firefox)
  - [Releasing](#releasing)
  - [Contributing](#contributing)
  - [Credits](#credits)

## Features

### 🏠 Distraction-free YouTube homepage

<img width="800" alt="home_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/home_page.png">

### 🔍 Clean search page

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/search_page.png">

### 📺 Noise-free video page

<img width="800" alt="video_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/video_page.png">

### 🌚 Dark mode (depends of your system settings)

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/home_page_dark.png">

Big shout out to [@jakubkloc](https://github.com/jakubkloc) for introducing Dark Mode! :raised_hands:

Make sure to enable Dark Mode in your browser before testing it:

https://support.google.com/chrome/answer/9275525?hl=en&co=GENIE.Platform%3DDesktop

### 💬 Options to show/hide comments/description

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/popup.png">

Big thank you to [@KParthSingh](https://github.com/KParthSingh) and [@Ohnoimded](https://github.com/Ohnoimded) for adding an option to temporarily disable the extension! :raised_hands:

### 🔗 Hover over YouTube logo to see the navigation menu

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/hover_menu.png">

### 📱 Works in mobile browser as well

<img width="800" alt="mobile_version" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/mobile_version.png">

Big shout out to [@fauzanabrar](https://github.com/fauzanabrar) for making Focused Youtube work in mobile browsers! :raised_hands:

## Development

Clone FY's repo to your computer.

You need to have [`nvm`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) installed in order to have [a correct Node version for this project](https://github.com/makaroni4/focused_youtube/blob/main/.nvmrc).

Install dependencies and run a command to re-build the extension (update files in the `dist_chrome` or `dist_firefox` folder) on any file change:

```bash
# 1. Install the correct node version.
nvm install

# 2. Install dependencies.
npm install

# 3. Monitor file changes to re-build the extension during development.
npm run dev --mode=chrome|firefox|edge
```

### How to load the extension locally

The `npm run dev` command will generate a build folder: `dist_chrome`, `dist_firefox` or `dist_edge`. Browser differ slightly in how they load local extensions.

#### Chrome

For Chrome, load the `dist_chrome` folder as a local extension at [chrome://extensions/](chrome://extensions/) via "Load unpacked":

<img width="611" alt="update_extension" src="https://user-images.githubusercontent.com/768070/134963200-aaf3241a-522a-4079-a416-a1b58811a97c.png">

:warning: Note, that you'll need to update the extension (by clicking on the update icon) :point_up: every time you want to test the latest version.

#### Firefox

In Firefox, head over to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) and click on the "Load Temporary Add-on..." button on top of the page. :warning: For Firefox, you'll need to select the `focused-youtube-firefox.zip` file instead of the `dist_firefox` folder.

#### Edge

With Edge, open the [edge://extensions/](edge://extensions/) page and click on the "Load unpacked" button on top of the page. :warning: Select the `dist_edge` folder instead.

### Debugging storage API

Focused Youtube extension uses Storage API (see [Storage API for Chrome](https://developer.chrome.com/docs/extensions/reference/api/storage) or [Storage API for Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage)) for keeping track of user settings and some additional data (installation timestamp, etc).

#### For Chromium browsers (Chrome, Edge, Brave)

To check out current storage data, right click on the extension icon and select "Inspect pop-up". In the dev console run:

```js
chrome.storage.local.get(console.log)
```

To clear storage run the following code in the dev console:

```js
chrome.storage.local.clear(() => {
  console.log("Cleared!")
})
```

#### For Firefox

Head over to the [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) page and click on the "Inspect" button next to the "Focused for YouTube" extension.

```js
browser.storage.local.get(console.log)
```

To clear storage run the following code in the dev console:

```js
browser.storage.local.clear(() => {
  console.log("Cleared!")
})
```

## Releasing

```
npm run build:all
```

## Contributing

You're more than welcome to contribute. In fact, I'm really looking forward to it! :rocket:

Just make sure to check out the [contribution guidelines](https://github.com/makaroni4/focused_youtube/blob/main/CONTRIBUTING.md). :pray:

## Credits

The [info icon](https://github.com/makaroni4/focused_youtube/blob/main/src/assets/info_icon.svg) was created by [@Remartwork](https://dribbble.com/remartwork?ref=svgrepo.com) and was taken [from SVG Repo](https://www.svgrepo.com/svg/356331/info-circle).
