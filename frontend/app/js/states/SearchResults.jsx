import React from 'react';
import { findDOMNode } from 'react-dom'

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
    return {feed:{}, offset: 0, limit: 100, entries:[], loading:true, title:''};
  }

  componentDidMount() {
    app.resetScroll()
    this.query( this.props.location.query.q );
  }

  componentWillReceiveProps ( props ) {
    this.query( props.location.query.q );
  }

  query( keywords ) {
    this.clean();
    this.client.fetch(`entries?limit=${ this.state.limit }&search=${ keywords }`)
      .then(json => {
        json.loading = false;
        json.title = `Search results for "${this.props.location.query.q}":`;
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
        <p>Displaying { this.state.offset } of { this.state.limit } results.</p>
        <ItemList
          showTitle={ true }
          list={this.state.entries}
        />
      </section>
    );
  }
}
