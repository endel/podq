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

  onClickDetails(e) {
    app.entry = this.props.data.data;
    app.feed = this.props.data.info;
    app.history.pushState(null, '/entry/' + this.props.data._id);
  }

  onClickFeed(e) {
    app.entry = this.props.data.data;
    app.feed = this.props.data.info;
    app.history.pushState(null, '/feed/' + this.props.info._id);
  }

  componentDidMount() {
    this.btn = React.findDOMNode(this.refs.btn);
    this.cover = React.findDOMNode(this.refs.cover);
    this.hitArea = React.findDOMNode(this.refs.hitArea);
    this.btn.onmouseover = this.onOver.bind(this);
    this.btn.onmouseout = this.onOut.bind(this);
  }

  componentWillUnmount() {
    this.btn.onmouseover = null;
    this.btn.onmouseout = null;
    this.btn = null;
    this.cover = null;
    this.hitArea = null;
  }

  onOver() {
    this.btn.style.opacity = 1;
  }

  onOut() {
    this.btn.style.opacity = 0.3;
  }

  render() {
    var date = tools.simpleDate(this.props.data.published);
    var img = this.props.data.image || this.props.info.image;
    var top = this.props.info.title ? `${this.props.info.title} - ${date}` : date;
    return (
      <div className='item entry'>
        <div className='top text'>{top}</div>
        <div className='mid'>
          <div ref='btn' className='btn'>
            <PlaybackBtn data={this.props.data}/>
          </div>
          <div ref='hitArea' className='hitArea' onClick={this.onClickDetails.bind(this)}></div>
          <Cover ref='cover' src={img}/>
        </div>

        <div className='bot text' onClick={this.onClickDetails.bind(this)}>{this.props.data.title}</div>
      </div>
    );
  }
}
