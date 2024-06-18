import Sprite from "./Sprite";

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
  div: Side;

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
    this.div = this.side;

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
      right: "0px",
      top: "0px",
      width: `${this.config.thickness}px`,
      height: "100%",
      left: "",
    };
    this.side.top.style = {
      left: "0px",
      top: "0px",
      width: "100%",
      height: `${this.config.thickness}px`,
    };
    this.side.bottom.style = {
      left: "0px",
      bottom: "0px",
      width: "100%",
      height: `${this.config.thickness}px`,
      top: "",
    };
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

  set thickness($thickness: number | string) {
    let thickness = $thickness;
    if (typeof $thickness === "number") {
      thickness = `${$thickness}px`;
    }
    this.side.left.width = thickness;
    this.side.right.width = thickness;
    this.side.top.height = thickness;
    this.side.bottom.height = thickness;
  }

  get thickness(): string {
    return this.side.left.width;
  }
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
