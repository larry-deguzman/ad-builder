import UA from "../utils/UA";
import Create from "../utils/Create";

export default class Sprite {
  constructor(id) {
    this._originalSize = {};
    this.div = Create.isElement(id) ? id : Create.div(id);
    this.id = this.div.id;

    const transforms = {
      webkit: "webkitTransform",
      safari: "webkitTransform",
      chrome: "webkitTransform",
      opera: "transform",
      firefox: "transform",
      edge: "transform",
      other: "transform",
      msie: "transform",
    };

    /* should return browser as webkit (for testing in phantomjs) */
    this.browser = UA.browser.name.toLowerCase();
    this.transformer = transforms[this.browser];
  }
  /* private */
  get og() {
    return this._originalSize;
  }

  set og(obj) {
    this._originalSize = obj;
  }

  /* public */
  set buttonMode(a) {
    if (a === true) {
      this.div.style.cursor = "pointer";
    } else if (typeof a === "string") {
      this.div.style.cursor = a;
    } else {
      this.div.style.cursor = "auto";
    }
  }

  get buttonMode() {
    return this.div.style.cursor;
  }

  set backgroundColor(passedA) {
    let a = passedA;
    if (typeof a === "number") {
      a = `#${a.toString(16)}`;
    }
    this.div.style.backgroundColor = a;
  }

  get backgroundColor() {
    return this.div.style.backgroundColor;
  }

  set style(args) {
    const styles = Object.entries(args);
    styles.forEach((element) => {
      const [key, value] = element;
      this.div.style[key] = value;
    });
  }

  get style() {
    return this.div.style;
  }

  set scale(num) {
    this.style = {
      width: `${this.og.width * num}px`,
      height: `${this.og.height * num}px`,
    };
  }

  get scale() {
    const yScale = Math.round((this.height / this.og.height) * 10) / 10;
    const xScale = Math.round((this.width / this.og.width) * 10) / 10;
    /* if (xScale === yScale) {
       return xScale;
    } */
    return {
      scaleX: xScale,
      scaleY: yScale,
    };
  }

  set scaleX(num) {
    this.width = this.og.width * num;
  }

  get scaleX() {
    return this.width / this.og.width;
  }

  set scaleY(num) {
    this.height = this.og.height * num;
  }

  get scaleY() {
    return this.height / this.og.height;
  }

  set x(a) {
    this.style = {
      left: `${a}px`,
    };
  }

  set left(a) {
    this.style = {
      left: `${a}px`,
    };
  }

  get x() {
    return parseInt(this.div.style.left, 10);
  }

  get left() {
    return parseInt(this.div.style.left, 10);
  }

  set y(a) {
    this.style = {
      top: `${a}px`,
    };
  }

  get y() {
    return parseInt(this.div.style.top, 10);
  }

  get top() {
    return parseInt(this.div.style.top, 10);
  }

  set top(a) {
    this.style = {
      top: `${a}px`,
    };
  }

  set width(a) {
    if (this.og.width === null || this.og.width === undefined) {
      this.og.width = a;
    }
    if (typeof a === "string") {
      /* istanbul ignore else */
      if (RegExp(/%$|px$/).test(a)) {
        this.style = { width: a };
      }
    } else {
      this.style = { width: `${parseInt(a, 10)}px` };
    }
  }

  get width() {
    if (this.div.style.width.indexOf("%") !== -1) {
      return this.div.style.width;
    }
    return parseInt(this.div.style.width, 10);
  }

  set height(a) {
    if (this.og.height === null || this.og.height === undefined) {
      this.og.height = a;
    }
    if (typeof a === "string") {
      /* istanbul ignore else */
      if (RegExp(/%$|px$/).test(a)) {
        this.style = { height: a };
      }
    } else {
      this.style = { height: `${parseInt(a, 10)}px` };
    }
  }

  get height() {
    if (this.div.style.height.indexOf("%") !== -1) {
      return this.div.style.height;
    }
    return parseInt(this.div.style.height, 10);
  }

  set alpha(a) {
    this.style = {
      opacity: a,
    };
  }

  get alpha() {
    return parseFloat(this.div.style.opacity);
  }

  set visible(a) {
    const display = a === false ? "none" : "block";
    this.style = {
      display,
    };
  }

  get visible() {
    return this.div.style.display !== "none";
  }

  get parent() {
    let ret;
    if (this.parentObject) {
      ret = this.parentObject;
    } else if (this.div.parentNode) {
      ret = this.div.parentNode;
    }
    this.parent = ret;
    return ret;
  }

  set parent(element) {
    this.parentObject = element;
  }

