import Cookie from "js-cookie";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  try {
    if (typeof message === "string") {
      message = JSON.parse(message);
    }
  } catch (e) {}
  if (!message.event) return;
  console.log("get message", message);
  switch (message.event) {
    case "get-cookie":
      sendResponse({
        json: Cookie.get(),
        cookie: document.cookie,
      });
      break;
    case "set-cookie":
      setCookie(message.data);
      sendResponse("set-cookie:ok");
      break;
    case "del-cookie":
      const { key } = message.data;
      Cookie.remove(key);
      sendResponse("del-cookie:ok");
      break;
  }
});

function setCookie(cookies) {
  Object.keys(cookies).forEach((key) => {
    Cookie.set(key, cookies[key]);
  });
}
