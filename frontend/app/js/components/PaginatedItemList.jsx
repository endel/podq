import React from 'react';

import ItemList from './ItemList.jsx';
import Client from '../tools/Client';
import Notifier from '../tools/Notifier.js'

import debounce from 'debounce'

export default class PaginatedItemList extends React.Component {

  constructor() {

    super();

    this.client = new Client()

    this.state = {
      offset: -1,
      limit: 20,
      entries: [],
      loading: true
    }

  }

  gotoNextPage ( ) {

    this.query( this.state.offset + this.state.limit, this.props.search || "" )

  }

  componentDidMount () {

    this.paginationNotifier = Notifier.get('pagination')

    this.paginationNotifier.on( 'next', debounce( this.gotoNextPage, 100 ).bind(this) )

    this.query( this.props.offset || 0, this.props.search || "" )

  }

  componentWillUnmount () {

    this.paginationNotifier.off('next')

  }

  componentWillReceiveProps ( props ) {

    this.query( props.offset || 0, props.search || "" )

  }

  query ( offset = 0, search = "" ) {

    let segments = `${ this.props.service }?offset=${ offset }&limit=${ this.state.limit }&search=${ search }`

    if (
      this.state.lastQuery === segments || // don't repeat the same query
      offset <= this.state.offset       || // don't use a lower offset than previously used
      ( this.state.total_count !== null && offset >= this.state.total_count )
    ) {
      console.log("skip. offset:", offset)
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
        entries: entries.concat( this.state.entries ),
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
