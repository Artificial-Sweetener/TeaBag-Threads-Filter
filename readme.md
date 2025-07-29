# TeaBag – Threads Filter

Welcome to **TeaBag**! Just like a tea bag filters out the leaves, this userscript filters out the posts you don’t want to see on [threads.com](https://www.threads.com).

---

## Features

- **Hide posts from verified users** (with optional whitelist)
- **Block posts from specific users** (without actually blocking them)
- **Filter posts containing certain words or phrases**
- **Optionally hide blue checkmarks everywhere**
- **(Optional) See how many posts have been filtered**

---

## Installation

1. Install a userscript manager (like [Violentmonkey](https://violentmonkey.github.io/)).
2. Open the raw .js file from this repository or copy the script into a new userscript in your manager.
3. Visit [threads.com](https://www.threads.com) and you’re good to go!

---

## Configuration

Edit the script’s config section to customize your experience:

```js
const whitelist = new Set(['goodperson1', 'goodperson2']);
const blacklist = new Set(['badperson1', 'badperson2']);
const textFilterList = new Set(['giveaway']);

const ENABLE_FILTER_COUNT = 0; // 1 = show filter counter
const ENABLE_HIDE_CHECKMARKS = 1; // 1 = hide all checkmarks
const ENABLE_NO_FILTER_ON_PROFILES = 1; // 1 = pause filter on profile pages
```

    Whitelist: Verified users you want to see (no checkmarks if you don’t want them).

    Blacklist: Any users you don’t want to see at all.

    Text filter: Hide posts with these words or phrases (not case sensitive).

How It Works

    Finds posts by users on your blacklist, by verified users, or posts containing filtered words.

    Hides those posts from your feed.

    Whitelisted users always show up (checkmark optional).

    (Optional) A filter counter appears at the top right of the page and also shows you the ratio between verified and "unverified" posts - turn this on if you want to be grossed out by how much Meta pushes this crap in your face!

Credits

Made by artificialsweetener.ai

If you like this, gimme a star! ⭐
If you find a bug or want to suggest a feature, open an issue here.

Enjoy your freshly filtered threads! ☕
