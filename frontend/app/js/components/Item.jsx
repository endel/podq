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
    return (
      <div className="item" onClick={this.handleClick.bind(this)}>
        <div className="icon">
          <img className="icon-img" src="svg/icon-play.svg" width="50px" height="50px"/>
        </div>
        <Cover src={this.props.data.image} />
      </div>
    );
  }
}
