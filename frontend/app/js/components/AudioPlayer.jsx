import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Notifier from '../tools/Notifier';
import Session from '../tools/Session';
import app from '../app';
import Cover from './Cover.jsx';
import PodcastPlayer from 'podcast-player';
import Keycode from 'keycode.js'

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

    app.player = this;
  }

  play(data) {
    this.podcastPlayer.play(data);
  }

  pause() {
    this.podcastPlayer.pause();
  }

  componentDidMount() {
    this.audio = React.findDOMNode(this.refs.audio);
    this.podcastPlayer = new PodcastPlayer(this.audio, app.settings.autoPlay);
    this.podcastPlayer.onChangeState = this.onChangeState.bind(this);
    document.addEventListener('keydown', this.onKeyDown.bind(this))
  }

  onKeyDown (e) {
    e.preventDefault()
    if (e.keyCode == Keycode.SPACE) {
      if (this.podcastPlayer.playing) {
        this.pause()
      } else {
        this.play()
      }
    }
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

  get data() {
    return this.podcastPlayer.data;
  }

  get playbackState() {
    var s = 'pause';
    switch (this.podcastPlayer.state) {
      case PodcastPlayer.LOADING:
        s = 'load';
      break;
      case PodcastPlayer.PLAYING:
        s = 'play';
      break;
      case PodcastPlayer.PAUSED:
        s = 'pause';
      break;
    }
    return s;
  }

  render() {
    return (
      <div ref="audio" className="audio-player"></div>
    );
  }
}
