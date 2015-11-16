export default class Settings {
  constructor() {
    this.data = {
      volume: 1,
      speed: 1,
      time: 0,
      entry: null
    };
  }

  set(field, value, save = false) {
    this.data[field] = value;
    if (save) {
      this.save();
    }
  }

  get(field) {
    return this.data[field];
  }

  save() {
    var str = JSON.stringify(this.data);
    localStorage.setItem('podcast-player', str);
  }

  load() {
    var str = localStorage.getItem('podcast-player');
    if (str) {
      var data = JSON.parse(str);
      for (var f in data) {
        this.data[f] = data[f];
      }
    }
  }
}
