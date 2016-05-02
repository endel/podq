import React from 'react';
import Cover from './Cover.jsx';
import PlaybackBtn from './PlaybackBtn.jsx';
import { simpleDate } from '../tools/tools';
import app from '../app';

export default class ItemFeed extends React.Component {

  constructor() {
    super();
    this.onSelect = null;
    this.iconPlay = null;
    this.iconPause = null;
    this.icon = null;
  }

  handleClick(e) {
    e.preventDefault()
    app.feed = this.props.feed;
    app.entry = this.props.data;
    app.history.push('/podcasts/' + this.props.data._id);
  }

  // componentDidMount() {
  //   this.cover = React.findDOMNode(this.refs.cover);
  // }

  // componentWillUnmount() {
  //   this.cover = null;
  // }

  render() {
    return (
      <div title={ this.props.data.title } className='item feed' onClick={ this.handleClick.bind(this) }>
        <div className="shadow"></div>
        <div className='top text'><div>{ this.props.data.title }</div></div>
        <Cover ref='cover' src={ this.props.data.image } alt={ this.props.data.title }/>
        <div className='bottom text'><div>{ simpleDate( this.props.data.most_recent_entry_date ) }</div></div>
      </div>
    );
  }
}
