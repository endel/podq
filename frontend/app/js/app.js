var settings = {
  autoPlay: false
};

var app = {
  title: '',
  entry: null,
  player: null,
  settings: settings,
  stateElement: null,
  resetScroll: function() {
    'use strict';
    if (this.stateElement) {
      this.stateElement.scrollTop = 0;
    }
  }
};

export default app;
