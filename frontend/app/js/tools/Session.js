class Session {

  getData () {
    return JSON.parse(localStorage.getItem('session'))
  }

  setData (data) {
    localStorage.setItem('session', JSON.stringify(data))
  }

  destroy () {
    localStorage.removeItem('session')
  }

}

export default new Session()
