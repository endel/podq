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
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}
