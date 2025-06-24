import { OMDB_API_KEY } from "./constants";

export const getApiLink = (title: string) =>
  `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
