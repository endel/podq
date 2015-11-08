import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
    this.client = new Client();
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

  get defaultState() {
    return {title:'Browse', list:[]};
  }

  onItemSelect(data) {
    if (data.audio_url == undefined) {
      app.title = data.title;
      app.history.pushState(null, '/feed/' + data._id);
    } else {
      app.title = data.title;
      app.history.pushState(null, '/entry/' + data._id);
    }
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load('feeds');
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
  }

  render() {
    var title = this.state.title;
    return (
      <section className='section'>
        <div className='title'>{title}</div>
        <ItemList
          ref='list'
          data={this.state.list}
        />
      </section>
    );
  }
}
