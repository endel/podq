import React from 'react';
import Item from './Item.jsx';

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
    array.forEach((item) => {
        items.push(<Item data={item} key={item._id} />);
    });
    return (
      <div className='item-list'>
        <div>{items}</div>
      </div>
    );
  }
}
