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
        <li><Link>Browse</Link></li>
      </ul>

      <h3>Your subscriptions</h3>
      <ul>
        <li><Link>Lostcast</Link></li>
        <li><Link>Grok Podcast</Link></li>
        <li><Link>Jogabilidade</Link></li>
      </ul>

    </aside>
  }

}

