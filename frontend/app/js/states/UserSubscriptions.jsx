import Browse from './Browse.jsx'
import Session from '../tools/Session'

export default class UserSubscriptions extends Browse {

  load(service) {
    this.clean();

    var feed_ids = Session.data.following.map((feed) => {
      return `_ids[]=${ feed._id }`
    })

    this.client.fetch(`feeds?${ feed_ids.join('&') }`).then( (data) => {
      this.setState({ list: data });
    })
  }

  get defaultState() {
    return {
      title: 'Your subscriptions',
      list: [],
      description: ""
    };
  }

}
