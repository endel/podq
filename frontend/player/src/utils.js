export function getPosition(element, e) {
  'use strict';
  var rect = element.getBoundingClientRect();
	var x = e.clientX;
	var y = e.clientY;
	var sx = x - rect.left;
	var sy = y - rect.top;
  var w = rect.right - rect.left;
  var h = rect.bottom - rect.top;
  var rx = sx/w;
  var ry = sy/h;
  return {x:sx, y:sy, w:w, h:h, rx:rx, ry:ry};
}

export function clamp(v, min = 0, max = 1) {
  'use strict';
  if (isNaN(v) || v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

export function expandString(str, len = 2, char = '0', direction = -1) {
  'use strict';
  str = str + '';
  while (str.length < len) {
    if (direction > 0) {
      str = str + char;
    } else {
      str = char + str;
    }
  }
  return str;
}

export function getFormatedTime(seconds) {
  'use strict';
  var s = Math.floor(seconds%60);
  var m = Math.floor(seconds/60)%60;
  var h = Math.floor(seconds/(60*60));
  return expandString(h) + ':' + expandString(m) + ':' + expandString(s);
}
