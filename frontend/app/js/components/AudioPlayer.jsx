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


    Notifier.get('main').on('play', this.onAudioSelect.bind(this));
  }

  onAudioSelect(url) {
    this.audio.src = url;
    this.audio.autoPlay = true;
  }

  handleSongLoading () {

  }

  handleSongPlaying () {

  }

  handleSongFinishedPlaying () {

  }

  componentDidMount() {
    this.audio = React.findDOMNode(this.refs.audio);
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
