let xPos;
let yPos;
let currTimeout;

document.onmousemove = (e) => {
  xPos = e.clientX;
  yPos = e.clientY;
};
document.addEventListener("mouseover", (event) => {
  if (event.target.className.includes("boxart")) {
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
      if (isValidX && isValidY) {
        const title =
          event.target.parentNode.querySelectorAll(".fallback-text")[0]
            .innerText;
        const cachedData = await getChromeStorage(title);
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
    }, [env.DEBOUNCE_MS]); // after DEBOUNCE_MS, we check if the mouse is still in the range of the boxart component to reduce the need of constant API calls
  }
});
