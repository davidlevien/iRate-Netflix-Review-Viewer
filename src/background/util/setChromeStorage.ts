export async function setChromeStorage(key: string, val: any, cb: Function) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: val }, () => {
      resolve(cb());
    });
  });
}
