chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

if (~tab.url.indexOf('cams.floridapoly.org.com') == 0) {
chrome.pageAction.show(tabId);
}

});
