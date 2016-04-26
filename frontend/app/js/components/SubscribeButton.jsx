import React from 'react';

import classNames from 'classnames'
import Session from '../tools/Session'

export default class SubscribeButton extends React.Component {

  handleClick(e) {
    var feed = this.props.feed
      , following = Session.isFollowing(feed)

    if (following) {
      Session.unfollow(feed)
    } else {
      Session.follow(feed)
    }

    this.setState({ following: !following })
  }

  render() {
    var result = null

    if (this.props.feed._id) {
      var isFollowing = Session.isFollowing(this.props.feed)

      result = <button onClick={this.handleClick.bind(this)}
                       className={classNames({
                         'btn': true,
                         'follow-btn': true,
                         'is-following': isFollowing
                       })}></button>
    }

    return result
  }
}

