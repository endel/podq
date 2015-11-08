import React from 'react'
import { IndexRoute, Router, Route, Link, Redirect } from 'react-router'
import { createHistory } from 'history'

import Application from './layout/Application.jsx'
import Index from './states/Index.jsx'
import Browse from './states/Browse.jsx'
import Feed from './states/Feed.jsx'
import Entry from './states/Entry.jsx'
import SearchResults from './states/SearchResults.jsx'
import app from './app';

window.BACKEND_ENDPOINT = (process.env.RAILS_ENV)
  ? `${ location.protocol }//${ location.hostname }`
  : 'http://192.168.0.2:9000'

app.container = document.getElementsByTagName('body')[0]
app.history = createHistory()

app.history.listen(function (location) {
    console.log('[nav]', location.pathname);
});

React.render((
  <Router history={app.history}>
    <Route path="/" component={Application}>
      <IndexRoute component={Browse} />
      <Route path="feed/:id" component={Feed} />
      <Route path="entry/:id" component={Entry} />

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
