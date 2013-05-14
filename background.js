function checkURL(tabId) {
    chrome.tabs.sendRequest(tabId, {}, function(isRenren) {
        if (isRenren) chrome.pageAction.show(tabId);
    });
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getRules")
        sendResponse(JSON.parse(localStorage.rules));
    else
        sendResponse({}); // snub them.
});

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    checkURL(tabId);
});
