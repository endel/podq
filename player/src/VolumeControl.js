import Graphics from './Graphics';

var slices = function() {
  'use strict';
  var s = '';
  var i = 5;
  while (i--) {
    var id = 'slice' + i;
    var x = i*20 + 5;
    var y = 90 - i*20;
    var w = 10;
    var h = i*20 + 10;
    s += `<rect id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="white"/>`;
  }
  return s;
};

var html = `
  <svg width="100%" viewbox="0 0 100 100">
    ${slices()}
  </svg>
`;

export default class VolumeControl extends Graphics {
  constructor() {
    super('volumeControl', html);
  }
}
