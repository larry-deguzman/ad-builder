/**
 * This class is a conversion class that takes care of some of the more mundane math conversions.
 * @class Convert
 */

export default class Convert {
  static degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  static randomInt(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  static randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static doubleUp(num: number): number | string {
    const number = num.toString();
    return number.length === 1 ? `0${number}` : number;
  }
  // I need to update this method
  // I need to add a second parameter to this method that will the user to specify
  // the format of the time string
  static sixty($number: number): string {
    const number = Math.abs($number);
    const mod = $number < 0 ? "-" : "";
    let min = Math.floor(number / 60);
    let sec = Math.floor(number - min * 60);
    min = min.toString() === "NaN" ? 0 : min;
    sec = sec.toString() === "NaN" ? 0 : sec;
    return `${mod}${Convert.doubleUp(min)}:${Convert.doubleUp(sec)}`;
  }
}
