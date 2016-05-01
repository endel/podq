import React from 'react'
import { findDOMNode } from 'react-dom'

import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import AudioPlayer from '../components/AudioPlayer.jsx'

import app from '../app';
import throttle from 'throttle.js'

import Notifier from '../tools/Notifier.js'

const SCROLL_THRESHOLD = 150

export default class Application extends React.Component {

  constructor () {

    super()

    this.paginationNotifier = Notifier.get('pagination')

    this.state = { isScrolling: false }

  }

  componentDidMount () {

    this.onScrollCallback = throttle( this.onScroll, 500 ).bind( this )

    app.stateElement = findDOMNode(this.refs.stateElement)
    app.stateElement.addEventListener( 'scroll', this.onScrollCallback )

  }

  onScroll ( e ) {

    this.setState({
      isScrolling: ( e.target.scrollTop > SCROLL_THRESHOLD )
    })

    if ( e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight ) {
      this.paginationNotifier.emit('next')
    }


  }

  render () {
    return (
      <div>

        <Header />

        <AudioPlayer />

        <div className="app-container">

          <Sidebar />

          <main ref="stateElement" className="state-container">

            <div className={`vertical-scroll ${ ( this.state.isScrolling ) ? 'scrolling' : null }`}>
              { this.props.children }
            </div>

          </main>

        </div>

      </div>
    )
  }

}

