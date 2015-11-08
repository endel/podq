export function getDataType(data) {
  var type = null;
  if (data.audio_url !== undefined) {
    type = 'entry';
  } else if (data.url !== undefined) {
    type = 'feed';
  }
  return type;
}
