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
      loading: true,
      isLastPage: false,
      lastSearch: ""
    }

    this.onScrollCallback = debounce( this.gotoNextPage, 100 ).bind(this)

  }

  gotoNextPage ( ) {

    this.query( this.props.service, this.state.offset + this.state.limit, this.props.search || "" )

  }

  componentDidMount () {

    this.paginationNotifier = Notifier.get('pagination')

    this.paginationNotifier.on( 'next', this.onScrollCallback, this )

    this.query( this.props.service, this.props.offset || 0, this.props.search || "" )

  }

  componentWillUnmount () {

    this.paginationNotifier.clean( this )

  }

  componentWillReceiveProps ( props ) {

    this.query(
      props.service,
      props.offset || 0,
      props.search || "",
      props.service !== this.props.service
    )

  }

  query ( service, offset = 0, search = "", reset = false ) {

    let segments = `${ service }${ ( service.indexOf('?') >= 0 ) ? "&" : "?" }offset=${ offset }&limit=${ this.state.limit }&search=${ search }`

    let isLastPage = false

    if ( this.state.total_count !== null && offset >= this.state.total_count ) {

      isLastPage = true
      this.setState({ isLastPage: isLastPage })

    }

    if ( this.state.lastSearch !== search || reset ) {

      this.setState({ entries: [] })

    } else {

      if (
        this.state.lastQuery === segments || // don't repeat the same query
        offset <= this.state.offset       || // don't use a lower offset than previously used
        isLastPage
      ) {
        console.log("skip, offset:", offset)
        return;
      }

    }

    console.log("query, offset:", offset, "segments:", segments)

    this.setState({
      lastSearch: search,
      lastQuery: segments,
      // loading: true
    });

    this.client.fetch( segments ).then( data => {

      // call parent onLoadComplete callback
      if ( this.props.onLoadComplete ) {
        this.props.onLoadComplete ( data )
      }

      let entries = ( typeof(data.entries) === "object" ) ? data.entries : data

      this.setState({
        offset: offset,
        entries: this.state.entries.concat( entries ),
        total_count: data.total_count || entries.length,
        loading: false
      });

    });

  }

  render() {

    return (
      <div className={ this.state.loading ? 'loading' : '' }>

        { !this.state.loading
          ? <p className="pagination-overview">Showing { this.state.entries.length } of { this.state.total_count } results.</p>
          : null }

        <ItemList
          showTitle={ this.props.showTitle || false }
          entries={ this.state.entries }
          />

        { this.state.loading
          ? <div className="loading-bar"></div>
          : null }

        { this.state.isLastPage
          ? <div className="last-page-notice">That's all!</div>
          : null }

      </div>
    );

  }

}
