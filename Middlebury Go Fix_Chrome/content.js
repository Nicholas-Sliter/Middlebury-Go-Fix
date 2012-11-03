var urlscheme = /http:\/\/go/
var currenturl = window.location.href;
var newurl = "http://red.com";

if (urlscheme.test(currenturl)) {
	chrome.extension.sendRequest({redirect: newurl}); // send message to redirect
}