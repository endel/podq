import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import classNames from 'classnames'
import SearchBarResult from './SearchBarResult.jsx'
import debounce from 'debounce'

import Keycode from 'keycode.js'

import app from '../app.js'

export default class SearchBar extends React.Component {

  constructor () {

    super();
    this.state = {
      term: '',
      lastSearchedTerm: '',
      phase: 'IDLE',
      entriesResult: null,
      feedsResult: null
    };

    this.debouncedSearch = debounce( this.search, 300 ).bind( this )

  }

  onKeyPress (e) {

    // ENTER pressed
    if ( e.which === Keycode.ENTER ) {

      e.preventDefault()
      this.closeResults ( this.state.term )
      app.history.push('/search?q=' + this.state.term);

    }

  }

  handleSubmit (e) {

    e.preventDefault();

    this.search();

  }

  closeResults ( lastSearchedTerm = '' ) {

    this.setState({
      lastSearchedTerm: lastSearchedTerm,
      entriesResult: null,
      feedsResult: null,
      phase: 'IDLE'
    });

  }

  search () {

    var localTerm = this.state.term;

    if (!this.state.term) {

      this.closeResults();

      return;

    }

    if (this.state.lastSearchedTerm === this.state.term && this.state.phase === "READY") {
      return;
    }

    this.setState({
      phase: 'SEARCHING',
      lastSearchedTerm: this.state.term,
      entriesResult: null,
      feedsResult: null
    });

    fetch(`${ BACKEND_ENDPOINT }/episodes?limit=5&search=` + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        if (localTerm !== this.state.lastSearchedTerm) {
          // Prevent older responses to be parsed after the newers ones
          return false;
        }

        if ( this.state.phase !== "IDLE" ){

          this.setState({
            phase: 'READY',
            entriesResult: res.entries
          });

        }

      });

    fetch(`${ BACKEND_ENDPOINT }/podcasts?limit=5&search=` + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        if (localTerm !== this.state.lastSearchedTerm) {
          // Prevent older responses to be parsed after the newers ones
          return false;
        }

        if ( this.state.phase !== "IDLE" ){

          this.setState({
            phase: 'READY',
            feedsResult: res.entries
          });

        }

      });

  }

  handleChange (e) {

    this.setState({
      term: e.target.value
    });

    this.debouncedSearch();

  }

  render () {

    return <form onSubmit={this.handleSubmit.bind(this)} className="main-search">

      <input
        type="search"
        placeholder="Search"
        onKeyPress={this.onKeyPress.bind(this)}
        onFocus={this.handleChange.bind(this)}
        onChange={this.handleChange.bind(this)}
        value={this.state.term} />

      <div className={classNames({
          'main-search-results': true,
          'opened': this.state.phase !== 'IDLE'
        })}>

        { this.state.phase === 'READY' && ((this.state.entriesResult && this.state.entriesResult.length) || (this.state.feedsResult && this.state.feedsResult.length)) ?
          <Link ref="allResultsLink" to="/search" query={{ q: this.state.term }} onClick={this.closeResults.bind(this)} className="result-section result-item result-see-all">
            Show All Results...
          </Link>
        : null }

        <div className="result-section feed-results clearfix">

          <h3>EPISODES</h3>

          {this.state.entriesResult === null
            ? <span className="result-status">Searching...</span>
            : null}

          { this.state.entriesResult && !this.state.entriesResult.length
            ? <span className="result-status">No episodes found for "<strong>{ this.state.lastSearchedTerm }</strong>"...</span>
            : null }

          <ul>
            {this.state.entriesResult && this.state.entriesResult.map(entry => {

                return <SearchBarResult onClick={this.closeResults.bind(this)} type="entry" data={entry} key={entry._id} />;

              })
            }
          </ul>

        </div>

        <div className="result-section feed-results clearfix">

          <h3>PODCASTS</h3>

          { this.state.feedsResult === null
            ? <span className="result-status">Searching...</span>
            : null }

          { this.state.feedsResult && !this.state.feedsResult.length
            ? <span className="result-status">No podcasts found for "<strong>{ this.state.lastSearchedTerm }</strong>"...</span>
            : null }

          <ul>
            {this.state.feedsResult && this.state.feedsResult.map(entry => {

                return <SearchBarResult onClick={this.closeResults.bind(this)} type="feed" data={entry} key={entry._id}/>;

              })
            }
          </ul>

        </div>

      </div>

    </form>
  }

}
