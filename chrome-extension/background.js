function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('news.ycombinator.com') > -1) {
    chrome.pageAction.show(tabId);
  }
}

function changeIconColor(tab, color) {
  var url = tab.url;
  var domain = url.split('/')[2];
  switch(domain)
  {
    case 'news.ycombinator.com':
      var site = "hn";
  }

  chrome.pageAction.setIcon({
    tabId: tab.id,
    path: {
      19: "icons/"+site+"_"+color+"_19.gif",
      38: "icons/"+site+"_"+color+"_38.gif"
    }
  });
}

function pageActionClicked(tab) {
  chrome.tabs.executeScript({
    file: "toggle.js"
  }, function(result) {
    changeIconColor(tab, result[0]);
  });
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(pageActionClicked);
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  changeIconColor(sender.tab, request.color);
})