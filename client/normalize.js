import Promise from 'promise-polyfill'

window.Promise = window.Promise || Promise

if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch')
}

(function rotate(win) {
  win.onorientationchange = function (event) {
    event.stopPropagation();
    event.cancelBubble = true
  };
})(window)
