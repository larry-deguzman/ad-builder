type GridProperties = {
  width: number;
  height: number;
};

type ArrayPoint = Point[];

type Point = {
  x: number;
  y: number;
};

export default class Create {
  static isElement(element: HTMLElement | null): boolean {
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

  static element(
    a: string,
  ): HTMLElement | HTMLIFrameElement | HTMLImageElement {
    return document.createElement(a);
  }

  static div(
    $id: string = `act_us_${Math.random()}`.replace(".", "_"),
  ): HTMLDivElement {
    const id = $id;
    const mc = document.createElement("div");
    mc.setAttribute("id", id);
    // mc.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    mc.style.position = "absolute";
    return mc;
  }

  static iframe(config: { [index: string]: string } = {}): HTMLIFrameElement {
    const iframe = this.element("iframe") as HTMLIFrameElement;
    Object.keys(config).forEach((key) => {
      let value = config[key];

      if (Array.isArray(value) || typeof value === "object") {
        value = JSON.stringify(value);
      }
      iframe.setAttribute(key, value);
    });
    return iframe;
  }

  static image(src: string): HTMLImageElement {
    const elem = Create.element("img") as HTMLImageElement;
    elem.setAttribute("src", src);
    elem.setAttribute("height", "100%");
    elem.setAttribute("width", "100%");
    return elem;
  }

  static grid(
    bounds: GridProperties,
    cell: GridProperties,
    bleed: boolean = false,
  ): ArrayPoint {
    const ret: ArrayPoint = [];
    const count = {
      width: Math[bleed ? "ceil" : "floor"](bounds.width / cell.width),
      height: Math[bleed ? "ceil" : "floor"](bounds.height / cell.height),
    };
    for (let i = 0; i < count.height; i++) {
      for (let j = 0; j < count.width; j++) {
        ret.push({ x: j * cell.width, y: i * cell.height } as Point);
      }
    }
    return ret;
  }
}
