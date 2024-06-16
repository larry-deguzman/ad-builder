export default class EventManager {
  constructor() {
    this.typeof = "EventManager";
    /*  EventManager.events should exist */
    this.events = [];
  }

  addEvents(obj, list) {
    let i = 0;
    const len = list.length;
    for (i; i < len; i++) {
      const args = list[i];
      args.unshift(obj);
      this.addEventListener(...args);
    }
    return obj;
  }

  addEventListener(obj, type, closure) {
    obj.addEventListener(type, closure);
    this.events.push({ obj, type, closure });
    return obj;
  }

  removeEventListener(obj, type, closure) {
    const temp = [];
    this.events.forEach((t) => {
      if (t.obj !== obj || t.type !== type || t.closure !== closure) {
        temp.push(t);
      }
    });
    obj.removeEventListener(type, closure);
    this.events = temp;
  }

  removeEventsOf(obj) {
    const temp = [];
    this.events.forEach((element) => {
      if (element.obj === obj) {
        obj.removeEventListener(element.type, element.closure);
      } else {
        temp.push(element);
      }
    });
    this.events = temp;
    return obj;
  }

  clearAll() {
    while (this.events.length > 0) {
      const t = this.events.shift();
      t.obj.removeEventListener(t.type, t.closure);
    }
  }

  checkTriggerOf(obj, type) {
    let ret = false;
    this.events.forEach((element) => {
      if (element.obj === obj && element.type === type) {
        ret = element.closure;
      }
    });
    return ret;
  }
}
