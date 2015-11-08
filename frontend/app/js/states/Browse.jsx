import React from 'react';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
    this.type = 'feed';
    this.load('/mockdata/feed-list.json');
    Notifier.get('main').on('item-selected', this.onItemSelect.bind(this));
  }

  load(url) {
    this.clean();
    fetch(url)
      .then((response) => {
        return response.text();
      }).then((json) => {
        var data = JSON.parse(json);
        this.setState({list:data.list});
      });
  }

  clean() {
    this.setState({list:[]});
  }

  get defaultState() {
    return {title:'Browse', list:[]};
  }

  onItemSelect(data) {
    if (this.type === 'feed') {
      this.type = 'entry';
      this.load('/mockdata/entry-list.json');
      this.setState({title:data.name});
    } else if (this.type === 'entry') {
      Notifier.get('main').emit('play', data);
    }
  }

  componentDidMount() {
    this.list = React.findDOMNode(this.refs.list);
  }

  render() {
    return (
      <section className='browse'>
        <div className='title'>{this.state.title}</div>
        <ItemList
          ref='list'
          data={this.state.list}
        />
      </section>
    );
  }
}
