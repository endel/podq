class Session {

  constructor () {
    this.data = JSON.parse(localStorage.getItem('session')) || {
      name: null,
      following: []
    };
  }

  isLogged () {
    return this.data.name !== null;
  }

  login (jsonString) {
    this.data = JSON.parse(jsonString)
    localStorage.setItem('session', this.data)
  }

  isFollowing (feed_id) {
    return (this.data && this.data.following && this.data.following.indexOf(feed_id) >= 0)
  }

  follow (feed_id) {
    this.data.following.push(feed_id)
    this.sync()
  }

  unfollow (feed_id) {
    this.data.following.splice(this.data.following.indexOf(feed_id), 1)
    this.sync()
  }

  sync () {
    // persist data on backend
    this.syncLocal()
  }

  syncLocal () {
    localStorage.setItem('session', JSON.stringify(this.data))
  }

  destroy () {
    // logout
    localStorage.removeItem('session')
  }

}

export default new Session()
