export default class Settings {
  constructor() {
    this.data = {
      volume: 1,
      speed: 1
    };
  }

  set(field, value) {
    this.data[field] = value;
    this.save();
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
      this.data = JSON.parse(str);
    }
  }
}
