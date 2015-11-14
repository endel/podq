import Graphics from './Graphics';

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
    this._timeRatio = 1;
  }

  get timeRatio() {
    return this._timeRatio;
  }

  set timeRatio(value) {
    this._timeRatio = this.clamp(value);
    this.setNodeAttr('time', 'width', 100*this._timeRatio);
  }

  get loadRatio() {
    return this._loadRatio;
  }

  set loadRatio(value) {
    this._loadRatio = this.clamp(value);
    this.setNodeAttr('load', 'width', 100*this._loadRatio);
  }

  clamp(v, min = 0, max = 1) {
    if (v < min) {
      return min;
    } else if (v > max) {
      return max;
    } else {
      return v;
    }
  }
}
