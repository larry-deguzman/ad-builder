import Sprite from "./Sprite";

export default class InvisibleButton extends Sprite {
  constructor(width, height, id, test = false) {
    super(id);
    this.width = width;
    this.height = height;
    this.buttonMode = true;
    this.backgroundColor = `rgba(0, 255, 255, ${test ? 0.5 : 0})`;
    this.div.innerHTML = test ? id : "";
  }
}
