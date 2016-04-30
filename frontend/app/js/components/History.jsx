import React from 'react';

import app from '../app'

export default class History extends React.Component {

  constructor() {

    super();

  }

  componentDidMount () {

    app.history.listen( location => {
    })

  }

  navigate ( direction ) {

    let method = `go${ direction.charAt(0).toUpperCase() }${ direction.slice(1) }`

    app.history[ method ]()

  }

  render() {
    var date = tools.simpleDate(this.props.data.published);
    var img = this.props.data.image || this.props.info.image;

    return (
      <div className='history'>
        <a href="#" onClick={ this.navigate.bind(this, 'back') }>Back</a>
        <a href="#" onClick={ this.navigate.bind(this, 'forward') }>Forward</a>
      </div>
    );
  }
}

