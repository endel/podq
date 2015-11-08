import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
    this.type = 'feed';
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
    if (this.type === 'feed') {
      this.type = 'entry';
      this.load(`feeds/${data._id}/entries`);
      this.setState({title:data.title});
    } else if (this.type === 'entry') {
      Notifier.get('playback').emit('play', data);
    }
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load('feeds');
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
  }

  render() {
    return (
      <section className='browse'>
        <ItemList
          ref='list'
          title={this.state.title}
          data={this.state.list}
        />
      </section>
    );
  }
}
