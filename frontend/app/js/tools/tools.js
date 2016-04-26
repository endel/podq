export var timeFractionRegex = /((?:[0-9]{1,2}:)?[0-9]{1,2}:[0-9]{1,2})/gi

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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daySuffixes = ['st', 'nd', 'rd']

export function simpleDate(str) {
  'use strict';

  let date = new Date(str)

  let d = date.getDate()
  let y = ( date.getFullYear() ).toString()

  let suffix = daySuffixes[ d-1 ] || 'th'

  return `${ months[ date.getMonth() ] } ${ d }${ suffix }, ${ y }`;
}

