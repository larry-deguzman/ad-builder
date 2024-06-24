import Sprite from "./Sprite";

export default class Textfield extends Sprite {
  type: string;
  p: HTMLParagraphElement;

  constructor($id: string, $type: string = "textfield") {
    super($id);
    this.p = document.createElement("p");
    this.type = $type;
    this.storage.div.appendChild(this.p);
  }

  noSelect(doNotSelect: boolean = true) {
    this.p.style.userSelect = doNotSelect ? "none" : "auto";
  }

  set text($text: string) {
    this.p.textContent = $text;
  }
  get text(): string | null {
    return this.p.textContent;
  }

  set color($color: string) {
    this.p.style.color = $color;
  }

  get color(): string {
    return this.p.style.color;
  }

  set fontSize($size: string) {
    this.p.style.fontSize = $size;
  }

  get fontSize(): string {
    return this.p.style.fontSize;
  }

  set fontFamily($font: string) {
    this.p.style.fontFamily = $font;
  }

  get fontFamily(): string {
    return this.p.style.fontFamily;
  }
}
