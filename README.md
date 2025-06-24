# Netflix ratings viewer

A simple chrome extension that uses the OMDB API to inject review/awards and other metadata when the user hovers over a selection.

# Setup

1. Open `manifest.json` and fill in the value for `OMDB_API_KEY`. You can create an API key [here](https://omdbapi.com/apikey.aspx).
2. Either build or install the extension in chrome dev mode
3. Navigate to https://www.netflix.com/browse and hover over a selection
4. After `DEBOUNCE_MS` is exceeded, a container will render, dispalying information about the selection including ratings from various websites

# Example Image

![example image](https://i.imgur.com/Pb5g0Tu.jpg)
