import React from 'react'
import { Link } from 'react-router'

import Session from '../tools/Session'

export default class Sidebar extends React.Component {

  constructor () {
    super()
    window.Session = Session
    this.state = { following: Session.data.following }
  }

  componentDidMount() {
    Session.onChange((data) => {
      this.setState({ following: data.following })
    })
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
        {this.state.following.map((feed) => {
          return <li key={feed._id}><Link to={`/feed/${ feed._id }`} activeClassName="active">{ feed.title }</Link></li>
        })}
      </ul>

    </aside>
  }

}
