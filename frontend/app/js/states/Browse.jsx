import React from 'react';
import { findDOMNode } from 'react-dom';

import app from '../app';

import PaginatedItemList from '../components/PaginatedItemList.jsx';

export default class Browse extends React.Component {

  constructor() {
    super();

    this.state = {
      title: 'Browse',
      description: "Discover free podcasts around the world."
    };

  }

  componentDidMount() {
    app.resetScroll()
  }

  render() {
    return (
      <section className='section'>

        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        <PaginatedItemList
          service="podcasts"
          />

      </section>
    );
  }

}
