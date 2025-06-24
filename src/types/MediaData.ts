import { Rating } from "./Rating";

export interface MediaData {
  Title: string;
  Year: string;
  Rated: string;
  Director: string;
  Writer: string;
  Actors: string;
  Awards: string;
  Poster: string;
  Plot: string;
  Ratings: Rating[];
}
