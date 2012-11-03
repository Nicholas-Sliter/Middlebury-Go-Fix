
/*
 *	File: background.js
 *	Abstract: Global JavaScript file to capture URL and control redirect.
 *	Version: 1.1.0
 *
 *	Copyright (C) 2012 Nate Beatty. All Rights Reserved.
 */

// Redirect support listener
// Call chrome.extension.sendRequest({redirect: < desiredURL (string) >});
chrome.extension.onRequest.addListener(function(request, sender) {
	console.log("Redirecting to " + request.redirect);
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});

// Listen to all requests before they are sent
// Redirect to go service if necessary
var goServerUrl = "http://go.middlebury.edu/";
var newUrl;
chrome.webRequest.onBeforeRequest.addListener(
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