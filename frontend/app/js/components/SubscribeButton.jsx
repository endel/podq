import React from 'react';

import classNames from 'classnames'
import Session from '../tools/Session'

export default class SubscribeButton extends React.Component {

  handleClick(e) {
    var feed_id = this.props.feed_id
      , following = Session.isFollowing(feed_id)

    if (following) {
      Session.unfollow(feed_id)
    } else {
      Session.follow(feed_id)
    }

    this.setState({ following: !following })
  }

  render() {
    var result = null

    if (this.props.feed_id) {
      var isFollowing = Session.isFollowing(this.props.feed_id)

      result = <button onClick={this.handleClick.bind(this)}
                       className={classNames({
                         'follow-btn': true,
                         'is-following': isFollowing
                       })}></button>
    }

    return result
  }
}

