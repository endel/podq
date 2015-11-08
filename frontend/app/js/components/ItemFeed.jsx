import React from 'react';
import Cover from './Cover.jsx';
import PlaybackBtn from './PlaybackBtn.jsx';
import Notifier from '../tools/Notifier';
import * as tools from '../tools/tools';
import app from '../app';

export default class ItemFeed extends React.Component {
  constructor() {
    super();
    this.onSelect = null;
    this.iconPlay = null;
    this.iconPause = null;
    this.icon = null;
  }

  handleClick() {
    if (this.isFeed()) {
      app.title = this.props.data.title;
      app.history.pushState(null, '/feed/' + this.props.data._id);
    } else {
      app.title = this.props.data.title;
      app.entry = this.props.data;
      app.history.pushState(null, '/entry/' + this.props.data._id);
    }
  }

  isFeed() {
    return tools.getDataType(this.props.data) === 'feed';
  }

  componentDidMount() {
    this.btn = React.findDOMNode(this.refs.btn);
    this.cover = React.findDOMNode(this.refs.cover);
  }

  componentWillUnmount() {

  }

  render() {
    var type = this.props.data.audio_url ? 'entry' : 'feed';
    var className = type ? `item ${type}` : 'item';

    return (
      <div className={className}>
        {type === 'entry' ?
          <div className='btn'>
            <PlaybackBtn ref='btn' data={this.props.data}/>
          </div>
        : ''}
        <div className='hitArea' onClick={this.handleClick.bind(this)}></div>
        <Cover ref='cover' src={this.props.data.image}/>
      </div>
    );
  }
}
