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
        var sizeDiv = $(document.createElement('div')).addClass('size').addClass(color).width(barSize);
        $(link).parent().parent().before(sizeDiv);
      })
    });

  case 'http://www.reddit.com':
    $('a.title').each(function() {
      var url = $(this).prop('href');
    })
}

chrome.extension.sendRequest({method: "changeIconColor", color: color});