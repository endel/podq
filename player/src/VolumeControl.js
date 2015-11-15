import Graphics from './Graphics';
import * as utils from './utils';

var numSlices = 5;
var slices = function() {
  'use strict';
  var s = '';
  var i = numSlices;
  while (i--) {
    var id = 'slice' + i;
    var x = i*20 + 5;
    var y = 70 - i*10;
    var w = 10;
    var h = i*10 + 10;
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
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.element.style.cursor = 'pointer';
    this._ratio = 1;
    this._draging = false;
    this.onUpdate = null;
  }

  onMouseDown(e) {
    this._draging = true;
    this.updatePosition(e);
  }

  onMouseMove(e) {
    if (this._draging) {
      this.updatePosition(e);
    }
  }

  onMouseUp() {
    this._draging = false;
  }

  updatePosition(e) {
    var pos = utils.getPosition(this.element, e);
    this.ratio = pos.rx;
  }

  get ratio() {
    return this._ratio;
  }

  set ratio(value) {
    this._ratio = utils.clamp(value);
    this.updateSlices();
    if (this.onUpdate) {
      this.onUpdate(this._ratio);
    }
  }

  updateSlices() {
    var i = numSlices;
    while (i--) {
      var s = 'slice' + i;
      var r = i/numSlices + 0.1;
      this.setNodeAttr(s, 'opacity', r < this._ratio ? 1 : 0.5);
    }
  }
}
