import React from 'react';
import ItemList from '../components/ItemList.jsx';

export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = {list:[]};

    fetch('/mockdata/list.json')
      .then((response) => {
        return response.text();
      }).then((json) => {
        var data = JSON.parse(json);
        this.setState(data);
      });
  }

  render() {
    return (
      <section>
        <ItemList
          data={this.state.list}
        />
      </section>
    );
  }
}
