/* eslint no-console: 0, class-methods-use-this: 0 */
type MixedArray = (string | number | boolean)[];
/**
 * @module Base
 */
export default class Base {
  /**
   * @private
   */
  private constructor() {}
  /**
   *
   * @param element This is the string id of the element to be returned.
   * @returns HTMLElement | null
   * ```typescript
   * var myElement = Base.byId('elementId');
   * myElement.style.color = 'red';
   * ```
   */
  static byId(element: string): HTMLElement | null {
    return document.getElementById(element);
  }
  /**
   *
   * @param args This is an array of strings that you wish to be console logged.
   * ```typescript
   * Base.trace('Hello World');
   * // or
   * window.trace = Base.trace;
   * trace('Hello', 'World');
   * ```
   */
  static trace(...args: MixedArray) {
    if (this.traceLog) {
      console.log(...args);
    }
  }
  /**
   * @property traceLog This property represents the boolean that will be used for trace. Default is false.
   * ```typescript
   * Base.traceLog = true;
   * ```
   */
  static traceLog: boolean = false;

  /**
   *
   * @returns Boolean Will return true if the screen density is 1x. Will return false if the pixel density is greater than 1x.
   * ```typescript
   * var screenDensity = Base.isRetina();
   * ```
   */
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
