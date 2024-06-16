export default class Create {
  static isElement(element) {
    if (typeof HTMLElement === "object") {
      return element instanceof HTMLElement;
    }
    if (
      element &&
      typeof element === "object" &&
      element !== null &&
      element.nodeType === 1 &&
      typeof element.nodeName === "string"
    ) {
      return true;
    }
    return false;
  }

  static element(a) {
    return document.createElement(a);
  }

  static div(passedId = `act_us_${Math.random()}`.replace(".", "_")) {
    const id = passedId;
    const mc = document.createElement("div");
    mc.setAttribute("id", id);
    // mc.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    mc.style.width = "100px";
    mc.style.height = "100px";
    mc.style.left = "0px";
    mc.style.top = "0px";
    mc.style.opacity = 1;
    mc.style.visibility = "visible";
    mc.style.overflow = "hidden";
    mc.style.position = "absolute";
    return mc;
  }

  static iframe(config = {}) {
    const iframe = this.element("iframe");
    Object.keys(config).forEach((key) => {
      let value = config[key];

      if (Array.isArray(value) || typeof value === "object") {
        value = JSON.stringify(value);
      }
      iframe.setAttribute(key, value);
    });
    return iframe;
  }

  static image(src) {
    const elem = document.createElement("img");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "100%");
    elem.setAttribute("width", "100%");
    return elem;
  }

  static grid(bounds, cell, bleed = false) {
    const ret = [];
    const count = {
      width: Math[bleed ? "ceil" : "floor"](bounds.width / cell.width),
      height: Math[bleed ? "ceil" : "floor"](bounds.height / cell.height),
    };
    for (let i = 0; i < count.height; i++) {
      for (let j = 0; j < count.width; j++) {
        ret.push({ x: j * cell.width, y: i * cell.height });
      }
    }
    return ret;
  }
}
