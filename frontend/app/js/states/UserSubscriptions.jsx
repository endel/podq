import React from 'react'
import Session from '../tools/Session'

import PaginatedItemList from '../components/PaginatedItemList.jsx'

import app from '../app.js'

export default class UserSubscriptions extends React.Component {

  constructor() {
    super();

    this.state = {
      title: 'Your Subscriptions',
      description: "",
      podcastIds: Session.data.following.map( podcast => podcast._id )
    };

  }

  componentDidMount() {
    app.resetScroll()
  }

  render() {

    var queryString = this.state.podcastIds.map( _id => `_ids[]=${ _id }` )

    return (
      <section className='section'>

        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        { this.state.podcastIds.length > 0
          ? <PaginatedItemList service={`podcasts?${ queryString.join('&') }`} />
          : <p>You're not following any podcast.</p> }

      </section>
    );
  }

}
