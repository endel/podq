import React from 'react';
import ItemFeed from './ItemFeed.jsx';
import ItemEntry from './ItemEntry.jsx';
import * as tools from '../tools/tools';

export default class ItemList extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
  }

  get initialState() {
    return {info:{}, list:[]};
  }

  render() {
    var items = [];
    var info = this.props.info || this.state.info;
    var list = this.props.list || this.state.list;
    list.forEach(data => {
      var type = tools.getDataType(data);
      if (type === 'entry') {
        items.push(<ItemEntry info={info} data={data} key={data._id} />);
      } else {
        items.push(<ItemFeed info={info} data={data} key={data._id} />);
      }
    });
    items.reverse();
    return (
      <div className='item-list'>
        <div>{items}</div>
      </div>
    );
  }
}
