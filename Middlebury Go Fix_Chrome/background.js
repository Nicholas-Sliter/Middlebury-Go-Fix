// Called when the url of a tab changes.
function checkForGoUrl(tabId, changeInfo, tab) {
	// Look for the 'go/' prefix
	if (tab.url.indexOf('go/') > -1) {
		console.log('tab.url');
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForGoUrl);