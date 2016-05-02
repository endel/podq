import React from 'react'
import { render } from 'react-dom'

import { IndexRoute, Router, Route, Link, Redirect } from 'react-router'

import Application from './layout/Application.jsx'
import Browse from './states/Browse.jsx'
import Feed from './states/Feed.jsx'
import Entry from './states/Entry.jsx'
import SearchResults from './states/SearchResults.jsx'
import UserSubscriptions from './states/UserSubscriptions.jsx'

import app from './app';

require('../css/main.styl')
require('../images/logo.png')

app.container = document.querySelector('main')

render((
  <Router history={ app.history }>
    <Route path="/" component={Application}>
      <IndexRoute component={Browse} />

      <Route path="browse" component={Browse} />
      <Route path="subscriptions" component={UserSubscriptions} />

      <Route path="podcasts/:id" component={Feed} />
      <Route path="episodes/:id" component={Entry} />

      <Route path="search" component={SearchResults} />

    </Route>
  </Router>
), app.container)
