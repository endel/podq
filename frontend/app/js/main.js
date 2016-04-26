import React from 'react'
import { render } from 'react-dom'

import { IndexRoute, Router, Route, Link, Redirect, browserHistory } from 'react-router'

import Application from './layout/Application.jsx'
import Index from './states/Index.jsx'
import Browse from './states/Browse.jsx'
import Feed from './states/Feed.jsx'
import Entry from './states/Entry.jsx'
import SearchResults from './states/SearchResults.jsx'
import UserSubscriptions from './states/UserSubscriptions.jsx'

import app from './app';
import { timeFractionRegex } from './tools/tools';
require('whatwg-fetch')

window.BACKEND_ENDPOINT = (process.env.NODE_ENV !== 'production')
  ? `${ location.protocol }//${ location.hostname }:5000`
  : 'http://webstdio.r15.railsrumble.com/'

app.container = document.querySelector('main')
app.history = browserHistory

//
// analytics / page view tracker
//
import ga from 'react-ga'
ga.initialize(((process.env.RAILS_ENV) ? 'UA-67917511-3' : 'UA-XXXXXXXX-X'))

let lastPathName = "", lastQueryString = ""

app.history.listen(location => {

  if ( location.hash.length > 1 ) {
    let timeFraction = location.hash.match(timeFractionRegex)

    if ( timeFraction.length == 1 ) {
      // set player at that time fraction
      app.player
    }

    // goto some location
    return false
  }

  if (lastPathName !== location.pathname || lastQueryString !== location.query) {
    ga.pageview(location.pathname)
  }

  lastPathName = location.pathname
  lastQueryString = location.query
})

render((
  <Router history={app.history}>
    <Route path="/" component={Application}>
      <IndexRoute component={Browse} />
      <Route path="browse" component={Browse} />
      <Route path="subscriptions" component={UserSubscriptions} />

      <Route path="feed/:id" component={Feed} />
      <Route path="entry/:id" component={Entry} />

      <Route path="search" component={SearchResults} />

      {/*<Route path="lobby" component={Lobby} />*/}
      {/*<Route path="watch" component={Watch} />*/}

      {/*<Route path="room/create" component={CreateRoom} />*/}
      {/*<Route path="room/:roomId" component={Room} />*/}

      {/*<Route path="about" component={About} />*/}
      {/*<Route path="privacy" component={Privacy} />*/}
      {/*<Route path="terms" component={Terms} />*/}
    </Route>
  </Router>
), app.container)
