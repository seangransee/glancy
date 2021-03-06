var api = "http://www.glancyapp.com/size";

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
    case 'wp':
      $(link).parent().before(sizeDiv);
      break;
    case 'nytimes':
      $(link).parent().before(sizeDiv);
      break;
    case 'huffpo':
      $(link).parent().before(sizeDiv);
      break;
    case 'cnn':
      $(link).parent().before(sizeDiv);
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

switch (window.location.origin.split('/')[2])
{
  case 'news.ycombinator.com':
    var maxWidth = $('table').first().find('tbody').first().width() - 36;
    var links = $('.title a');
    var isPageOfLinks = links.length > 1;
    var scale = 5;
    var site = 'hn';
    break;

  case 'www.reddit.com':
    var maxWidth = $(window).width() - 68;
    var links = $('.linklisting a.title');
    var isPageOfLinks = links.length > 1;
    var scale = 5;
    var site = 'reddit';
    break;

  case 'www.washingtonpost.com':
    var maxWidth = $(window).width();
    var links = $('h2.headline a, h2.no-left a');
    var isPageOfLinks = links.length > 1;
    var scale = 5;
    var site = 'wp';
    break;

  case 'www.nytimes.com':
    var maxWidth = $(window).width();
    var links = $('.story h2 a, .story h3 a, .story h5 a');
    var isPageOfLinks = links.length > 1;
    var scale = 5;
    var site = 'nytimes';
    break;

  case 'www.huffingtonpost.com':
    var maxWidth = $(window).width();
    var links = $('h1 a, h3 a, .entry h4 a');
    var isPageOfLinks = links.length > 1;
    var scale = 7;
    var site = 'huffpo';
    break;

  case 'www.cnn.com':
    var maxWidth = $(window).width();
    var links = $('.cnn_bulletbin li a:nth-child(2), .cnn_bulletbin li a:first-child, h2 a');
    var isPageOfLinks = links.length > 1;
    var scale = 15;
    var site = 'cnn';
    break;
}

generateBars(maxWidth, isPageOfLinks, links, scale, site);
chrome.extension.sendRequest({method: "changeIconColor", color: color});