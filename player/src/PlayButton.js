import Graphics from './Graphics';

var html = `
  <svg width="100%" viewbox="0 0 100 100">
    <circle id="circle" cx="50" cy="50" r="40" stroke="white" stroke-width="8"/>

    <polygon id="play" points="45,40 45,60, 60,50" fill="white"
    stroke="white" stroke-width="8" stroke-linecap="butt"></polygon>

    <path id="pause" d="M40,32V68 M60,32V68" fill="white"
    stroke="white" stroke-width="8" stroke-linecap="butt"></path>

    <path id="spinner" fill="white"
      d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      stroke="white" stroke-width="3" stroke-linecap="butt">
      <animateTransform
         attributeName="transform"
         attributeType="XML"
         type="rotate"
         dur="0.5s"
         from="0 50 50"
         to="360 50 50"
         repeatCount="indefinite" />
  </path>
  </svg>
`;

export default class PlayButton extends Graphics {
  constructor() {
    super('playButton', html);
    this.state = PlayButton.IDLE;
    this.element.addEventListener('click', this.onClick.bind(this));
    this.onClick = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    this.updateState();
  }

  updateState() {
    this.setNodeAttr('spinner', 'opacity', this._state === PlayButton.LOADING ? 1 : 0);
    this.setNodeAttr('pause', 'opacity', this._state === PlayButton.PLAYING ? 1 : 0);
    this.setNodeAttr('play', 'opacity', this._state === PlayButton.PAUSED ? 1 : 0);
    this.element.style.cursor = this.interactive ? 'pointer' : 'auto';
  }

  get interactive() {
    return this._state === PlayButton.PLAYING || this._state === PlayButton.PAUSED;
  }

  onClick() {
    if (this.onClick && this.interactive) {
      this.onClick();
    }
  }
}

PlayButton.IDLE = 0;
PlayButton.LOADING = 1;
PlayButton.PLAYING = 2;
PlayButton.PAUSED = 3;
