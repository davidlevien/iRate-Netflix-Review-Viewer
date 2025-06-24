export async function getChromeStorage(key: string) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      return resolve(Object.keys(data).length === 0 ? null : data[key]);
    });
  });
}
