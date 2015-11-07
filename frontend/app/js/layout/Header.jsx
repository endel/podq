import React from 'react'
import { Link } from 'react-router'

import ProfileWidget from '../components/ProfileWidget.jsx'
import SearchBar from '../components/SearchBar.jsx'

export default class Header extends React.Component {

  render () {
    return <header className="main-header">
      <span className="main-logo" />
      <SearchBar />
      <ProfileWidget />
    </header>
  }

}
