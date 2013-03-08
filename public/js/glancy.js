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