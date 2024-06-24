import UA from "../utils/UA";
import Create from "../utils/Create";
import Border from "./Border";

interface Original {
  width: number;
  height: number;
}
type Scale = {
  scaleX: number;
  scaleY: number;
};

export default class Sprite {
  storage: any;
  div: HTMLElement;
  type: string = "sprite";

  constructor($id: string) {
    const transforms: { [key: string]: string } = {
      webkit: "webkitTransform",
      safari: "webkitTransform",
      chrome: "webkitTransform",
      opera: "transform",
      firefox: "transform",
      edge: "transform",
      other: "transform",
      msie: "transform",
    };
    this.storage = {
      div: Create.div($id),
      id: $id,
      originalSize: {},
      parent: null,
      browser: UA.browser.name.toLowerCase(),
      transformer: transforms[UA.browser.name.toLowerCase()],
    };
    this.div = this.storage.div;
  }

  removeChild(child: Sprite): void {
    if (child.storage.div === undefined) {
      this.storage.div.removeChild(child);
    } else if (child.storage.div instanceof HTMLElement) {
      if (child.storage.parent === this) {
        this.storage.div.removeChild(child.storage.div);
      }
    }
  }

  addChild(child: Sprite | Border): Sprite | Border {
    if (child instanceof Border) {
      child.parent = this;
      this.storage.div.appendChild(child.div);
      child.update(this.width, this.height);
    } else if (child instanceof Sprite) {
      this.storage.parent = this;
      this.storage.div.appendChild(child.div);
    }
    return child;
  }

  addChildren(a: Sprite[]): Sprite[] {
    for (let i = 0; i < a.length; i++) {
      this.addChild(a[i]);
    }
    return a;
  }

  removeImage(): void {
    this.storage.div.innerHTML = "";
  }
  // checked
  image(img: HTMLImageElement): void {
    const elem = Create.element("img");
    elem.setAttribute("src", img.src);
    elem.setAttribute("height", "100%");
    elem.setAttribute("width", "100%");
    this.width = img.width;
    this.height = img.height;
    this.og = {
      width: parseInt(this.width, 10),
      height: parseInt(this.height, 10),
    };
    this.storage.div.appendChild(elem);
  }

  removeBackgroundImage(): void {
    this.style = {
      backgroundImage: "",
    };
  }

  backgroundImage(
    img: HTMLImageElement,
    position = { x: 0, y: 0 },
    backgroundSize = "100% 100%"
  ): void {
    const pos = Object.assign(position, {
      width: this.width,
      height: this.height,
    });
    const sansNumber = new RegExp("[0-9.]*", "g");
    function clean(item: number | string) {
      let ret = item;
      if (typeof item === "number") {
        ret = `${ret}px`;
      } else {
        const stringNumber = ret as string;
        const mod = stringNumber.replace(sansNumber, "");
        ret = mod === "" ? `${ret}px` : ret;
      }
      return ret;
    }
    const backgroundImage = `url(${img.src})`;
    const backgroundPosition = `${clean(pos.x || 0)} ${clean(pos.y || 0)}`;

    this.style = {
      backgroundImage,
      backgroundPosition,
      backgroundSize,
    };
  }

  addEventListener(...args: any[]) {
    this.storage.div.addEventListener(...args);
  }

  removeEventListener(...args: any[]) {
    this.storage.div.removeEventListener(...args);
  }

  addToBody(): Sprite {
    window.document.body.appendChild(this.storage.div);
    return this;
  }

  setPerspectiveOrigin(x: number, y: number, mod: string) {
    const key =
      this.storage.browser === "safari"
        ? "webkitPerspectiveOrigin"
        : "perspectiveOrigin";
    this.storage.div.style[key] = `${x}${mod} ${y}${mod}`;
  }

  getPerspectiveOrigin(): string {
    /* istanbul ignore next */
    const key =
      this.storage.browser === "safari"
        ? "webkitPerspectiveOrigin"
        : "perspectiveOrigin";
    return this.storage.div.style[key];
  }

  setRegistration(x: number, y: number, z: number, mod: string) {
    const key =
      this.storage.browser === "safari"
        ? "webkitTransformOrigin"
        : "transformOrigin";
    this.storage.div.style[key] = `${x}${mod} ${y}${mod} ${z}px`;
  }

  getRegistration(): string[] {
    const key =
      this.storage.browser === "safari"
        ? "webkitTransformOrigin"
        : "transformOrigin";
    return this.storage.div.style[key].split(" ");
  }

  get og(): Original {
    return this.storage.originalSize;
  }
  // checked
  set og(obj: Original) {
    this.storage.originalSize = obj;
  }

  set style(styles: { [key: string]: string | number }) {
    Object.keys(styles).forEach((key: string) => {
      const value = styles[key];
      if (this.storage.div instanceof HTMLElement) {
        this.storage.div.style[key] = value as string | number;
      }
    });
  }

  get style(): CSSStyleDeclaration {
    return this.storage.div.style;
  }

  set buttonMode(a: string) {
    if (typeof a === "string") {
      this.storage.div.style.cursor = a;
    } else {
      this.storage.div.style.cursor = "auto";
    }
  }

  get buttonMode(): string {
    return this.storage.div.style.cursor;
  }

  set backgroundColor(color: string | number) {
    if (typeof color === "number") {
      color = `#${color.toString(16)}`;
    }
    this.storage.div.style.backgroundColor = color;
  }

