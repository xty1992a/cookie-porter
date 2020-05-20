const fakeResult = PRODUCTION
  ? null
  : {
      success: true,
      data: {
        json: { hello: "test" },
        cookie: "hello=test",
      },
    };

export function noticeContent(message) {
  return new Promise(async (resolve) => {
    if (fakeResult) return resolve(fakeResult);
    const tabId = await getCurrentTabId();
    if (!tabId)
      return resolve({ success: false, message: "can not get tab id!" });
    /*	let payload = {reply: false};
	if (typeof message === 'string') {
	  payload.message = message;
	}
	else if (typeof message === 'object') {
	  payload = {...payload, ...message};
	}*/

    chrome.tabs.sendMessage(tabId, message, (response) => {
      try {
        resolve({ success: true, data: response });
      } catch (e) {
        resolve({ success: false, response });
      }
    });
  });
}

export function getCurrentTabId() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function ([tab]) {
      resolve(tab ? tab.id : null);
    });
  });
}

export function parserCookie(cookies) {
  if (typeof cookies !== "string") return null;
  return cookies.split(";").reduce((map, chunk) => {
    const [key, value] = chunk.split("=").map((k) => k.trim());
    return { ...map, [key]: value };
  }, {});
}

export const ellipsis = (count) => (str = "") =>
  str.length > count ? str.substr(0, count) + "..." : str;

export const copy = (o) => JSON.parse(JSON.stringify(o));

export { default as clipboard } from "./clipboard";
