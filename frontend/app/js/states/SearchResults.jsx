import React from 'react';
import { findDOMNode } from 'react-dom'

import main from '../main';
import PaginatedItemList from '../components/PaginatedItemList.jsx';
import SubscribeButton from '../components/SubscribeButton.jsx'
import app from '../app';

export default class SearchResults extends React.Component {

  constructor() {
    super();

    this.state = this.initialState

    // this.onLoadCompleteCallback = this.onLoadComplete.bind( this )
  }

  get initialState () {
    return { title: "Searching..." }
  }

  componentDidMount() {
    app.resetScroll()
  }

  componentWillReceiveProps ( props ) {
    this.setState( this.initialState )
  }

  render() {
    return (this.state.loading) ? (
      <section className='section loading'></section>
    ) : (
      <section className='section'>
        <h1>{`Search results for "${ this.props.location.query.q }":`}</h1>

        <PaginatedItemList
          service="episodes"
          showTitle={ true }
          search={ this.props.location.query.q }
          />

      </section>
    );
  }
}
