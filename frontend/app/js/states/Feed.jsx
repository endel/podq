import React from 'react';
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import SubscribeButton from '../components/SubscribeButton.jsx'
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
    return {feed:{}, entries:[]};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
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

    return (
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
