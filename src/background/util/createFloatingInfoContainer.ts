import { MediaData } from "../../types/MediaData";
import { Rating } from "../../types/Rating";
import { CONTAINER_CLASS, FADE_IN_CLASS, FADE_IN_SHOW_CLASS } from "./constants";

/**
 *
 * @param {MediaData} data
 */
export function createFloatingInfoContainer(data: MediaData) {
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
            (str: string, curr: Rating) => str + `<li><b>${curr.Source}: </b> ${curr.Value}</li>`,
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
}
