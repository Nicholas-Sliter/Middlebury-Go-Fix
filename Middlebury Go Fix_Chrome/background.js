const MIDD_URL = "https://go.middlebury.edu/";
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { // listener for tab opens
	if (changeInfo.status == 'loading') {
		if (tab.url.indexOf("http://go/") !== -1 || tab.url.indexOf("https://go/") !== -1) { // if the tab is a go URL
			const newUrl = MIDD_URL + tab.url.split("go/")[1];
			console.log("Redirecting to go URL: " + newUrl);
			chrome.tabs.update(tabId, { url: newUrl });
		}
	}
})