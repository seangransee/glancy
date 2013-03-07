console.log('running glancy');

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
  console.log('created size div');
  return $(document.createElement('div')).addClass(site).addClass('size').addClass(color).width(size);
}

switch (window.location.origin)
{
  case 'http://news.ycombinator.com':
    var maxWidth = $('table').first().find('tbody').first().width() - 36;
    $('.title a').each(function() {
      var url = $(this).prop('href');
      var link = this;
      getSize(url, function(size) {
        barSize = size / 5;
        if(barSize > maxWidth) {
          barSize = maxWidth;
        }
        var sizeDiv = createSizeDiv('hn', color, barSize);
        $(link).parent().parent().before(sizeDiv);
      });
    });
    break;

  case 'http://www.reddit.com':
    $('.linklisting a.title').each(function() {
      var url = $(this).prop('href');
      var link = this;
      getSize(url, function(size) {
        barSize = size / 5;
        console.log(barSize);
        var sizeDiv = createSizeDiv('reddit', color, barSize);
        $(link).parent().parent().parent().before(sizeDiv);
      });
    });
}

chrome.extension.sendRequest({method: "changeIconColor", color: color});