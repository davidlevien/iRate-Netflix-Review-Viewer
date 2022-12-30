/**
 * @typedef Rating
 * @type {Object}
 * @property {string} Source
 * @property {string} Value
 */

/**
 * @typedef MediaData
 * @type {Object}
 * @property {string} Title
 * @property {string} Year
 * @property {string} Rated
 * @property {string} Director
 * @property {string} Writer
 * @property {string} Actors
 * @property {string} Awards
 * @property {string} Poster - URL
 * @property {string} Plot
 * @property {Array<Rating>} Ratings
 */

const { env } = chrome.runtime.getManifest();

/**
 *
 * used to scrub words that prevent results from being displayed
 * ei: The Hateful Eight; Extended Version does not show up in IMDB
 * so we just ignore it and opt to use the original release for the review
 */
const KEYWORD_SCRUB_ARR = ["Alternate", "Extended", "Version"];
const SCRUB_REG_EXP = new RegExp(`${KEYWORD_SCRUB_ARR.join("|")}`, "g");
const CONTAINER_CLASS = "info-container";
const FADE_IN_CLASS = "fade-in";
const FADE_IN_SHOW_CLASS = "show";

const getApiLink = (title) =>
  `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${
    env.OMDBAPI_KEY
  }`;

const getChromeStorage = async (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      return resolve(Object.keys(data).length === 0 ? null : data[key]);
    });
  });
};

const setChromeStorage = async (key, val, cb) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: val }, () => {
      resolve(cb());
    });
  });
};

const prepareLink = (title) => getApiLink(title.replace(SCRUB_REG_EXP, ""));

/**
 *
 * @param {MediaData} data
 */
const createFloatingInfoContainer = (data) => {
  // remove stale container
  const oldMediaInfo = document.getElementById(CONTAINER_CLASS);
  if (oldMediaInfo != null) {
    oldMediaInfo.classList.remove(FADE_IN_SHOW_CLASS);
    setTimeout(() => {
      document.body.removeChild(oldMediaInfo);
    }, 1000);
  }
  const containerStr = `
      <div class="media-info">
        <p><b>Title: </b>${data.Title}</p>
        <p><b>Writer: </b>${data.Writer}</p>
        <p><b>Director: </b>${data.Director}</p>
        <p><b>Actors: </b> ${data.Actors}</p>
        <p><b>Awards: </b> ${data.Awards}</p>
        <b>Ratings: </b>
        <ul>
          ${data.Ratings.reduce(
            (str, curr) =>
              str +
              `
                <li><b>${curr.Source}: </b> ${curr.Value}</li>
              `,
            ""
          )}
          </ul>
        <p><b>Plot: </b>${data.Plot}</p>
      </div>
      <div class="poster">
        ${data.Poster ? `<img src="${data.Poster}"/>` : ""}
      </div>
  `;
  const container = document.createElement("div");
  container.id = CONTAINER_CLASS;
  container.innerHTML = containerStr;
  container.classList.add(FADE_IN_CLASS);
  document.body.appendChild(container);
  setTimeout(() => {
    container.classList.add(FADE_IN_SHOW_CLASS);
  }, 500);
};
