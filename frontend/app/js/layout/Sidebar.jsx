import React from 'react'
import { Link } from 'react-router'

import Session from '../tools/Session'

export default class Sidebar extends React.Component {

  constructor () {
    super()
    this.state = {
      subscriptions: []
    }
  }

  render () {
    return <aside className="main-sidebar">
      <h3>Main</h3>
      <ul>
        <li><Link to="/browse" activeClassName="active">Browse</Link></li>
      </ul>

      <h3>Your subscriptions</h3>
      <ul>
        <li><Link to="/subscriptions" activeClassName="active">All</Link></li>
        <li><Link to="/feed/563e6f0f9754e30003000000" activeClassName="active">Lostcast <span className="unread">8</span></Link></li>
        <li><Link to="/feed/563e6f239754e30003000094" activeClassName="active">Grok Podcast <span className="unread">4</span></Link></li>
        <li><Link to="/feed/563e6fe9f2f3880003000094" activeClassName="active">The Changelog <span className="unread">3</span></Link></li>
      </ul>

    </aside>
  }

}

