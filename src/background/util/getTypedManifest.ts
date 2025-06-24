import { Manifest } from "../../types/ManifestConstants";

export function getTypedManifestEnv() {
  const { env } = chrome.runtime.getManifest() as Manifest;
  return env;
}
