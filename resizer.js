(function (window, document, VK) {
  function Resizer() {
    var resizer = {},
        elements = [], lastHeight = null,
        interval = 100, started = false,
        offsetBottom = function(obj) {
          if (!obj) return 0;
          var offsetTop = 0,
              offsetHeight = obj.offsetHeight || 0;
          do {
            offsetTop += obj.offsetTop;
          } while (obj = obj.offsetParent)
          return offsetTop + offsetHeight;
        };
    
    function setInterval(p) {
      if (p>0) interval = p;
      return resizer;
    }
    resizer.setInterval = setInterval;
    
    function add(obj, extra) {
      if (typeof obj === 'string') {
        obj = document.getElementById(obj);
      }
      if (!obj) return resizer;
      if (typeof obj.length === 'undefined') {
        elements.push({o: obj, e: extra || 0});
      } else {
        for (var i = 0, l = obj.length; i < l; i++) {
          add(obj[i], extra);
        }
      }
      if (!started) {
        started = true;
        resize();
      }
      return resizer;
    }
    resizer.add = add;
    
    function resize() {
      if (elements.length) {
        var bottom = [];
        for (var i = 0, l = elements.length; i < l; i++) {
          var elem = elements[i], obj = elem.o, extra = elem.e;
          if (obj && obj.offsetHeight) {
            bottom.push(offsetBottom(obj) + extra);
          }
        }
        var height = Math.max.apply(window, bottom);
        if (height != lastHeight) {
          lastHeight = height;
          VK.callMethod('resizeWindow', document.body.offsetWidth, height);
        }
      }
      setTimeout(resize, interval);
    }
    
    return resizer;
  }
  window.Resizer = Resizer();
})(window, document, VK);