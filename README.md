# iRate Netlifx ratings viewer

Originally written for a Codesmith hackaton, the extension has been rewritten with some added changes:

- Removed jquery
- Refactored search functionality
- added localstorage caching
- redesigned UI

# Setup

1. Open `manifest.json` and insert omdb API key. You can create an API key [here](https://omdbapi.com/apikey.aspx).
2. Either build or install the extension in chrome dev mode
3. Navigate to https://www.netflix.com/browse and hover over a selection
4. After `DEBOUNCE_MS` is exceeded, a container will render, dispalying information about the selection including ratings from various websites

# Example Image

![example image](https://i.imgur.com/Pb5g0Tu.jpg)
