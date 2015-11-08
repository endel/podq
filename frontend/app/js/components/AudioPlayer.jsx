import React from 'react'
import { Link } from 'react-router'
import Notifier from '../tools/Notifier';

export default class AudioPlayer  extends React.Component {
  constructor() {
    this.state = {
      url: null,
      status: 'stopped',
      position: 0
    };

    Notifier.get('main').on('play', this.play.bind(this));
    Notifier.get('main').on('stop', this.stop.bind(this));
    this.data = null;
    this.playing = false;
  }

  play(data) {
    if (data === this.data) {
      if (this.playing) {
        this.audio.pause();
      } else {
        this.audio.play();
        this.playing = true;
      }
    } else if (data) {
      this.stop();
      this.data = data;
      this.audio.src = data.audio_url;
      this.audio.autoPlay = true;
      this.playing = true;
    }
  }

  stop() {
    this.audio.pause();
    this.playing = false;
  }

  onPlaybackStart(e) {
    this.playing = true;
    Notifier.get('main').emit('playback-change', {data:this.data, state:'play'});
  }

  onPlaybackStop(e) {
    this.playing = false;
    Notifier.get('main').emit('playback-change', {data:this.data, state:'stop'});
  }

  componentDidMount() {
    this.audio = React.findDOMNode(this.refs.audio);
    this.audio.addEventListener('play', this.onPlaybackStart.bind(this));
    this.audio.addEventListener('pause', this.onPlaybackStop.bind(this));
    this.audio.addEventListener('ended', this.onPlaybackStop.bind(this));
  }

  render () {
    return (
      <div className="audio-player">
        <audio ref='audio' controls autoPlay>
          <source src={this.state.url} />
        </audio>
      </div>
    );
  }
}
