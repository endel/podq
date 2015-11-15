export function getDataType(data) {
  var type = null;
  if (data.audio_url !== undefined) {
    type = 'entry';
  } else if (data.url !== undefined) {
    type = 'feed';
  }
  return type;
}

export function simpleDate(str) {
  var date = new Date(str);

  var d = date.getDate().toString();
  var m = (date.getMonth() + 1).toString();
  var y = (date.getFullYear()).toString();

  return `${ padZero(m, 2) }/${ padZero(d, 2) }/${ y }`;
}

export function padZero(num, size) {
  var s = "00" + num;
  return s.substr(s.length - size);
}