  get backgroundColor(): string {
    return this.storage.div.style.backgroundColor;
  }

  set x(a: number | string) {
    if (typeof a === "number") {
      this.style = { left: `${a}px` };
    } else {
      this.style = { left: a };
    }
  }

  set left(a: number | string) {
    this.x = a;
  }

  get x(): number {
    return parseInt(this.storage.div.style.left, 10);
  }

  get left(): number {
    return this.x;
  }

  set y(a: number | string) {
    if (typeof a === "number") {
      this.style = { top: `${a}px` };
    } else {
      this.style = { top: a };
    }
  }

  set top(a: number | string) {
    this.y = a;
  }

  get y(): number {
    return parseInt(this.storage.div.style.top, 10);
  }

  get top(): number {
    return this.y;
  }

  set bottom(a: number | string) {
    if (typeof a === "number") {
      this.style = { bottom: `${a}px` };
    } else {
      this.style = { bottom: a };
    }
  }

  get bottom(): number {
    return parseInt(this.storage.div.style.bottom, 10);
  }

  set right(a: number | string) {
    if (typeof a === "number") {
      this.style = { right: `${a}px` };
    } else {
      this.style = { right: a };
    }
  }

  get right(): number {
    return parseInt(this.storage.div.style.right, 10);
  }

  set width(a: number | string) {
    if (typeof a === "number") {
      if (!this.og.width) {
        this.og.width = a;
      }
      this.style = { width: `${a}px` };
    } else {
      if (!RegExp(/%$/).test(a)) {
        this.og.width = parseInt(a, 10);
      }
      this.style = { width: a };
    }
  }

  get width(): string {
    return this.storage.div.style.width;
  }

  set height(a: number | string) {
    if (typeof a === "number") {
      if (!this.og.height) {
        this.og.height = a;
      }
      this.style = { height: `${a}px` };
    } else {
      if (!RegExp(/%$/).test(a)) {
        this.og.height = parseInt(a, 10);
      }
      this.style = { height: a };
    }
  }

  get height(): string {
    return this.storage.div.style.height;
  }

  set alpha(a: number | string) {
    this.style = { opacity: typeof a === "string" ? a : a.toString() };
  }

  get alpha(): number {
    return parseFloat(this.storage.div.style.opacity);
  }

  set display(a: string) {
    this.style = { display: a };
  }

  get display(): string {
    return this.storage.div.style.display;
  }

  set scale(num: number) {
    if (this.og.width !== undefined && this.og.height !== undefined) {
      this.style = {
        width: `${this.og.width * num}px`,
        height: `${this.og.height * num}px`,
      };
    }
  }

  get scale(): Scale {
    if (this.og.width !== undefined && this.og.height !== undefined) {
      return {
        scaleX:
          Math.round((parseInt(this.width, 10) / this.og.width) * 10) / 10,
        scaleY:
          Math.round((parseInt(this.height, 10) / this.og.height) * 10) / 10,
      };
    }
    return { scaleX: 1, scaleY: 1 };
  }

  set scaleX(num: number) {
    if (this.og.width !== undefined) {
      this.width = this.og.width * num;
    }
  }

  get scaleX(): number {
    if (this.og.width !== undefined) {
      return parseInt(this.width, 10) / this.og.width;
    }
    return 1;
  }

  set scaleY(num: number) {
    if (this.og.height !== undefined) {
      this.height = this.og.height * num;
    }
  }

  get scaleY(): number {
    if (this.og.height !== undefined) {
      return parseInt(this.height, 10) / this.og.height;
    }
    return 1;
  }

  get parent() {
    return this.storage.parent;
  }

  set parent(element: Sprite) {
    this.storage.parent = element;
  }

  set perspective(a: number) {
    const key =
      this.storage.browser === "safari" ? "webkitPerspective" : "perspective";
    this.storage.div.style[key] = `${a}px`;
  }

  get perspective(): number {
    const key =
      this.storage.browser === "safari" ? "webkitPerspective" : "perspective";
    return parseFloat(this.storage.div.style[key]);
  }

  set overflow(a: string) {
    this.style = { overflow: a };
  }

  get overflow(): string {
    return this.storage.div.style.overflow;
  }

  // set rotation(a) {
  //   this.storage.div.style[this.storage.transformer] =
  //     this.setTransformProperty(this, "rotate", "deg", a);
  // }

  // get rotation() {
  //   return this.getTransformProperty(this.div, "rotate");
  // }

  // getTransformProperty(mc, passedType) {
  //   const a = mc.style[this.storage.transformer].trim().split(" ");
  //   const type = `${passedType}(`;
  //   let ret = 0;
  //   a.forEach((item) => {
  //     if (item.indexOf(type) !== -1) {
  //       ret = parseFloat(item.replace(/[^\d^.]*/g, ""));
  //     }
  //   });
  //   return ret;
  // }

  // setTransformProperty(mc, passedType, mod, value) {
  //   const a = mc.div.style[this.transformer].trim().split(" ");
  //   let foundValue = false;
  //   const temp = [];
  //   const type = `${passedType}(`;
  //   a.forEach((item) => {
  //     if (item.indexOf(type) !== -1) {
  //       temp.push(`${type}${value}${mod})`);
  //       foundValue = true;
  //     } else {
  //       temp.push(item);
  //     }
  //   });
  //   if (!foundValue) {
  //     temp.push(`${type}${value}${mod})`);
  //   }
  //   return temp.join(" ").trim();
  // }
}
