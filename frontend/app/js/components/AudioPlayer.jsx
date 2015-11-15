import React from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

import Notifier from '../tools/Notifier';
import Session from '../tools/Session';
import app from '../app';
import Cover from './Cover.jsx';
import PodcastPlayer from 'podcast-player';

export default class AudioPlayer  extends React.Component {
  constructor() {
    this.state = {
      url: null,
      status: 'stopped',
      position: 0
    };

    Notifier.get('playback').on('play', this.play.bind(this));
    Notifier.get('playback').on('stop', this.stop.bind(this));
    Notifier.get('playback').on('toggle', this.toggle.bind(this));

    this.data = null;
    this.playing = false;
    app.player = this;
  }

  toggle(data) {
    if (data && this.data && data._id === this.data._id) {
      if (this.playing) {
        this.podcastPlayer.pause();
      } else {
        this.podcastPlayer.play();
        this.playing = true;
      }
    } else if (data) {
      this.play(data);
    }
  }

  play(data) {
    if (data !== this.data) {
      this.data = data;
      this.podcastPlayer.play(data);
    } else {
      this.podcastPlayer.play();
    }
    this.playing = true;
  }

  stop() {
    this.podcastPlayer.pause();
    this.playing = false;
  }

  changePlaybackRate(rate, e) {
    // this.audio.playbackRate = rate
    // this.setState({ playbackRate: rate })
  }

  componentDidMount() {
    this.audio = React.findDOMNode(this.refs.audio);
    this.podcastPlayer = new PodcastPlayer(this.audio);
    this.podcastPlayer.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState(state) {
    switch (state) {
      case PodcastPlayer.LOADING:
        Notifier.get('playback').emit('change', {data:this.data, state:'load'});
      break;
      case PodcastPlayer.PLAYING:
        Notifier.get('playback').emit('change', {data:this.data, state:'play'});
      break;
      case PodcastPlayer.PAUSED:
        Notifier.get('playback').emit('change', {data:this.data, state:'stop'});
      break;
    }
  }

  render () {
    return (
      <div ref="audio" className="audio-player">
      </div>
    );
  }

  // render () {
  //   return (
  //     <div ref="audio" className="audio-player">
  //       <audio ref='audio' controls autoPlay>
  //         <source src={this.state.url} />
  //       </audio>
  //       <ul>
  //         <li>Speed: </li>
  //         <li><button className={classNames({ active: (this.state.playbackRate == 1) })} onClick={this.changePlaybackRate.bind(this, 1)}>1x</button></li>
  //         <li><button className={classNames({ active: (this.state.playbackRate == 1.25) })} onClick={this.changePlaybackRate.bind(this, 1.25)}>1.25x</button></li>
  //         <li><button className={classNames({ active: (this.state.playbackRate == 1.50) })} onClick={this.changePlaybackRate.bind(this, 1.50)}>1.50x</button></li>
  //         <li><button className={classNames({ active: (this.state.playbackRate == 1.75) })} onClick={this.changePlaybackRate.bind(this, 1.75)}>1.75x</button></li>
  //       </ul>
  //
  //     </div>
  //   );
  // }

}
