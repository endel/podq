import Browse from './Browse.jsx'

export default class UserSubscriptions extends Browse {

  get defaultState() {
    return {
      title: 'Your subscriptions',
      list: [],
      description: ""
    };
  }

}

