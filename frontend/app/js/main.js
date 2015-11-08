import React from 'react'
import { IndexRoute, Router, Route, Link, Redirect } from 'react-router'

// Route components
import Application from './layout/Application.jsx'
import Index from './states/Index.jsx'
import Browse from './states/Browse.jsx'

import { createHistory } from 'history'

window.BACKEND_ENDPOINT = (process.env.RAILS_ENV)
  ? `${ location.protocol }//${ location.hostname }`
  : 'http://192.168.0.2:9000'

var container = document.getElementsByTagName('body')[0]
  , appHistory = createHistory()

React.render((
  <Router history={appHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Browse} />

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
