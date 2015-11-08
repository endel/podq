import React from 'react';
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
      .then((json) => {
        this.setState({list:json});
      });
  }

  clean() {
    this.setState({list:[]});
  }

  get defaultState() {
    return {title:'Browse', list:[]};
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
    this.load('feeds');
  }

  componentWillUnmount() {
    this.list = null;
  }

  render() {
    var title = this.state.title;
    return (
      <section className='section'>
        <div className='title'>{title}</div>
        <ItemList
          ref='list'
          data={this.state.list}
        />
      </section>
    );
  }
}
