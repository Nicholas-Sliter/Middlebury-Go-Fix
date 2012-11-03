// Called when the url of a tab changes.
function checkForGoUrl(tabId, changeInfo, tab) {
	if(changeInfo.status == "loading") {
	    var url = purl(tab.url);
    	if (url.attr("host") == "go") {
    		console.log('Go Link!');
	    }
	}
};

// A test function to print some text
function printText(text) {
	console.log(text);
};

function redirectToURL(redirectURL) {
	chrome.extension.sendRequest({redirect: redirectURL});
};

// Add listener for URL
chrome.tabs.onUpdated.addListener(checkForGoUrl);

// Add listener for omnibox keyword
chrome.omnibox.onInputEntered.addListener(printText("hello"));

// Redirect support listener
chrome.extension.onRequest.addListener(function(request, sender) {
	console.log("Redirecting to " + request.redirect);
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});

// Listen to all requests before they are sent
// Redirect to go service if 
var goServerUrl = "http://go.middlebury.edu/";
var newUrl;
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url.indexOf("://go/") != -1) {
			var URLparts = details.url.split("go/");
			console.log("HTTP request contains 'go': " + URLparts[1]);
			newUrl = goServerUrl + URLparts[1];
			return {redirectUrl: newUrl};
		}
  	},
	{urls: ["<all_urls>"]},
	["blocking"]
 );