import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

export default class SearchBar extends React.Component {

  constructor () {

    super();
    this.state = {
      term: '',
      phase: 'IDLE',
      entriesResult: null,
      feedsResult: null
    };

  }


  handleSubmit (evt) {

    var self = this;

    evt.preventDefault();

    self.setState({
      phase: 'SEARCHING',
      entriesResult: null,
      feedsResult: null
    });

    fetch('http://webstdio.r15.railsrumble.com/entries?limit=5&search=' + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        self.setState({
          phase: 'READY',
          entriesResult: res
        });

      });

    fetch('http://webstdio.r15.railsrumble.com/feeds?limit=5&search=' + encodeURIComponent(this.state.term))
      .then((res) => {
        return res.json();
      }).then((res) => {

        self.setState({
          phase: 'READY',
          feedsResult: res
        });

      });

  }

  handleChange (evt) {

    this.setState({
      term: evt.target.value,
      phase: 'IDLE'
    });

  }

  render () {

    var resultsClass = classNames({
      'main-search-results': true,
      'opened': this.state.phase !== 'IDLE'
    });

    return <form onSubmit={this.handleSubmit.bind(this)} className="main-search">

      <input type="search" placeholder="Search" onChange={this.handleChange.bind(this)} value={this.state.term} />

      <div className={resultsClass}>

        <div className="result-section feed-results clearfix">

          <h3>ENTRIES RESULTS</h3>

          {this.state.entriesResult === null ? <span className="result-status">Searching...</span> : null}
          {this.state.entriesResult && !this.state.entriesResult.length ? <span className="result-status">No entries found with <strong>{this.state.term}</strong> term...</span> : null}

          <ul>
            {this.state.entriesResult && this.state.entriesResult.map(entry => {

                return <li className="result-item">

                        <div className="result-picture">
                          <img src={entry.image} />
                        </div>

                        <div className="result-info">
                          <h4>{entry.title}</h4>
                          <span>{entry.description}</span>
                        </div>

                      </li>;

              })
            }
          </ul>

        </div>

        <div className="result-section feed-results clearfix">

          <h3>FEED RESULTS</h3>

          {this.state.feedsResult === null ? <span className="result-status">Searching...</span> : null}
          {this.state.feedsResult && !this.state.feedsResult.length ? <span className="result-status">No feed found with <strong>{this.state.term}</strong> term...</span> : null}

          <ul>
            {this.state.feedsResult && this.state.feedsResult.map(entry => {

                return <li className="result-item">

                        <div className="result-picture">
                          <img src={entry.image} />
                        </div>

                        <div className="result-info">
                          <h4>{entry.title}</h4>
                          <span>{entry.description}</span>
                        </div>

                      </li>;

              })
            }
          </ul>

        </div>

      </div>

    </form>
  }

}



