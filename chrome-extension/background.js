allowedSites = ['news.ycombinator.com', 'www.reddit.com', 'www.washingtonpost.com', 'www.nytimes.com', 'www.huffingtonpost.com', 'www.cnn.com'];

function checkForValidUrl(tabId, changeInfo, tab) {
  if (allowedSites.indexOf(tab.url.split('/')[2]) > -1) {
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
      break;
    case 'www.reddit.com':
      var site = "reddit";
      break;
    case 'www.washingtonpost.com':
      var site = "wp";
      break;
    case 'www.nytimes.com':
      var site = "nytimes";
      break;
    case 'www.huffingtonpost.com':
      var site = "huffpo";
      break;
    case 'www.cnn.com':
      var site = "cnn";
      break;
  }

  chrome.pageAction.setIcon({
    tabId: tab.id,
    path: {
      19: "icons/"+site+"_"+color+"_19.png",
      38: "icons/"+site+"_"+color+"_38.png"
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