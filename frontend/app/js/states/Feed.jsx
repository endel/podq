import React from 'react';
import main from '../main';
import ItemList from '../components/ItemList.jsx';
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
    return {title:'', list:[]};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load(`feeds/${this.props.params.id}/entries`);
    this.setState({title:app.title});
  }

  componentWillUnmount() {

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

  subscribe () {
  }

  render() {
    return (
      <section className='section'>
        <h1>
          {this.state.title} <button onClick={this.subscribe.bind(this)}>Subscribe</button>
        </h1>
        <p>{this.state.description}</p>
        <ItemList
          ref='list'
          data={this.state.entries}
        />
      </section>
    );
  }
}
