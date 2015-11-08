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
    return {data:[]};
  }

  render() {
    var items = [];
    var title = this.props.title || this.state.title;
    var array = this.props.data || this.state.data;
    array.forEach(data => {
      var type = tools.getDataType(data);
      if (data.type === 'entry') {
        items.push(<ItemEntry data={data} key={data._id} />);
      } else {
        items.push(<ItemFeed data={data} key={data._id} />);
      }
    });
    return (
      <div className='item-list'>
        <div>{items}</div>
      </div>
    );
  }
}
