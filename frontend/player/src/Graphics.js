export default class Graphics {
  constructor(id, html) {
    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'graphics';
    this.svg = null;
    this.nodes = {};
    this.setHTML(html);
  }

  setHTML(html) {
    this.element.innerHTML = html;
    this.svg = this.element.children[0];
    for (var i = 0; i < this.svg.children.length; i++) {
      var nd = this.svg.children[i];
      if (nd.tagName !== 'defs') {
        var id = nd.id || nd.tagName;
        this.nodes[id] = nd;
      }
    }
  }

  updateAttr(el, attr) {
    for (var f in attr) {
      this[el].setAttributeNS(null, f, attr[f]);
    }
  }

  setNodeAttr(id, f, v) {
    this.nodes[id].setAttributeNS(null, f, v);
  }
}
