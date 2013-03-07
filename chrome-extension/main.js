var api = "http://article-length-glance.herokuapp.com/";

function getSize(url, callback) {
  $.get(api, {"url": url}, function(d) {
    callback(d.size);
  }, "json");
}

var color = localStorage.getItem('glancer');
if(!color) {
  color = "muted";
  localStorage.setItem('glancer', color);
}

function createSizeDiv(site, color, size) {
  return $(document.createElement('div')).addClass(site).addClass('size').addClass(color).width(size);
}

function placeBar(link, sizeDiv, site) {
  switch (site)
  {
    case 'hn':
      $(link).parent().parent().before(sizeDiv);
      break;
    case 'reddit':
      $(link).parent().parent().parent().before(sizeDiv);
      break;
  }
}

function generateBars(maxWidth, isPageOfLinks, links, scale, site) {
  if(isPageOfLinks) {
    $(links).each(function() {
      var url = $(this).prop('href');
      var link = this;
      getSize(url, function(size) {
        barSize = size / scale;
        if(barSize > maxWidth) {
          barSize = maxWidth;
        }
        var sizeDiv = createSizeDiv(site, color, barSize);
        placeBar(link, sizeDiv, site);
      });
    });
  }
}

switch (window.location.origin)
{
  case 'http://news.ycombinator.com':
    var maxWidth = $('table').first().find('tbody').first().width() - 36;
    var isPageOfLinks = $('.title a').length > 1;
    var links = $('.title a');
    var scale = 5;
    var site = 'hn';
    break;

  case 'http://www.reddit.com':
    var maxWidth = $(window).width() - 70;
    var isPageOfLinks = true;
    var links = $('.linklisting a.title');
    var scale = 5;
    var site = 'reddit';
}

generateBars(maxWidth, isPageOfLinks, links, scale, site);
chrome.extension.sendRequest({method: "changeIconColor", color: color});