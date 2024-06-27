import Sprite from "./Sprite";

export default class Remove {
  /**
   *
   * @private
   */
  private constructor() {}
  static child(element: Sprite): void {
    element.storage.parent.removeChild(element);
  }
  static children(element: Sprite, removeSelf: boolean = false): void {
    while (element.div.firstChild) {
      if (element.div.firstChild) {
        element.div.removeChild(element.div.firstChild);
      }
    }
    if (removeSelf) {
      Remove.child(element);
    }
  }
}
