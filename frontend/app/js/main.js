import React from 'react'
import { IndexRoute, Router, Route, Link, Redirect } from 'react-router'
import { createHistory } from 'history'

import Application from './layout/Application.jsx'
import Index from './states/Index.jsx'
import Browse from './states/Browse.jsx'
import Feed from './states/Feed.jsx'
import Entry from './states/Entry.jsx'
import SearchResults from './states/SearchResults.jsx'
import UserSubscriptions from './states/UserSubscriptions.jsx'

import app from './app';
require('whatwg-fetch')

window.BACKEND_ENDPOINT = (process.env.RAILS_ENV)
  ? `http://${ location.hostname }`
  : 'http://192.168.0.2:5000'

app.container = document.getElementsByTagName('body')[0]
app.history = createHistory()

//
// analytics / page view tracker
//
import ga from 'react-ga'
ga.initialize(((process.env.RAILS_ENV) ? 'UA-67917511-3' : 'UA-XXXXXXXX-X'))

var lastPathName = ""
app.history.listen(location => {
  if (lastPathName !== location.pathname) {
    ga.pageview(location.pathname)
  }
  lastPathName = location.pathname
})

React.render((
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
