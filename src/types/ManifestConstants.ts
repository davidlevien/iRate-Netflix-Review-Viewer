/**
 * override default manifest to enable strict typing
 */
export interface Manifest {
  env: {
    DEBOUNCE_MS: number;
    OMDB_API_KEY: string;
  };
}
