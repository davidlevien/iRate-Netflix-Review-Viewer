import { getTypedManifestEnv } from "./getTypedManifest";

/**
 *
 * used to scrub words that prevent results from being displayed
 * ei: The Hateful Eight; Extended Version does not show up in IMDB
 * so we escape it and opt to use the original release for the review
 */
const KEYWORD_SCRUB_ARR = ["Alternate", "Extended", "Version"];

export const SCRUB_REG_EXP = new RegExp(`${KEYWORD_SCRUB_ARR.join("|")}`, "g");

export const CONTAINER_CLASS = "info-container";

export const FADE_IN_CLASS = "fade-in";

export const FADE_IN_SHOW_CLASS = "show";

export const { DEBOUNCE_MS, OMDB_API_KEY } = getTypedManifestEnv();
