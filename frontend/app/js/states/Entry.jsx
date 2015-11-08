import React from 'react';
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';

export default class Entry extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {data:null};
  }

  load(service) {
    console.log('load');
    this.client.fetch(service)
      .then((json) => {
        this.setState({data:json});
        console.log(json);
      });
  }

  componentDidMount() {
    if (!app.entry) {
      this.load(`entries/${this.props.params.id}`);
    } else {
      this.setState({data:app.entry});
    }
  }

  render() {
    var title = this.state.data ? this.state.data.title : '';
    return (
      <section className='section'>
        <div className='title'>{title}</div>
      </section>
    );
  }
}
