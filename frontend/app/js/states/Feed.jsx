import React from 'react';
import { findDOMNode } from 'react-dom'

import { Link } from 'react-router';

import ItemList from '../components/ItemList.jsx';
import SubscribeButton from '../components/SubscribeButton.jsx';
import ReportButton from '../components/ReportButton.jsx';
import PaginatedItemList from '../components/PaginatedItemList.jsx';

import app from '../app';

export default class Feed extends React.Component {

  constructor() {

    super();

    this.state = {
      feed: null,
      entries: [],
      loading: true
    };

  }

  onLoadComplete ( data ) {

    this.setState({ feed: data.feed })

  }

  componentDidMount() {
    app.resetScroll()
  }

  render() {

    return (
      <section className='section'>

        { this.state.feed ? (<div>

          <h1>
            { this.state.feed.title }
            <SubscribeButton feed={ this.state.feed } />
          </h1>

          { this.state.feed.description
            ? <p>{ this.state.feed.description }</p>
            : null}

          <p className="permalink">
            { this.state.feed.permalink
              ? <a href={this.state.feed.permalink} target="_blank">{this.state.feed.permalink}</a>
              : null }
            <Link className="rss" to={ this.state.feed.url } target="_blank"><img src="/images/rss.png" alt="RSS Feed" /></Link>
          </p>

        </div>) : null }

        <PaginatedItemList
          service={ `podcasts/${ this.props.params.id }/episodes` }
          onLoadComplete={ this.onLoadComplete.bind(this) }
          />

      </section>
    );

  }
}
