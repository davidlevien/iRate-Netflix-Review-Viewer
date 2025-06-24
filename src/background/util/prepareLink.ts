import { SCRUB_REG_EXP } from "./constants";
import { getApiLink } from "./getApiLink";

export const prepareLink = (title: string) =>
  getApiLink(title.replace(SCRUB_REG_EXP, ""));
