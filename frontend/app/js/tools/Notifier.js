import EventEmitter from 'eventemitter3';

var notifiers = {};

function get(id) {
  var b = notifiers[id];
  if (!b) {
    b = new Notifier(id);
  }
  return b;
}

function remove(id) {
  if (notifiers[id]) {
    notifiers[id] = null;
    delete notifiers[id];
  }
}

export default class Notifier extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    remove(id);
    notifiers[id] = this;
  }

  on(event, fn, context) {
    this.off(event, fn, context);
    super.on(event, fn, context);
  }
}

Notifier.get = get;
Notifier.remove = remove;
