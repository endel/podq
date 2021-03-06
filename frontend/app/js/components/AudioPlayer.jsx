import React from 'react';
import { findDOMNode } from 'react-dom';

import { Link } from 'react-router';
import classNames from 'classnames';
import Notifier from '../tools/Notifier';

import PodcastPlayer from '../player/Player';
import Keycode from 'keycode.js'

import app from '../app';

export default class AudioPlayer  extends React.Component {

  constructor() {
    super();

    this.state = {
      url: null,
      status: 'stopped',
      position: 0,
      playbackRate: 1,
      data: {}
    };

    Notifier.get('playback').on('play', this.play.bind(this));
    Notifier.get('playback').on('pause', this.pause.bind(this));

    app.player = this;
  }

  play(data) {
    this.podcastPlayer.play(data);
    this.forceUpdate()
  }

  pause() {
    this.podcastPlayer.pause();
  }

  componentDidMount() {

    this.podcastPlayer = new PodcastPlayer( findDOMNode( this.refs.player ), app.settings.autoPlay);
    this.podcastPlayer.onChangeState = this.onChangeState.bind(this);

    document.addEventListener('keydown', this.onKeyDown.bind(this))

    this.forceUpdate()
  }

  onKeyDown (e) {
    // only toggle play if user isn't focused on Input element
    if (!(e.path[0] instanceof HTMLInputElement)) {
      if (e.keyCode == Keycode.SPACE) {
        e.preventDefault()
          if (this.podcastPlayer.playing) {
            this.pause()
          } else {
            this.play()
          }
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

  set data(value) {
  }

  get data() {
    return (this.podcastPlayer && this.podcastPlayer.data) || {};
  }

  set playbackState(value) {
  }

  get playbackState() {
    var s = 'pause';

    if (!this.podcastPlayer) {
      return s;
    }

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

    let imageSrc = `https://i.embed.ly/1/display/resize?width=200&height=200&url=${ encodeURIComponent( ( this.data.image || "" ).replace("https://", "http://") ) }&key=00193985e12540c98f5a8a595480c62c`

    return (
      <div className="audio-player">

        { this.data._id
          ? <Link to={ `/episodes/${ this.data._id }` } title={ this.data.title }><img src={ imageSrc } /></Link>
          : null }

        <div className="player" ref="player"></div>
      </div>
    );

  }
}
