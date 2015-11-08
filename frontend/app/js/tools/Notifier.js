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

export default class Notifier {
  constructor(id) {
    this.id = id;
    this.listeners = [];
    remove(id);
    notifiers[id] = this;
  }

  on(msg, fn, context, once = false) {
    var listener = {};
    listener.msg = msg;
    listener.fn = fn;
    listener.once = once;
    listener.context = context;
    this.listeners.push(listener);
  }

  once(msg, fn, context) {
    this.on(msg, fn, context, true);
  }

  off(msg, fn, context) {
    var i = this.listeners.length;
    while (i--) {
      var listener = this.listeners[i];
      if (listener.msg === msg && listener.fn === fn && listener.context === context) {
        this.listeners.splice(i, 1);
      }
    }
  }

  clean(context) {
    var i = this.listeners.length;
    while (i--) {
      var listener = this.listeners[i];
      if (listener.context === context) {
        this.listeners.splice(i, 1);
      }
    }
  }

  emit(msg, args) {
    var i = this.listeners.length;
    while (i--) {
      var listener = this.listeners[i];
      if (listener.msg === msg) {
        if (listener.context) {
          listener.fn.apply(listener.context, [args]);
        } else {
          listener.fn(args);
        }

        if (listener.once) {
          this.listeners.splice(i, 1);
        }
      }
    }
  }
}

Notifier.get = get;
Notifier.remove = remove;
