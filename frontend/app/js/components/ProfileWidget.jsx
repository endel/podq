import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import CenteredPopup from '../helpers/CenteredPopup.js'

import Session from '../tools/Session'

export default class ProfileWidget extends React.Component {

  constructor () {
    super();

    var userData = Session.getData()

    this.state = {
      phase: (userData) ? 'LOGGED' : 'NOT_LOGGED',
      user: userData,
      opened: false
    };

    this.windowMessageHandler = this.handleWindowMessage.bind(this)
  }

  componentDidMount () {
    window.addEventListener('message', this.windowMessageHandler, true);
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.windowMessageHandler);
  }

  handleWindowMessage (evt) {
    this.popup.close()

    var data = JSON.parse(evt.data)
    Session.setData(data)

    this.setState({
      phase: 'LOGGED',
      user: data
    })
  }

  handleMouseEnter () {
    if (!this.state.user) {
      this.setState({ opened: !this.state.opened });
    }
  }

  handleMouseLeave () {
    if (!this.state.user) {
      this.setState({ opened: false });
    }
  }

  handleFacebookClick () {
    this.popup = CenteredPopup.open(`${BACKEND_ENDPOINT}/auth/facebook`,'authPopup', 550, 500);
    this.setState({ phase: 'LOGGING_IN', opened: false });
  }

  handleTwitterClick () {
    this.popup = CenteredPopup.open(`${BACKEND_ENDPOINT}/auth/twitter`,'authPopup', 550, 500);
    this.setState({ phase: 'LOGGING_IN', opened: false });
  }

  render () {

    var widgetClass = classNames({
      'profile-widget': true,
      'profile-widget-opened': this.state.opened
    });

    return <div className={widgetClass} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>

      <button className="profile-widget-button">

        {() => {

          switch (this.state.phase) {

            case "NOT_LOGGED": return <span className="profile-login">
                                        Login / Register
                                      </span>
            ;

            case "LOGGING_IN": return <span className="profile-logging">
                                        Logging in...
                                      </span>
            ;

            case "LOGGED": return <span className="profile-userdata">
                                    <img className="profile-avatar" src={ this.state.user.image } />
                                    <span className="profile-name">{ this.state.user.name }</span>
                                  </span>
            ;


          }

        }()}

      </button>


      <div className="profile-auth-phase">

        <h1>Login or Register with</h1>

        <button className="profile-signin-button profile-facebook-signin" onClick={this.handleFacebookClick.bind(this)}>
          Facebook
        </button>

        <button className="profile-signin-button profile-twitter-signin" onClick={this.handleTwitterClick.bind(this)}>
          Twitter
        </button>

      </div>

    </div>
  }

}


