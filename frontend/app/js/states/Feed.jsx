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
    return {title:'', description:'', entries:[]};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load(`feeds/${this.props.params.id}/entries`);
    this.setState({title:app.title});
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(props) {
    this.setState(this.initialState);
    this.load(`feeds/${props.params.id}/entries`);
  }

  load(service) {
    this.clean();
    this.client.fetch(service)
      .then((json) => {
        json.feed.entries = json.entries
        delete json.entries
        this.setState(json.feed);
      })
  }

  clean() {
    this.setState(this.initialState);
  }

  render() {
    var permalink = (this.state.permalink)
      ? <a href={this.state.permalink} target="_blank">{this.state.permalink}</a>
      : null

    return (
      <section className='section'>
        <h1>
          {this.state.title} <SubscribeButton feed_id={ this.state._id } />
        </h1>
        <p>
          {this.state.description} <br/ >
          { permalink }
        </p>
        <ItemList
          ref='list'
          data={this.state.entries}
        />
      </section>
    );
  }
}
