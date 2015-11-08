import React from 'react';
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import SubscribeButton from '../components/SubscribeButton.jsx'
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';

import classNames from 'classnames'

export default class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {feed:{}, entries:[], loading:true, title:''};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load(`entries?limit=100&search=${this.props.location.query.q}`);
  }

  componentWillUnmount() {
    this.list = null;
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then(json => {
        json.loading = false;
        json.title = `Search Results: ${this.props.location.query.q}`;
        this.setState(json);
      })
  }

  clean() {
    this.setState(this.initialState);
  }

  render() {
    return (this.state.loading) ? (
      <section className='section loading'></section>
    ) : (
      <section className='section'>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <ItemList
          ref='list'
          list={this.state.entries}
        />
      </section>
    );
  }
}
