# Armaria Browser Extension

This is the browser extension for Armaria. To read about what Armaria is and how to install it see [here](https://github.com/JonathanHope/armaria). The Armaria browser extensions allows you interact with your bookmarks database from browsers.

> [!CAUTION]
> This software is still in progress and should be considered pre-alpha

# Supported Browsers

 - Chrome
 - Chromium
 - Firefox

# Getting Started

You can find the installation instructions for your platform here. In order for the extension to work you must install a native manifest file. This is done with the Armaria CLI.

# Chrome

> [!NOTE]
> Snap users have an additional step zero here: 
> snap connect armaria:dot-config-google-chrome-native-messaging-hosts

First install the manifest:

``` shell
armaria manifest install chrome
```

Then install the extension using the Chrome Web Store [here](https://chromewebstore.google.com/detail/armaria/fbnilfpngakppdkddndcnckolmlpghdf).

# Chromium

> [!NOTE]
> Snap users have an additional step zero here: 
> snap connect armaria:dot-config-chromium-native-messaging-hosts

First install the manifest:

``` shell
armaria manifest install chromium
```

Then install the extension using the Chrome Web Store [here](https://chromewebstore.google.com/detail/armaria/fbnilfpngakppdkddndcnckolmlpghdf).

# Firefox

> [!NOTE]
> Snap users have an additional step zero here: 
> snap connect armaria:dot-mozilla-native-messaging-hosts

First install the manifest:

``` shell
armaria manifest install firefox
```

Then install the extension using Firefox Add-Ons [here](https://addons.mozilla.org/en-US/firefox/addon/armaria/).

# Roadmap

This software is still in its early days. This roadmap lays out where it currently is, and where it's going. If there is something that you think should be on it that is not please open an issue.

**Browser Support:**

- [x] Chrome
- [x] Chromium
- [x] Firefox
- [ ] Safari

**Add Bookmark Popup:**

- [x] URL
- [x] Name
- [x] Description
- [ ] Folder
- [ ] Tags

**Bookmarks Sidebar:**

 - [ ] Edit bookmark URL
 - [ ] Edit bookmark/folder name
 - [ ] Edit bookmark description
 - [ ] Add tag to bookmark
 - [ ] Remove tag from bookmark
 - [ ] Change bookmark/folder parent
 - [ ] Reorder bookmarks/folders
 - [ ] Open bookmark/folder
 - [ ] Remove bookmark/folder
 - [ ] Add folder
