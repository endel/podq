export function getDataType(data) {
  'use strict';
  var type = null;
  if (data['audio_url'] !== undefined) {
    type = 'entry';
  } else if (data['url'] !== undefined) {
    type = 'feed';
  }
  return type;
}

export function padZero(num, size) {
  'use strict';
  var s = '00' + num;
  return s.substr(s.length - size);
}

export function simpleDate(str) {
  'use strict';
  var date = new Date(str);

  var d = date.getDate().toString();
  var m = (date.getMonth() + 1).toString();
  var y = (date.getFullYear()).toString();

  return `${ padZero(m, 2) }/${ padZero(d, 2) }/${ y }`;
}



export function clampString(str, max, sufix = '...') {
  'use strict';
  if (str === null || str === undefined || str.length <= max) {
    return str;
  }

  while (str.length > max) {
    var s = str.lastIndexOf(' ');
    var d = str.lastIndexOf('-');
    var i = Math.max(s, d);
    str = str.substr(0, i);
  }

  return str + sufix;
}
