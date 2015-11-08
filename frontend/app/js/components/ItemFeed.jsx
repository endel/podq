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
    app.feed = this.props.feed;
    app.entry = this.props.data;
    app.history.pushState(null, '/feed/' + this.props.data._id);
  }

  componentDidMount() {
    this.cover = React.findDOMNode(this.refs.cover);
  }

  componentWillUnmount() {
    this.cover = null;
  }

  render() {
    return (
      <div className='item feed'>
        <div className='hitArea' onClick={this.handleClick.bind(this)}></div>
        <Cover ref='cover' src={this.props.data.image} alt={this.props.data.title}/>
      </div>
    );
  }
}