  set rotation(a) {
    this.div.style[this.transformer] = this.setTransformProperty(
      this,
      "rotate",
      "deg",
      a
    );
  }

  get rotation() {
    return this.getTransformProperty(this.div, "rotate");
  }

  set rotationX(a) {
    this.div.style[this.transformer] = this.setTransformProperty(
      this,
      "rotateX",
      "deg",
      a
    );
  }

  get rotationX() {
    return this.getTransformProperty(this.div, "rotateX");
  }

  set rotationY(a) {
    this.div.style[this.transformer] = this.setTransformProperty(
      this,
      "rotateY",
      "deg",
      a
    );
  }

  get rotationY() {
    return this.getTransformProperty(this.div, "rotateY");
  }

  set rotationZ(a) {
    this.div.style[this.transformer] = this.setTransformProperty(
      this,
      "rotateZ",
      "deg",
      a
    );
  }

  get rotationZ() {
    return this.getTransformProperty(this.div, "rotateZ");
  }

  set webScale(scale) {
    this.div.style[this.transformer] = this.setTransformProperty(
      this,
      "scale",
      "",
      scale
    );
  }

  get webScale() {
    return this.getTransformProperty(this, "scale");
  }

  set perspective(a) {
    /* istanbul ignore next */
    const key = this.browser === "safari" ? "webkitPerspective" : "perspective";
    this.div.style[key] = `${a}px`;
  }

  get perspective() {
    /* istanbul ignore next */
    const key = this.browser === "safari" ? "webkitPerspective" : "perspective";
    return parseFloat(this.div.style[key]);
  }

  set perspectiveOrigin(args) {
    /* istanbul ignore next */
    const key =
      this.browser === "safari"
        ? "webkitPerspectiveOrigin"
        : "perspectiveOrigin";
    const [x, y, mod] = args;
    this.div.style[key] = `${x}${mod} ${y}${mod}`;
  }

  get perspectiveOrigin() {
    /* istanbul ignore next */
    const key =
      this.browser === "safari"
        ? "webkitPerspectiveOrigin"
        : "perspectiveOrigin";
    return this.div.style[key];
  }

  set registration(args) {
    /* istanbul ignore next */
    const key =
      this.browser === "safari" ? "webkitTransformOrigin" : "transformOrigin";
    const [x, y, z, mod] = args;
    this.div.style[key] = `${x}${mod} ${y}${mod} ${z}px`;
  }

  get registration() {
    /* istanbul ignore next */
    const key =
      this.browser === "safari" ? "webkitTransformOrigin" : "transformOrigin";
    return this.div.style[key].split(" ");
  }

  /* methods */
  offset(win) {
    const key =
      this.browser === "safari" ? "webkitTransformOrigin" : "transformOrigin";
    const offset = { x: 0, y: 0 };
    const level = [this.div];
    let i;
    let hold = this.div.parentNode;
    let savedScale = 1;
    while (hold !== win.document.body) {
      level.push(hold);
      hold = hold.parentNode;
    }

    function getScale(mod) {
      let scale = 1;
      mod.split(" ").some((element) => {
        if (element.indexOf("scale") !== -1) {
          scale = parseFloat(element.replace(/scale\(|\)/g, ""));
          return true;
        }
        return false;
      });
      return scale;
    }

    function getOrigin(mod) {
      const origin =
        mod[key] !== undefined ? mod[key].split(" ") : ["0%", "0%"];
      let ret = { x: 0, y: 0 };
      if (origin.length > 1) {
        const [xo, yo] = origin;
        ret = {
          x:
            xo.indexOf("%") !== -1
              ? parseFloat(mod.width) * (parseFloat(xo) / 100)
              : parseFloat(xo),
          y:
            yo.indexOf("%") !== -1
              ? parseFloat(mod.height) * (parseFloat(yo) / 100)
              : parseFloat(yo),
        };
      }
      return ret;
    }
    for (i = level.length - 1; i >= 0; i--) {
      const mod = win.getComputedStyle(level[i], null);
      const scale = getScale(mod[this.transformer]);
      const origin = getOrigin(mod);
      const mcTemp = {
        left: Number.isNaN(parseFloat(mod.left)) ? 0 : mod.left,
        top: Number.isNaN(parseFloat(mod.top)) ? 0 : mod.top,
        marginLeft: Number.isNaN(parseFloat(mod.marginLeft))
          ? 0
          : mod.marginLeft,
        marginTop: Number.isNaN(parseFloat(mod.marginTop)) ? 0 : mod.marginTop,
      };
      const mc = {
        x: parseFloat(mcTemp.left) + parseFloat(mcTemp.marginLeft),
        y: parseFloat(mcTemp.top) + parseFloat(mcTemp.marginTop),
      };
      offset.x += (mc.x + origin.x - origin.x * scale) * savedScale;
      offset.y += (mc.y + origin.y - origin.y * scale) * savedScale;
      savedScale *= scale;
    }
    offset.scale = savedScale;
    return offset;
  }

