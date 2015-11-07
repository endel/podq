import React from 'react'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import AudioPlayer from '../components/AudioPlayer.jsx'

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
      <Sidebar />
      <main>
        {this.props.children}
      </main>
      <AudioPlayer />
    </div>
  }

}

