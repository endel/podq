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
        <div className="playback-btn"></div>
      );
    } else if (status === 'play') {
      return (
        <div className="playback-btn" onClick={this.onClick.bind(this)}>
          <img ref='pause' id='pause' className='icon-img' src='/images/pause.svg'/>
        </div>
      );
    } else {
      return (
        <div className="playback-btn" onClick={this.onClick.bind(this)}>
          <img ref='play' id='play' className='icon-img' src='/images/play.svg'/>
        </div>
      );
    }
  }
}
