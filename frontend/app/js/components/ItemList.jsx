import React from 'react';
import ItemFeed from './ItemFeed.jsx';
import ItemEntry from './ItemEntry.jsx';
import { getDataType } from '../tools/tools';

export default class ItemList extends React.Component {

  constructor() {
    super();
  }

  render() {
    var entries = this.props.entries;

    if (!entries || !entries.length) {
      return <div></div>;
    }

    return (
      <div className='item-list'>

        <div>{ entries.map( data => {
          var type = getDataType(data);

          if (type === 'entry') {

            return <ItemEntry showTitle={ this.props.showTitle } info={ this.props.info } data={data} key={data._id} />

          } else {

            return <ItemFeed info={ this.props.info } data={data} key={data._id} />

          }
        } ) }</div>

      </div>
    );
  }

}
