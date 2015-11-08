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
  var d = date.getDay();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return `${m}/${d}/${y}`;
}
