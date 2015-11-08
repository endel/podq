import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';

export default class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {title:'Search Results', list:[]};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
    Notifier.get('main').on('search-results', this.onItemSelect.bind(this));
  }

  componentWillUnmount() {
    Notifier.get('main').off('item-selected', this.onItemSelect.bind(this));
    Notifier.get('main').off('search-results', this.onItemSelect.bind(this));
  }

  onItemSelect(data) {
    if (!this.data.audio_url) {
      this.load(`feeds/${data._id}/entries`);
      this.setState({title:data.title});
    } else {
      Notifier.get('playback').emit('play', data);
    }
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then((json) => {
        this.setState({list:json});
      });
  }

  clean() {
    this.setState({list:[]});
  }

  render() {
    var title = this.state.title;
    var list = this.state.list;
    return (
      <section className='section'>
        <div className='title'>{title}</div>
        <ItemList
          ref='list'
          data={list}
        />
      </section>
    );
  }
}
