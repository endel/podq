import React from 'react';

import ItemList from './ItemList.jsx';
import Client from '../tools/Client';

import debounce from 'debounce'

export default class PaginatedItemList extends React.Component {

  constructor() {
    super();

    this.client = new Client()

    this.state = {
      offset: 0,
      limit: 20,
      entries: [],
      loading: true
    }

  }

  componentDidMount () {

    this.query( this.props.offset || 0, this.props.search || "" )

  }

  componentWillReceiveProps ( props ) {

    this.query( props.offset || 0, props.search || "" )

  }

  query ( offset = 0, search = "" ) {

    let segments = `${ this.props.service }?offset=${ offset }&limit=${ this.state.limit }&search=${ search }`

    // don't repeat the same query
    if ( this.state.lastQuery === segments ) {
      return;
    }

    this.setState({
      lastQuery: segments,
      entries: []
    });

    this.client.fetch( segments ).then( data => {

      // call parent onLoadComplete callback
      if ( this.props.onLoadComplete ) {
        this.props.onLoadComplete ( data )
      }

      let entries = ( typeof(data.entries) === "object" ) ? data.entries : data

      this.setState({
        offset: offset,
        entries: entries,
        total_count: data.total_count || entries.length,
        loading: false
      });

    });

  }

  render() {

    return (
      <div className={ this.state.loading ? 'loading' : '' }>

        { !this.state.loading
          ? <p className="pagination-overview">Showing { Math.min( (this.state.offset + 1) * this.state.limit, this.state.total_count ) } of { this.state.total_count } results.</p>
          : null }

        <ItemList
          showTitle={ this.props.showTitle || false }
          entries={ this.state.entries }
          />

        { this.state.loading
          ? <div className="loading-bar"></div>
          : null }

      </div>
    );

  }

}
