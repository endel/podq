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
    return {feed:{}, entries:[], loading:true};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
  }

  componentWillUnmount() {
    this.list = null;
  }

  componentWillReceiveProps(props) {
    this.setState(this.initialState);
    console.log(this.props.params.q);
    this.load(`search?${this.props.params.q}`);
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

    return (this.state.loading) ? (
      <section className="section loading"></section>

    ) : (
      <section className='section'>
        <h1>
          {this.state.feed.title} <SubscribeButton feed={ this.state.feed } />
        </h1>
        <p>
          {this.state.feed.description} <br/ >
          { permalink }
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
