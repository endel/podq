export default class Label {
  constructor(id) {
    this.element = document.createElement('div');
    this.element.id = id;
    this._text = '';
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    this.element.innerHTML = value;
  }

}
