import React from 'react';
import Notifier from '../tools/Notifier';
import app from '../app';

export default class PlaybackBtn extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
  }

  get initialState() {
    return {status:'stop'};
  }

  componentDidMount() {
    Notifier.get('playback').on('change', this.onPlaybackChange, this);
    if (app.player.data && app.player.data._id == this.props.data._id) {
      this.setState({status:'play'});
    }
  }

  componentWillUnmount() {
    Notifier.get('playback').off('change', this.onPlaybackChange, this);
  }

  onClick(e) {
    Notifier.get('playback').emit('toggle', this.props.data);
  }

  onPlaybackChange(e) {
    if (e.data._id === this.props.data._id) {
      this.setState({status:e.state});
    } else {
      this.setState({status:'stop'});
    }
  }

  render() {
    var status = this.state.status || this.props.status;
    var iconPlay = <img ref='play' id='play' className='icon-img' src='/svg/play.svg'/>;
    var iconPause = <img ref='pause' id='pause' className='icon-img' src='/svg/pause.svg'/>;
    var icon = status === 'stop' ? iconPlay : iconPause;
    return (
      <div className="playback-btn" onClick={this.onClick.bind(this)}>
        {icon}
      </div>
    );
  }
}
