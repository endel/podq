import React from 'react';
import Cover from './Cover.jsx';
import PlaybackBtn from './PlaybackBtn.jsx';
import Notifier from '../tools/Notifier';
import * as tools from '../tools/tools';
import app from '../app';

export default class ItemEntry extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
  }

  get initialState() {
    return {feed:{}, entry:{}};
  }

  handleClick() {
    app.entry = this.props.data.data;
    app.feed = this.props.data.info;
    app.history.pushState(null, '/entry/' + this.props.data._id);
  }

  componentDidMount() {
    this.btn = React.findDOMNode(this.refs.btn);
    this.cover = React.findDOMNode(this.refs.cover);
  }

  componentWillUnmount() {
    this.btn = null;
    this.cover = null;
  }

  render() {
    return (
      <div className='item entry'>
        <div className='title'>{this.props.info.title}</div>
        <div className='btn'>
          <PlaybackBtn ref='btn' data={this.props.data}/>
        </div>
        <div className='hitArea' onClick={this.handleClick.bind(this)}></div>
        <Cover ref='cover' src={this.props.data.image}/>
      </div>
    );
  }
}
