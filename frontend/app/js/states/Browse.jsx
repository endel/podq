import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = {list:[]};

    fetch('/mockdata/feed-list.json')
      .then((response) => {
        return response.text();
      }).then((json) => {
        var data = JSON.parse(json);
        this.setState(data);
      });

    Notifier.get('main').on('item-selected', (data) => {
      console.log(data.name);
    });
  }

  render() {
    return (
      <section>
        <ItemList
          data={this.state.list}
        />
      </section>
    );
  }
}
