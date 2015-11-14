import Graphics from './Graphics';

var html = `
  <svg width="100%" viewbox="0 0 100 100">
    <polygon id="play" points="10,0 10,100, 100,50" fill="red"></polygon>
    <path id="pause" d="M20,0H40V100H20V0 M60,0H80V100H60V0" fill="white"></path>
    <path id="spinner" fill="white"
      d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      stroke="white" stroke-width="3">
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
    this.setNodeAttr('pause', 'opacity', 0.0);
    this.setNodeAttr('spinner', 'opacity', 0.0);
  }
}
