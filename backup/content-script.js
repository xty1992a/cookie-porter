;(function () {
  console.log('插件注入代码');
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	try{
	  if (typeof message === 'string') {
		message = JSON.parse(message);
	  }
	}catch (e) {
	}
	if (!message.event) return;
	switch (message.event) {
	  case "get-cookie":
		sendResponse(document.cookie);
		break;
	}
  });
})();
