import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = {list:[]};
    this.type = 'feed';
    this.load('/mockdata/feed-list.json');
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
  }

  load(url) {
    this.clean();
    fetch(url)
      .then((response) => {
        return response.text();
      }).then((json) => {
        var data = JSON.parse(json);
        this.setState(data);
      });
  }

  clean() {
    this.setState({list:[]});
  }

  onItemSelect(data) {
    if (this.type === 'feed') {
      this.type = 'entry';
      this.load('/mockdata/entry-list.json');
    } else if (this.type === 'entry') {
      Notifier.get('main').emit('play', data.audio);
    }
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
