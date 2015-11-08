import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import SearchBarResult from './SearchBarResult.jsx'
import Throttling from '../helpers/Throttling.js'

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

    this.debouncedSearch = Throttling.debounce(this.search, 300).bind(this);
  }

  handleSubmit (evt) {

    evt.preventDefault();

    this.search();

  }

  closeResults () {

    this.setState({
      lastSearchedTerm: '',
      phase: 'IDLE'
    });

  }

  search () {

    var self = this,
        localTerm = self.state.term;

    if (!self.state.term) {

      self.closeResults();

      return;

    }

    if (self.state.lastSearchedTerm === self.state.term) {
      return;
    }

    self.setState({
      phase: 'SEARCHING',
      lastSearchedTerm: self.state.term,
      entriesResult: null,
      feedsResult: null
    });

    fetch('http://webstdio.r15.railsrumble.com/entries?limit=5&search=' + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        if (localTerm !== self.state.lastSearchedTerm) {
          // Prevent older responses to be parsed after the newers ones
          return false;
        }

        self.setState({
          phase: 'READY',
          entriesResult: res.entries
        });

      });

    fetch('http://webstdio.r15.railsrumble.com/feeds?limit=5&search=' + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        if (localTerm !== self.state.lastSearchedTerm) {
          // Prevent older responses to be parsed after the newers ones
          return false;
        }

        self.setState({
          phase: 'READY',
          feedsResult: res
        });

      });

  }

  handleChange (evt) {

    this.setState({
      term: evt.target.value
    });

    this.debouncedSearch();

  }

  render () {

    var handleChange= this.handleChange.bind(this),
        resultsClass = classNames({
          'main-search-results': true,
          'opened': this.state.phase !== 'IDLE'
        });

    return <form onSubmit={this.handleSubmit.bind(this)} className="main-search">

      <input type="search" placeholder="Search" onFocus={handleChange} onChange={handleChange} value={this.state.term} />

      <div className={resultsClass}>

        {this.state.phase === 'READY' && ((this.state.entriesResult && this.state.entriesResult.length) || (this.state.feedsResult && this.state.feedsResult.length)) ?
          <Link to="/search" query={{ q: this.state.term }} className="result-section result-item result-see-all">
            Show All Results...
          </Link>
        : null}

        <div className="result-section feed-results clearfix">

          <h3>ENTRIES RESULTS</h3>

          {this.state.entriesResult === null ? <span className="result-status">Searching...</span> : null}
          {this.state.entriesResult && !this.state.entriesResult.length ? <span className="result-status">No entries found with <strong>{this.state.lastSearchedTerm}</strong> term...</span> : null}

          <ul>
            {this.state.entriesResult && this.state.entriesResult.map(entry => {

                return <SearchBarResult onClick={this.closeResults.bind(this)} type="entry" data={entry} />;

              })
            }
          </ul>

        </div>

        <div className="result-section feed-results clearfix">

          <h3>FEED RESULTS</h3>

          {this.state.feedsResult === null ? <span className="result-status">Searching...</span> : null}
          {this.state.feedsResult && !this.state.feedsResult.length ? <span className="result-status">No feed found with <strong>{this.state.lastSearchedTerm}</strong> term...</span> : null}

          <ul>
            {this.state.feedsResult && this.state.feedsResult.map(entry => {

                return <SearchBarResult onClick={this.closeResults.bind(this)} type="feed" data={entry} />;

              })
            }
          </ul>

        </div>

      </div>

    </form>
  }

}



