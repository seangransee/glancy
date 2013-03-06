changeTo = null;

function enabled(type) {
  return $('.size.'+type).length > 0;
}

function enable(type) {
  $('.size').removeClass('muted')
            .removeClass('full')
            .removeClass('hidden')
            .addClass(type);
  localStorage.setItem('glancer', type);
  changeTo = type;
}

if(enabled('muted')) {
  enable('full');
} else if (enabled('full')) {
  enable('hidden');
} else {
  enable('muted');
}

changeTo;