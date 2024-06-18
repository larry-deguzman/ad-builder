import Sprite from "./Sprite";

export default class InvisibleButton extends Sprite {
  constructor(
    width: number,
    height: number,
    id: string,
    test: boolean = false
  ) {
    super(id);
    this.width = width;
    this.height = height;
    this.buttonMode = "pointer";
    this.backgroundColor = `rgba(0, 255, 255, ${test ? 0.5 : 0})`;
    this.div.innerHTML = test ? id : "";
  }
}
