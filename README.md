# Focused YouTube <a href="https://chrome.google.com/webstore/detail/focused-YouTube/nfghbmabdoakhobmimnjkamfdnpfammn"><img width="124" alt="Add to Chrome" src="https://user-images.githubusercontent.com/768070/113516074-a1513500-9578-11eb-9eb9-06326003cf66.png"></a>

:mag: **Focused YouTube** (FY) is a Chrome Extension that helps you stay focused by blocking recommendations and other elements on YouTube.

:heart: FY **does not track any user data**. It's a simple Vanilla JS application made with only one purpose – to help you avoid YouTube's rabbit hole.

## Screenshots

### 🏠 Distraction-free YouTube homepage

<img width="800" alt="home_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/home_page.png">

### 🔍 Clean search page

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/search_page.png">

### 📺 Noise-free video page

<img width="800" alt="video_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/video_page.png">

### 	:last_quarter_moon_with_face: Dark mode (depends of your system settings)

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/home_page_dark.png">

Big shout out to [@jakubkloc](https://github.com/jakubkloc) for introducing Dark Mode! :raised_hands:

Make sure to enable Dark Mode in your Chrome before testing it:

https://support.google.com/chrome/answer/9275525?hl=en&co=GENIE.Platform%3DDesktop

### 💬 Options to show/hide comments/description

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/popup.png">

Big thank you to [@KParthSingh](https://github.com/KParthSingh) and [@Ohnoimded](https://github.com/Ohnoimded) for adding an option to temporarily disable the extension! :raised_hands:

### 🔗 Hover over YouTube logo to see the navigation menu

<img width="800" alt="search_page" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/hover_menu.png">

### 📱 Works in mobile browser as well

<img width="800" alt="mobile_version" src="https://raw.githubusercontent.com/makaroni4/focused_youtube/main/readme/mobile_version.png">

Big shout out to [@fauzanabrar](https://github.com/fauzanabrar) for making Focused Youtube work in mobile browsers! :raised_hands:

## Contributing

You're more than welcome to contribute. In fact, I'm really looking forward to it! :rocket:

Just make sure to check out the [contribution guidelines](https://github.com/makaroni4/focused_youtube/blob/main/CONTRIBUTING.md). :pray:

## Development

Clone FY's repo to your computer.

Install dependencies and run a command to re-build the extension (update files in the `dist` folder) on any file change:

```
npm install

npm run mon
```

Load the `dist` folder as a local extension at [chrome://extensions/](chrome://extensions/) via "Load unpacked":

<img width="611" alt="update_extension" src="https://user-images.githubusercontent.com/768070/134963200-aaf3241a-522a-4079-a416-a1b58811a97c.png">

:warning: Note, that you'll need to update the extension (by clicking on the update icon) :point_up: every time you want to test the latest version.

### Chrome Storage

Focused Youtube extension uses [`chrome.storage API`](https://developer.chrome.com/docs/extensions/reference/api/storage#property-local) for keeping track of user settings and some additional data (installation timestamp, etc).

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

## Releasing

```
npm run build
```
