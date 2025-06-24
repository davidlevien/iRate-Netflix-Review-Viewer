import { MediaData } from "../types/MediaData";
import { DEBOUNCE_MS } from "./util/constants";
import { createFloatingInfoContainer } from "./util/createFloatingInfoContainer";
import { getChromeStorage } from "./util/getChromeStoratge";
import { prepareLink } from "./util/prepareLink";
import { setChromeStorage } from "./util/setChromeStorage";

let xPos: number;
let yPos: number;
let currTimeout: number;

document.onmousemove = (e) => {
  xPos = e.clientX;
  yPos = e.clientY;
};

document.addEventListener("mouseover", (event) => {
  const isValidTarget = event.target instanceof HTMLElement;
  if (isValidTarget && event.target.className.includes("boxart")) {
    // debounce previous timeout
    clearTimeout(currTimeout);
    let offset = event.target.getBoundingClientRect();
    // add buffer to min and max coords to compensate for the size shift
    // when the hovered option grows and renders the preview video
    let maxX = offset.x + offset.width + 100;
    let minY = offset.y - offset.height - 400;
    currTimeout = setTimeout(async () => {
      const isValidX = xPos >= offset.x - 100 && xPos <= maxX;
      const isValidY = yPos <= offset.y + 400 && yPos >= minY;
      if (isValidX && isValidY && isValidTarget) {
        const fallback = event.target.parentNode?.querySelectorAll(".fallback-text")[0];
        const isValidFallback = fallback instanceof HTMLElement;
        const title = isValidFallback ? fallback.innerText : "";
        const cachedData = (await getChromeStorage(title)) as MediaData | null;
        if (cachedData === null) {
          try {
            const data = await fetch(prepareLink(title));
            const parsedJSON = await data.json();
            await setChromeStorage(title, parsedJSON, () => {
              console.log(`added key ${title} to local storage`);
            });
            createFloatingInfoContainer(parsedJSON);
          } catch (e) {
            console.error("An error occurred while fetching data", e);
          }
        } else {
          console.log("CACHED DATA FOUND", cachedData);
          createFloatingInfoContainer(cachedData);
        }
      }
      // after DEBOUNCE_MS, we check if the mouse is still in the range of the box-art component to reduce the need of constant API calls
    }, DEBOUNCE_MS);
  }
});
