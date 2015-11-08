import React from 'react';
import Item from './Item.jsx';

export default class ItemList extends React.Component {
  constructor() {
    super();
  }

  render() {
    var items = [];
    this.props.data.forEach((item) => {
        items.push(<Item data={item} key={item._id} />);
    });
    return (
      <div>{items}</div>
    );
  }
}
