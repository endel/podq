import React from 'react';
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';

export default class Feed extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {title:'', list:null};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
    Notifier.get('main').on('search-results', this.onItemSelect.bind(this));
    this.load(`feeds/${this.props.params.id}/entries`);
    this.setState({title:app.title});
  }

  componentWillUnmount() {
    Notifier.get('main').off('item-selected', this.onItemSelect.bind(this));
    Notifier.get('main').off('search-results', this.onItemSelect.bind(this));
  }

  onItemSelect(data) {
    Notifier.get('playback').emit('play', data);
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then((json) => {
        // console.log(json);
        this.setState({title:json.feed.title, list:json.entries});
      });
  }

  clean() {
    this.setState({list:[]});
  }

  render() {
    var title = this.state.title;
    var list = this.state.list ? this.state.list : [];
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
