import React from 'react';
import Cover from './Cover.jsx';
import PlaybackBtn from './PlaybackBtn.jsx';
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
    e.preventDefault()
    app.entry = this.props.data.data;
    app.feed = this.props.data.info;
    app.history.pushState(null, '/entry/' + this.props.data._id);
  }

  onClickFeed(e) {
    app.entry = this.props.data.data;
    app.feed = this.props.data.info;
    app.history.pushState(null, '/feed/' + this.props.info._id);
  }

  render() {
    var date = tools.simpleDate(this.props.data.published);
    var img = this.props.data.image || this.props.info.image;

    return (
      <div className='item entry' onClick={this.onClickDetails.bind(this)}>
        <div className="shadow"></div>

        {/* (this.props.showTitle)
          ? <div className='top text'><div>{this.props.info.title}</div></div>
          : null */}

        <div className='mid'>
          <div className='btn'>
            <PlaybackBtn data={this.props.data}/>
          </div>
          <Cover src={img}/>
        </div>

        <div className='bot text'><div>{date} - {this.props.data.title}</div></div>
      </div>
    );
  }
}
