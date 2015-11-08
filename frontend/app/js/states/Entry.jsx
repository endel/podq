import React from 'react';
import { Link } from 'react-router'
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';

export default class Entry extends React.Component {
  constructor() {
    super();
    this.state = {feed:{}}
    this.client = new Client();
  }

  load(service) {
    console.log('load');
    this.client.fetch(service)
      .then((data) => {
        this.setState(data);
      });
  }

  componentDidMount() {
    if (!app.entry) {
      this.load(`entries/${this.props.params.id}`);
    } else {
      this.setState(app.entry);
    }
  }

  render() {
    return (
      <section className='section'>
        <h1><Link to={`/feed/${ this.state.feed._id }`}>{ this.state.feed.title }</Link>: {this.state.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.state.description }} />
      </section>
    );
  }
}
