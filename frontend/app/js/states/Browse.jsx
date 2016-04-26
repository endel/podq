import React from 'react';
import { findDOMNode } from 'react-dom';

import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';
import * as tools from '../tools/tools';

export default class Browse extends React.Component {

  constructor() {
    super();
    this.state = this.defaultState;
    this.client = new Client();
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then(json => {
        this.setState({
          list: json,
          loading: false
        });
      });
  }

  clean() {
    this.setState({list:[]});
  }

  get defaultState() {
    return {
      title: 'Browse',
      list: [],
      description: "Discover free podcasts around the world.",
      loading: true
    };
  }

  componentDidMount() {
    app.resetScroll()
    this.list = findDOMNode( this.refs.list );
    this.load('feeds');
  }

  componentWillUnmount() {
    this.list = null;
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
          list={this.state.list}
        />
      </section>
    );
  }

}
