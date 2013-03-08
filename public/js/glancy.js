$(function() {

  $('#slides').slides({
    preload: true,
    generatePagination: false,
    play: 5000,
    effect: 'fade',
    crossfade: true,
    fadeSpeed: 1000
  });


})

// Make any links to external sources open in a new window
$(document).ready(function() {
  $("a[href^=http]").each(function() {
    if(this.href.indexOf(location.hostname) == -1) {
      $(this).attr({
        target : "_blank",
        title : "Opens in a new window"
      });
    }
  })
});



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1016807-17']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();