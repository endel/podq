import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import CenteredPopup from '../helpers/CenteredPopup.js'

export default class ProfileWidget extends React.Component {

  constructor () {
    super();
    this.state = {
      phase: 'NOT_LOGGED',
      user: null,
      opened: false
    };
  }

  componentDidMount () {

    window.addEventListener('message', this.handleWindowMessage, false);

  }

  handleWindowMessage (evt) {
    debugger;
  }

  handleClick () {

    this.setState({
      opened: !this.state.opened
    });

  }

  handleMouseLeave () {

    this.setState({
      opened: false
    });

  }

  handleFacebookClick () {

    var fbPopup = CenteredPopup.open('https://www.facebook.com/dialog/oauth?client_id={app-id}&redirect_uri={redirect-uri}','fbPopup', 550, 500);

  }

  handleTwitterClick () {

    this.setState({
      phase: 'LOGGING_IN',
      opened: false
    });

    setTimeout(() => this.setState({
      phase: 'LOGGED'
    }), 2000);

  }

  render () {

    var widgetClass = classNames({
      'profile-widget': true,
      'profile-widget-opened': this.state.opened
    });

    return <div className={widgetClass} onMouseLeave={this.handleMouseLeave.bind(this)}>

      <button className="profile-widget-button" onClick={this.handleClick.bind(this)}>

        {() => {

          switch (this.state.phase) {

            case "NOT_LOGGED": return <div className="profile-login">
                                        Login / Signin
                                      </div>
            ;

            case "LOGGING_IN": return <div className="profile-logging">
                                        Logging in...
                                      </div>
            ;

            case "LOGGED": return <div className="profile-userdata">
                                    <img className="profile-avatar" src="https://avatars1.githubusercontent.com/u/5850824?v=3&s=460" />
                                    <span className="profile-name">João Mosmann</span>
                                  </div>
            ;


          }

        }()}

      </button>


      <div className="profile-auth-phase">

        <h1>Sign or Login</h1>

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


