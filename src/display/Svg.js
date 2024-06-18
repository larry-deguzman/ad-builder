import Sprite from "./Sprite";

export default class Svg extends Sprite {
  constructor(id, passedCode) {
    super(id);
    const uniqueID = id.toString().replace(/\./g, "-");
    this.typeof = "SVG";
    this.code = passedCode.replace(/^.*<svg/, "<svg");
    this.code = this.code.replace(/<!-.*->/, "");
    this.code = this.code.replace(/http/g, "https");
    this.code = this.code.replace(/(st\d+)/g, `${uniqueID}_$1`);
    /*
      1. removes everything before 'svg'
      2. removes any comments as they will be displayed in the inspector
      3. changes http to https for otherwise there'll be security issues, don't ask me why.
        • xmlns="https://www.w3.org/2000/svg"
        • xmlns:xlink="https://www.w3.org/1999/xlink"
      4. adding some unique css keys to the css file. It is looking illustrator specific css, format as follows, '\.st\d+'
     */
    const temp = RegExp(/viewbox="([\d\s.]*)"/i).exec(this.code);
    const part = temp[1].split(" ");
    this.width = parseInt(part[2], 10);
    this.height = parseInt(part[3], 10);
    this.code = this.code.replace(
      /viewbox/,
      'width="100%" height="100%" viewbox'
    );
    this.div.innerHTML = this.code;
  }

  set palette(args) {
    const pal = this.palette;
    for (let i = 0; i < args.length; i++) {
      /* istanbul ignore else */
      if (pal[i]) {
        this.code = this.code.replace(RegExp(pal[i], "g"), args[i]);
      }
    }
    this.div.innerHTML = this.code;
  }

  get palette() {
    const pat = new RegExp(/#[a-zA-Z0-9]{6}/gi);
    const out = this.code.match(pat);
    return out;
  }
}
