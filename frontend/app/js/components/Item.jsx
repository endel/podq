import React from 'react';
import Cover from './Cover.jsx';
import Notifier from '../tools/Notifier';

export default class Item extends React.Component {
  constructor() {
    super();
    this.onSelect = null;
  }

  handleClick() {
    Notifier.get('main').emit('item-selected', this.props.data);
  }

  render() {
    var type = this.props.data.audio ? 'entry' : 'feed';
    var className = type ? `item ${type}` : 'item';
    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        <div className="icon">
          <img className="icon-img" src="svg/play.svg"/>
        </div>
        <Cover src={this.props.data.image} />
      </div>
    );
  }
}
