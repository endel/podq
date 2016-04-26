import React from 'react';
import { findDOMNode } from 'react-dom'

import { Link } from 'react-router';

import ItemList from '../components/ItemList.jsx';
import SubscribeButton from '../components/SubscribeButton.jsx';
import ReportButton from '../components/ReportButton.jsx';

import Client from '../tools/Client';
import app from '../app';

import classNames from 'classnames'

export default class Feed extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {feed:{}, entries:[], loading:true};
  }

  componentDidMount() {
    app.resetScroll()
    this.list = findDOMNode(this.refs.list);
    this.load(`feeds/${this.props.params.id}/entries`);
  }

  componentWillUnmount() {
    this.list = null;
  }

  componentWillReceiveProps(props) {
    this.setState(this.initialState);
    this.load(`feeds/${props.params.id}/entries`);
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then(json => {
        json.loading = false
        this.setState(json);
      })
  }

  clean() {
    this.setState(this.initialState);
  }

  render() {
    var permalink = (this.state.feed.permalink)
      ? <a href={this.state.feed.permalink} target="_blank">{this.state.feed.permalink}</a>
      : null

    var description = (this.state.feed.description) ? <p>{ this.state.feed.description }</p> : null

    return (this.state.loading) ? (
      <section className="section loading"></section>

    ) : (
      <section className='section'>
        <h1>
          {this.state.feed.title}
          <SubscribeButton feed={ this.state.feed } />
        </h1>
          { description }
        <p className="permalink">
          { permalink }
          <Link className="rss" to={ this.state.feed.url } target="_blank"><img src="/images/rss.png" alt="RSS Feed" /></Link>
        </p>

        <ItemList
          ref='list'
          info={this.state.feed}
          list={this.state.entries}
        />
      </section>
    );
  }
}
