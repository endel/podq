class Session {

  constructor () {

    this.onChangeCallback = null

    this.data = JSON.parse(localStorage.getItem('session')) || {
      name: null,
      following: []
    };

    if ( !this.data.following ) { this.data.following = [] }
    if ( !this.data.name ) { this.data.name = "" }

  }

  onChange (fn) {

    this.onChangeCallback = fn

  }

  isLogged () {

    return this.data.name !== "";

  }

  login (jsonString) {

    var userData = JSON.parse(jsonString)
    for (var attr in userData) {
      this.data[ attr ] = userData[attr]
    }
    localStorage.setItem('session', JSON.stringify(this.data))

  }

  isFollowing ( feed_to_check ) {

    return this.data.following.filter( (feed) => {
      return feed._id == feed_to_check._id
    } ).length > 0

  }

  follow ( feed_to_follow ) {

    this.data.following.push({
      _id: feed_to_follow._id,
      title: feed_to_follow.title
    })

    this.sync()

  }

  unfollow ( feed_to_unfollow ) {

    this.data.following = this.data.following.filter((feed) => {
      return feed._id !== feed_to_unfollow._id
    })

    this.sync()

  }

  sync () {

    // persist data on backend
    this.syncLocal()

  }

  syncLocal () {

    localStorage.setItem('session', JSON.stringify(this.data))

    if (this.onChangeCallback) {
      this.onChangeCallback(this.data)
    }

  }

  destroy () {

    // logout
    localStorage.removeItem('session')

  }

}

export default new Session()
