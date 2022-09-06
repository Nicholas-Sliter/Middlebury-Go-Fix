browser.runtime.onMessage.addListener((message, sender) => {
	console.log("Redirecting to " + message.redirect);
    browser.tabs.update(sender.tab.id, {url: message.redirect});
});

// Listen to all requests before they are sent
// Redirect to go service if necessary
const goServerUrl = "http://go.middlebury.edu/";
var newUrl;
browser.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url.indexOf("://go/") != -1) {
			var URLparts = details.url.split("go/");
			newUrl = goServerUrl + URLparts[1];
			console.log("Redirecting to go URL: " + newUrl);
			return {redirectUrl: newUrl};
		}
  	},
	{urls: ["<all_urls>"]},
	["blocking"]
 );