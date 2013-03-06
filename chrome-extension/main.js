var api = "http://article-length-glance.herokuapp.com/";

function getSize(url, callback) {
  $.get(api, {"url": url}, function(d) {
    callback(d.size);
  }, "json");
}

switch (window.location.origin)
{
  case 'http://news.ycombinator.com':
    var maxWidth = $('table').first().find('tbody').first().width() - 36;
    console.log(maxWidth);
    $('.title a').each(function() {
      var url = $(this).attr('href');
      var link = this;
      getSize(url, function(size) {
      	barSize = size / 5;
        if(barSize > maxWidth) {
          barSize = maxWidth;
        }
        var sizeDiv = $(document.createElement('div')).addClass('size').width(barSize);
        $(link).parent().parent().before(sizeDiv);
      })
    });
}