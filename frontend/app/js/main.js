import React from 'react'
import { IndexRoute, Router, Route, Link, Redirect } from 'react-router'

// Route components
import Application from './Application.jsx'
import Index from './Index.jsx'

import { createHistory } from 'history'

var container = document.getElementsByTagName('body')[0]
  , appHistory = createHistory()

React.render((
  <Router history={appHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Index} />

      {/*<Route path="lobby" component={Lobby} />*/}
      {/*<Route path="watch" component={Watch} />*/}

      {/*<Route path="room/create" component={CreateRoom} />*/}
      {/*<Route path="room/:roomId" component={Room} />*/}

      {/*<Route path="about" component={About} />*/}
      {/*<Route path="privacy" component={Privacy} />*/}
      {/*<Route path="terms" component={Terms} />*/}
    </Route>
  </Router>
), container)