  fullscreen($scope, $state) {
    const call = {
      req: [
        "requestFullscreen",
        "mozRequestFullScreen",
        "webkitRequestFullScreen",
        "msRequestFullscreen",
      ],
      exit: [
        "exitFullscreen",
        "mozCancelFullScreen",
        "webkitCancelFullScreen",
        "msExitFullscreen",
      ],
    };
    if ($state === true) {
      call.req.some((element) => {
        if (typeof this.div[element] === "function") {
          this.div[element]();
          return true;
        }
        return false;
      });
    } else {
      call.exit.some((element) => {
        if (typeof $scope.document[element] === "function") {
          $scope.document[element]();
          return true;
        }
        return false;
      });
    }
    if ($scope.document.fullscreenElement === this.div) {
      return "success";
    }
    return "fail";
  }

  addToBody(thisWindow = { none: "none" }) {
    /* i need to fugure out scope automatically */
    /* this needs to be removed for now */
    /**
     * the problem with this is that if you have this Framework
     * passed down, it conatins the original document.body as the reference.
     * I need to figure out how to pass scope quietly.
     *
     * When the ACE squad localizes this they need to make a new instance of the
     * Object
     * Sprite = new dir.SPRITE;
     */
    const win = Object.entries(thisWindow).length === 1 ? window : thisWindow;
    this.parentObject = win.document.body;
    win.document.body.appendChild(this.div);
    return this.div;
  }

  addEventListener(...args) {
    this.div.addEventListener(...args);
  }

  removeEventListener(...args) {
    this.div.removeEventListener(...args);
  }

  removeChild(child) {
    /* Remove.child needs to know who owns the child */
    /* istanbul ignore else */
    if (child.div === undefined) {
      this.div.removeChild(child);
    } else if (child.hasOwnProperty("div")) {
      this.div.removeChild(child.div);
    }
  }

  addChild(passedChild) {
    const child = passedChild;
    child.parent = this;
    const kid = child.div ? child.div : child;
    if (child.hasOwnProperty("side")) {
      Object.entries(kid).forEach(([, value]) => this.addChild(value));
    } else {
      this.div.appendChild(kid);
    }
    return child;
  }

  addChildren(a) {
    let i;
    for (i = 0; i < a.length; i++) {
      this.addChild(a[i]);
    }
    return a;
  }

  removeImage() {
    this.div.innerHTML = "";
  }

  set image(img) {
    const elem = document.createElement("img");
    elem.setAttribute("src", img.src);
    elem.setAttribute("height", "100%");
    elem.setAttribute("width", "100%");
    this.width = img.width;
    this.height = img.height;
    this.og = {
      width: this.width,
      height: this.height,
    };
    this.addChild(elem);
  }

  removeBackgroundImage() {
    this.style = {
      backgroundImage: "",
    };
  }

  backgroundImage(
    img,
    position = { x: 0, y: 0 },
    backgroundSize = "100% 100%"
  ) {
    const pos = Object.assign(position, {
      width: this.width,
      height: this.height,
    });
    const sansNumber = new RegExp("[0-9.]*", "g");
    function clean(item) {
      let ret = item;
      if (typeof item === "number") {
        ret = `${ret}px`;
      } else {
        const mod = ret.replace(sansNumber, "");
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

  getTransformProperty(mc, passedType) {
    const a = mc.style[this.transformer].trim().split(" ");
    const type = `${passedType}(`;
    let ret = 0;
    a.forEach((item) => {
      if (item.indexOf(type) !== -1) {
        ret = parseFloat(item.replace(/[^\d^.]*/g, ""));
      }
    });
    return ret;
  }

  setTransformProperty(mc, passedType, mod, value) {
    const a = mc.div.style[this.transformer].trim().split(" ");
    let foundValue = false;
    const temp = [];
    const type = `${passedType}(`;
    a.forEach((item) => {
      if (item.indexOf(type) !== -1) {
        temp.push(`${type}${value}${mod})`);
        foundValue = true;
      } else {
        temp.push(item);
      }
    });
    if (!foundValue) {
      temp.push(`${type}${value}${mod})`);
    }
    return temp.join(" ").trim();
  }
}
