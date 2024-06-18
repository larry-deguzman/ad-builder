import Sprite from "../display/Sprite";

type Event = {
  sprite: Sprite;
  type: string;
  closure: Function;
};

export default class EventManager {
  type: string;
  events: Event[];

  constructor() {
    this.type = "EventManager";
    this.events = [];
  }

  addEvents(sprite: Sprite, list: [string, Function][]) {
    for (let i: number = 0; i < list.length; i++) {
      const event = list[i][0];
      const closure = list[i][1];
      this.addEventListener(sprite, event, closure);
    }
    return sprite;
  }

  addEventListener(sprite: Sprite, type: string, closure: Function) {
    sprite.addEventListener(type, closure);
    this.events.push({ sprite, type, closure });
    return sprite;
  }

  removeEventListener(sprite: Sprite, type: string, closure: Function) {
    const temp: Event[] = [];
    this.events.forEach((event) => {
      if (
        event.sprite !== sprite ||
        event.type !== type ||
        event.closure !== closure
      ) {
        temp.push(event);
      }
    });
    sprite.removeEventListener(type, closure);
    this.events = temp;
  }

  removeEventsOf(sprite: Sprite): Sprite {
    const temp: Event[] = [];
    this.events.forEach((element) => {
      if (element.sprite === sprite) {
        sprite.removeEventListener(element.type, element.closure);
      } else {
        temp.push(element);
      }
    });
    this.events = temp;
    return sprite;
  }

  clearAll() {
    while (this.events.length > 0) {
      const event: Event | undefined = this.events.shift();
      if (event !== undefined) {
        event.sprite.removeEventListener(event.type, event.closure);
      }
    }
  }

  checkTriggerOf(sprite: Sprite, type: string) {
    let ret: boolean = false;
    let shouldSkip: boolean = false;
    this.events.forEach((event) => {
      if (event.sprite === sprite && event.type === type) {
        if (!shouldSkip) {
          ret = true;
          shouldSkip = true;
        }
      }
    });
    return ret;
  }
}
