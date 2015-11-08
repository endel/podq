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
    return (
      <div className='item entry'>
        <div className='top text'>{this.props.info.title} - {date}</div>

        <div className='mid'>
          <div ref='btn' className='btn'>
            <PlaybackBtn data={this.props.data}/>
          </div>
          <div ref='hitArea' className='hitArea' onClick={this.handleClick.bind(this)}></div>
          <Cover ref='cover' src={this.props.data.image}/>
        </div>

        <div className='bot text'>{this.props.data.title}</div>
      </div>
    );
  }
}
