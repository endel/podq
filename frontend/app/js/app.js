import { browserHistory } from 'react-router'
import { timeFractionRegex } from './tools/tools';

import Notifier from './tools/Notifier';

import ga from 'react-ga'

//
// analytics / page view tracker
//
if (process.env.RAILS_ENV) {
  ga.initialize('UA-67917511-3')
}

var app = {
  title: '',
  entry: null,
  player: null,
  settings: { autoPlay: true },
  stateElement: null,
  resetScroll: function() {
    'use strict';
    if (this.stateElement) {
      this.stateElement.scrollTop = 0;
    }
  },
  history: browserHistory,
};

//
// history.listenBefore
// prevent history change when moving through player time fraction
//
app.history.listenBefore(location => {

  if ( location.hash.length > 1 ) {
    let timeFraction = location.hash.match( timeFractionRegex )

    if ( timeFraction.length == 1 ) {
      // set player at that time fraction

      let fractions = timeFraction[ 0 ].split(':').reverse()

      let seconds = fractions.reduce( (previousValue, currentValue, currentIndex) => {
        let multiplier = ( currentIndex == 0 ) ? 1 : currentIndex * 60
        return previousValue + parseInt( currentValue ) * multiplier
      }, 0 )

      //
      // TODO: don't use direct access to `audio` like this
      //
      app.player.podcastPlayer.audio.currentTime = seconds
    }

    // goto some location
    return false
  }

})

//
// history.listen
// trigger pageview
//
let lastPathName = "", lastQueryString = {}
app.history.listen(location => {

  if (lastPathName !== location.pathname || lastQueryString !== location.query) {
    ga.pageview( location.pathname )
  }

  lastPathName = location.pathname
  lastQueryString = location.query
})


export default app;
