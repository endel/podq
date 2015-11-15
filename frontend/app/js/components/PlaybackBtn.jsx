import React from 'react';
import Notifier from '../tools/Notifier';
import app from '../app';

export default class PlaybackBtn extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
  }

  get initialState() {
    return {status:'pause'};
  }

  componentDidMount() {
    Notifier.get('playback').on('change', this.onPlaybackChange, this);
    this.updateIcon();
  }

  componentWillUnmount() {
    Notifier.get('playback').off('change', this.onPlaybackChange, this);
  }

  onClick(e) {
    if (this.interactive()) {
      if (this.getStatus() === 'play') {
        Notifier.get('playback').emit('pause', this.props.data);
      } else {
        this.setState({status:'load'});
        Notifier.get('playback').emit('play', this.props.data);
      }
    }
    e.preventDefault();
    e.stopPropagation();
    this.updateIcon();
  }

  onPlaybackChange(e) {
    if (e.data._id === this.props.data._id) {
      this.setState({status:e.state});
    } else {
      this.setState({status:'pause'});
    }
  }

  updateIcon() {
    if (app.player.data && app.player.data._id === this.props.data._id) {
      this.setState({status:'play'});
    } else {
      this.setState({status:'pause'});
    }
  }

  interactive() {
    return this.getStatus() !== 'load';
  }

  getStatus() {
    return this.state.status || this.props.status;
  }

  render() {
    var status = this.getStatus();
    if (status === 'load') {
      return (
        <svg width="100%" viewBox="0 0 100 100">
          <path id="pause" d="M40,32V68 M60,32V68" fill="black"
            stroke="black" strokeWidth="8" strokeLinecap="butt"></path>

            <defs>
              <clipPath id="cut-off-bottom">
                <rect x="0" y="0" width="65" height="65" />
              </clipPath>
            </defs>

            <circle id="spinner" cx="50" cy="50" r="25"
            stroke="black" strokeWidth="4" strokeLinecap="butt"
            clip-path="url(#cut-off-bottom)"></circle>
        </svg>
      );
    } else if (status === 'play') {
      return (
        <div className="playback-btn" onClick={this.onClick.bind(this)}>
          <svg width="100%" viewBox="0 0 100 100">
            <circle id="circle" cx="50" cy="50" r="40" stroke="black" strokeWidth="8"/>
            <path id="pause" d="M40,32V68 M60,32V68" fill="white"
            stroke="white" strokeWidth="8" strokeLinecap="butt"></path>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="playback-btn" onClick={this.onClick.bind(this)}>
          <svg width="100%" viewBox="0 0 100 100">
            <circle id="circle" cx="50" cy="50" r="40" stroke="black" strokeWidth="8"/>
            <polygon id="play" points="45,40 45,60, 60,50" fill="white"
            stroke="white" strokeWidth="8" strokeLinecap="butt"></polygon>
          </svg>
        </div>
      );
    }
  }
}
