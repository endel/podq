import React from 'react';
import { Link } from 'react-router'

import ReactDisqusThread from 'react-disqus-thread'

import Client from '../tools/Client'
import { simpleDate, timeFractionRegex } from '../tools/tools'

import app from '../app'
import PlaybackBtn from '../components/PlaybackBtn.jsx'

export default class Entry extends React.Component {

  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState ( ) {
    return {
      feed: {},
      entry: {},
      loading: true
    };
  }

  load ( service ) {

    this.client.fetch(service).then( data => {
      data.loading = false
      this.setState(data);
    });

  }

  handleNewComment ( e ) {
  }

  componentDidMount() {

    app.resetScroll()

    if ( !app.entry || !app.feed ) {

      this.load(`episodes/${this.props.params.id}`);

    } else {

      this.setState({
        feed: app.feed,
        entry: app.entry,
        loading: false
      });

    }

  }

  componentWillReceiveProps( props ) {

    this.setState(this.initialState);

    this.load(`episodes/${ props.params.id }`);

  }

  parseDescription ( description =  this.state.description || "" ) {

    description = description.

      // remove audio tags
      replace(/<[\/]{0,1}(audio)[^><]*>/gi, "").

      // add target=_blank to all links
      replace(/<a href=/gi, '<a target="_blank" href=').

      // add links to time fractions based on regexp
      replace(timeFractionRegex, '<a href="#$1">$1</a>')

    return description

  }

  render() {
    let hasAudio = this.state.audio_url !== undefined;

    let playButton = <div className='play-button'>
                        <PlaybackBtn data={this.state}/>
                     </div>;

    let entryImage = (this.state.image)
      ? <img src={this.state.image} alt={this.state.title}/>
      : null

    return (this.state.loading || !this.state.feed) ? (

      <section className='section loading'></section>

    ) : (

      <section className='section'>

        { this.state.feed
          ? (
            <h1>

              <Link to={`/podcasts/${ this.state.feed._id }`}>
                { this.state.feed.title }
              </Link> &raquo; { this.state.title }

              { hasAudio ? playButton : null }

            </h1>
            )
          : null }

        <p>Published on <Link target="_blank" to={ this.state.permalink }>{ simpleDate(this.state.published) }</Link></p>

        <div
          className="thirdparty-content"
          dangerouslySetInnerHTML={{ __html: this.parseDescription() }}
          />

        {/* <p>{ entryImage }</p> */}
        <h2>Comments</h2>
        <ReactDisqusThread
          shortname="podcastplayer"
          identifier="comments"
          title={ this.state.title }
          url={ this.state.permalink }
          onNewComment={this.handleNewComment}/>

      </section>

    );
  }
}
