import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
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
      position: 0,
      playbackRate: 1
    };

    Notifier.get('playback').on('play', this.play.bind(this));
    Notifier.get('playback').on('pause', this.pause.bind(this));

    this.data = null;
    this.playing = false;
    app.player = this;
  }

  play(data) {
    this.data = data;
    Notifier.get('playback').emit('change', {data:this.data, state:'load'});
    this.podcastPlayer.play(data);
    this.playing = true;
  }

  pause() {
    this.podcastPlayer.pause();
    this.playing = false;
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
        Notifier.get('playback').emit('change', {data:this.data, state:'pause'});
      break;
    }
  }

  render() {
    return (
      <div ref="audio" className="audio-player"></div>
    );
  }

}
