/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('收到来自content-script的消息：');
  console.log(request, sender, sendResponse);
  sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));
});
*/

function noticeContent(message) {
  return new Promise(async (resolve) => {
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

function getCurrentTabId() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function ([tab]) {
      resolve(tab ? tab.id : null);
    });
  });
}

(function () {
  try {
    new Vue({
      data() {
        return {
          cookie: "asdf",
        };
      },

      methods: {
        async getPageCookie() {
          const result = await noticeContent({ event: "get-cookie" });
          if (!result.success) return;
          this.cookie = result.data;
        },
      },

      created() {
        this.getPageCookie();
      },

      render(h) {
        return h("div", [
          h(
            "button",
            {
              style: {},
              on: {
                click: this.getPageCookie,
              },
            },
            "按钮"
          ),
          h("p", [this.cookie]),
        ]);
      },
    }).$mount("#app");
  } catch (e) {
    console.log(e);
  }
})();
