var app = {
  title: '',
  entry: null,
  player: null,
  stateElement: null,
  resetScroll: function() {
    if (this.stateElement) {
      this.stateElement.scrollTop = 0
    }
  }
}

export default app;
