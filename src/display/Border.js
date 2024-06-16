import Sprite from "./Sprite";

export default class Border {
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
    Object.keys(this.side).forEach((value) => {
      this.side[value].backgroundColor = this.config.color;
      this.side[value].style = { zIndex: this.config.zIndex };
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

  set color($color) {
    Object.keys(this.side).forEach((value) => {
      this.side[value].backgroundColor = $color;
      this.config.color = $color;
    });
  }

  get color() {
    return this.config.color;
  }

  set visible(state) {
    Object.entries(this.side).forEach(([, element]) => {
      const ele = element;
      ele.visible = state;
    });
  }

  get visible() {
    return this.side.left.visible;
  }

  set thickness($thickness) {
    let thickness = $thickness;
    if (typeof $thickness === "number") {
      thickness = `${$thickness}px`;
    }
    this.side.left.width = thickness;
    this.side.right.width = thickness;
    this.side.top.height = thickness;
    this.side.bottom.height = thickness;
  }

  get thickness() {
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
