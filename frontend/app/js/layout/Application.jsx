import React from 'react'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import AudioPlayer from '../components/AudioPlayer.jsx'

import app from '../app';

export default class Application extends React.Component {

  componentDidMount () {
    app.stateContainer = React.findDOMNode(this.refs.stateContainer)
  }

  render () {
    return (
      <div>
        <Header />
        <AudioPlayer />
        <div className="app-container">
          <Sidebar />
          <main ref="stateContainer" className="state-container">
            <div className="vertical-scroll">
              {this.props.children}
            </div>
          </main>
        </div>

      </div>
    )
  }

}

