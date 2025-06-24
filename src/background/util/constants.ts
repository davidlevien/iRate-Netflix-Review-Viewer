/**
 *
 * used to scrub words that prevent results from being displayed
 * ei: The Hateful Eight; Extended Version does not show up in IMDB
 * so we escape it and opt to use the original release for the review
 */
const KEYWORD_SCRUB_ARR = ["Alternate", "Extended", "Version"];
const SCRUB_REG_EXP = new RegExp(`${KEYWORD_SCRUB_ARR.join("|")}`, "g");
const CONTAINER_CLASS = "info-container";
const FADE_IN_CLASS = "fade-in";
const FADE_IN_SHOW_CLASS = "show";
