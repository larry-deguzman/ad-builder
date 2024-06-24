import Sprite from "./Sprite";
import Create from "../utils/Create";

type Config = {
  color: string;
  thickness: number;
  id: string;
  zIndex: number;
};

type Side = {
  left: Sprite;
  top: Sprite;
  right: Sprite;
  bottom: Sprite;
};

export default class Border {
  config: Config;
  parent: Sprite | undefined;
  side: Side;
  div: HTMLElement;
  type: string = "border";

  constructor(configParam = {}) {
    const defaultConfig = {
      color: "black",
      thickness: 1,
      id: "border",
      zIndex: 1000,
    };
    this.config = Object.assign(defaultConfig, configParam);
    this.parent = undefined;
    this.side = {
      left: new Sprite(`${this.config.id}_left`),
      top: new Sprite(`${this.config.id}_top`),
      right: new Sprite(`${this.config.id}_right`),
      bottom: new Sprite(`${this.config.id}_bottom`),
    };

    Object.entries(this.side).map(([, value]) => {
      const element = value;
      element.backgroundColor = this.config.color;
      element.style = { zIndex: this.config.zIndex };
    });
    this.side.left.style = {
      left: "0px",
      top: "0px",
      width: `${this.config.thickness}px`,
      height: "100%",
    };
    this.side.right.style = {
      top: "0px",
      width: `${this.config.thickness}px`,
      height: "100%",
    };
    this.side.top.style = {
      left: "0px",
      top: "0px",
      width: "100%",
      height: `${this.config.thickness}px`,
    };
    this.side.bottom.style = {
      left: "0px",
      width: "100%",
      height: `${this.config.thickness}px`,
    };
    this.div = Create.div("border");

    Object.entries(this.side).map(([, value]) => {
      this.div.appendChild(value.div);
    });
  }

  update(width: string, height: string) {
    // this can only be called from Sprite
    this.side.left.height = height;
    this.side.top.width = width;
    this.side.right.height = height;
    this.side.bottom.width = width;

    this.side.right.left = parseInt(width, 10) - this.config.thickness;
    this.side.bottom.top = parseInt(height, 10) - this.config.thickness;
  }

  set color($color: string) {
    this.config.color = $color;
    Object.entries(this.side).map(([, value]) => {
      const element = value;
      element.backgroundColor = this.config.color;
    });
  }

  get color(): string {
    return this.config.color;
  }

  set visible(state: string) {
    Object.entries(this.side).map(([, value]) => {
      const element = value;
      element.display = state;
    });
  }

  get visible(): string {
    return this.side.left.display;
  }

  // set thickness($thickness: number | string) {
  //   let thickness = $thickness;

  //   if (typeof $thickness === "number") {
  //     this.config.thickness = $thickness;
  //     thickness = `${$thickness}px`;
  //   } else {
  //     this.config.thickness = parseInt($thickness, 10);
  //   }
  //   this.side.left.width = thickness;
  //   this.side.right.width = thickness;
  //   this.side.top.height = thickness;
  //   this.side.bottom.height = thickness;
  // }

  // get thickness(): string {
  //   return this.side.left.width;
  // }
  /*
  addToBody(thisWindow = { none: "none" }) {
    const win = Object.entries(thisWindow).length === 1 ? window : thisWindow;
    this.parentObject = win.document.body;
    Object.keys(this.div).forEach((key) => {
      const sprite = this.div[key];
      sprite.addToBody();
    });

    return this.div;
  }
    */
}
