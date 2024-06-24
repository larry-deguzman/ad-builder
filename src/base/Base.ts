/* eslint no-console: 0, class-methods-use-this: 0 */
type MixedArray = (string | number | boolean)[];

export default class Base {
  static byId(element: string): HTMLElement | null {
    return document.getElementById(element);
  }
  static traceLog: boolean = false;

  static trace(...args: MixedArray) {
    if (this.traceLog) {
      console.log(...args);
    }
  }

  static isRetina(): boolean {
    const mediaQuery =
      "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
    return false;
  }
}
