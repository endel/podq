import Graphics from './Graphics';

var html = `
  <svg width="100%" height="100%" viewbox="0 0 100 100" preserveaspectratio="none">
    <rect id="base" width="100" height="100" fill="red"/>
    <rect id="fill" width="100" height="100" fill="blue"/>
  </svg>
`;

export default class ProgressBar extends Graphics {
  constructor() {
    super('progressBar', html);
    this._ratio = 1;
  }

  get ratio() {
    return this._ratio;
  }

  set ratio(value) {
    this._ratio = value;
    this.setNodeAttr('fill', 'width', 100*this._ratio);
  }
}
