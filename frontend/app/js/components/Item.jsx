import React from 'react';
import Cover from './Cover.jsx';
import Notifier from '../tools/Notifier';

export default class Item extends React.Component {
  constructor() {
    super();
    this.onSelect = null;
    this.iconPlay = null;
    this.iconPause = null;
    this.icon = null;
  }

  handleClick() {
    Notifier.get('main').emit('item-selected', this.props.data);
  }

  componentDidMount() {
    Notifier.get('main').on('playback-change', this.onPlaybackChange.bind(this));
    this.iconPlay = React.findDOMNode(this.refs.play);
    this.iconPause = React.findDOMNode(this.refs.pause);
    this.icon = React.findDOMNode(this.refs.icon);
    this.stop();
    this.icon.style.opacity = 0;
    this.icon.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.icon.addEventListener('mouseout', this.onMouseOut.bind(this));
  }

  componentWillUnmount() {
    Notifier.get('main').off('playback-change', this.onPlaybackChange.bind(this));
    this.icon.removeEventListener('mouseover', this.onMouseOver.bind(this));
    this.icon.removeEventListener('mouseout', this.onMouseOut.bind(this));
  }

  onMouseOver(e) {
    this.icon.style.opacity = 0.3;
  }

  onMouseOut(e) {
    this.icon.style.opacity = 0;
  }

  onPlaybackChange(e) {
    var playing = e.state === 'play';
    if (playing && e.data === this.props.data) {
      this.play();
    } else {
      this.stop();
    }
  }

  play() {
    this.iconPlay.style.opacity = 0;
    this.iconPause.style.opacity = 1;
  }

  stop() {
    this.iconPlay.style.opacity = 1;
    this.iconPause.style.opacity = 0;
  }

  render() {
    var type = this.props.data.audio_url ? 'entry' : 'feed';
    var className = type ? `item ${type}` : 'item';

    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        <div ref='icon' className="icon">
          <img ref='play' id='play' className='icon-img' src='svg/play.svg'/>
          <img ref='pause' id='pause' className='icon-img' src='svg/pause.svg'/>
        </div>
        <Cover src={this.props.data.image} />
      </div>
    );
  }
}
