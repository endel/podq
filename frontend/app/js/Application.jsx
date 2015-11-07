import React from 'react'
import Header from './Header.jsx'

export default class Application extends React.Component {

  constructor () {
    super();
    this.state = {}
  }

  componentDidMount() {
  }

  render () {
    return <div>
      <Header />
      Application
    </div>
  }

}

