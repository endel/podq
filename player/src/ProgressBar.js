import Graphics from './Graphics';
import * as utils from './utils';

var html = `
  <svg width="100%" height="100%" viewbox="0 0 100 100" preserveaspectratio="none">
    <rect id="base" width="100" height="100" fill="white" opacity="0.15"/>
    <rect id="load" width="100" height="100" fill="white" opacity="0.1"/>
    <rect id="time" width="100" height="100" fill="white"/>
  </svg>
`;

export default class ProgressBar extends Graphics {
  constructor() {
    super('progressBar', html);
    this.timeRatio = 0;
    this.loadRatio = 0;
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    this._draging = false;
    this.onSeekStart = null;
    this.onSeekUpdate = null;
    this.onSeekFinish = null;
  }

  onMouseDown(e) {
    if (this.onSeekStart) {
      this.onSeekStart();
    }
    this._draging = true;
    this.updatePosition(e);
  }

  onMouseMove(e) {
    if (this._draging) {
      this.updatePosition(e);
    }
  }

  onMouseUp() {
    if (this._draging) {
      this._draging = false;
      if (this.onSeekFinish) {
        this.onSeekFinish();
      }
    }
  }

  updatePosition(e) {
    var pos = utils.getPosition(this.element, e);
    this.timeRatio = pos.rx;
    if (this.onSeekUpdate) {
      this.onSeekUpdate();
    }
  }

  get timeRatio() {
    return this._timeRatio;
  }

  set timeRatio(value) {
    this._timeRatio = utils.clamp(value);
    this.setNodeAttr('time', 'width', 100*this._timeRatio);
  }

  get loadRatio() {
    return this._loadRatio;
  }

  set loadRatio(value) {
    this._loadRatio = utils.clamp(value);
    this.setNodeAttr('load', 'width', 100*this._loadRatio);
  }


}
