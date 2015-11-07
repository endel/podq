import React from 'react';
import Item from './Item.jsx';

export default class ItemList extends React.Component {
  constructor() {
    super();
  }

  render() {
    var items = [];
    this.props.data.forEach(function(item) {
        items.push(<Item data={item} key={item.name}/>);
    });
    return (
      <div>{items}</div>
    );
  }
}
