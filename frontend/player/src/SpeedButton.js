import Graphics from './Graphics';

var html = `
<svg width="100%" viewbox="0 0 100 100">
  <circle id="circle" cx="50" cy="50" r="40" stroke="white" stroke-width="6"/>
  <text id="speed" x="50" y="57" text-anchor="middle" style=
              "font-family: Verdana;
               font-size  : 20;
               fill       : #FFFFFF;
               font-weight: bold;
               user-select: none;
               "
               >1x</text>
</svg>
`;

var speedStep = 0.2;
var maxSpeed = 2;

export default class SpeedButton extends Graphics {
  constructor() {
    super('speedButton', html);
    this.element.addEventListener('click', this.onClick.bind(this));
    this.onChange = null;
    this._speed = 1.0;
    this.element.style.cursor = 'pointer';
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
    this.updateSpeed();
  }

  updateSpeed() {
    var str = this._speed + 'x';
    this.nodes['speed'].textContent = str;
    if (this.onChange) {
      this.onChange(this._speed);
    }
  }

  onClick() {
    var s = this._speed + speedStep;
    if (s > maxSpeed) {
      s = 1;
    }
    this.speed = Number(s.toFixed(1));
  }

}
