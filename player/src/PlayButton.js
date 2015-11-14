import Graphics from './Graphics';

var html = `
  <svg width="100%" viewbox="0 0 100 100">
    <polygon id="play" points="10,0 10,100, 100,50" fill="red"></polygon>
    <path id="pause" d="M20,0H40V100H20V0 M60,0H80V100H60V0" fill="white"></path>
  </svg>
`;

export default class PlayButton extends Graphics {
  constructor() {
    super('playButton', html);
    this.setNodeAttr('pause', 'opacity', 0.0);
  }
}
