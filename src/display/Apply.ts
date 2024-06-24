import Sprite from "./Sprite";
import Align from "./Align";

export default class Apply {
  static alignHelper(
    targetInit: Sprite,
    referenceInit: Sprite,
    typeInit: string,
  ) {
    let scale;
    let ret = {};
    const contain = targetInit.storage.parent === referenceInit;
    const reference = {
      x: contain ? 0 : referenceInit.x,
      y: contain ? 0 : referenceInit.y,
    };
    const RI = {
      width: parseInt(referenceInit.width, 10),
      height: parseInt(referenceInit.height, 10),
    };
    const TI = {
      width: parseInt(targetInit.width, 10),
      height: parseInt(targetInit.height, 10),
    };

    switch (typeInit) {
      case Align.TOP_LEFT:
        ret = {
          x: reference.x,
          y: reference.y,
        };
        break;
      case Align.TOP_RIGHT:
        ret = {
          x: RI.width - TI.width + reference.x,
          y: reference.y,
        };
        break;
      case Align.BOTTOM_LEFT:
        ret = {
          x: reference.x,
          y: RI.height - TI.height + reference.y,
        };
        break;
      case Align.BOTTOM_RIGHT:
        ret = {
          x: RI.width - TI.width + reference.x,
          y: RI.height - TI.height + reference.y,
        };
        break;
      case Align.CENTER:
        ret = {
          x: (RI.width - TI.width) / 2 + reference.x,
          y: (RI.height - TI.height) / 2 + reference.y,
        };
        break;
      case Align.FILL:
        ret = {
          x: reference.x,
          y: reference.y,
          width: RI.width,
          height: RI.height,
        };
        break;
      /*
      case Align.RATIO_SCALE_WIDTH:
      case Align.RATIO_SCALE_HEIGHT:
        scale =
          referenceInit[
            parseInt((typeInit === Align.RATIO_SCALE_WIDTH ? "width" : "height"), 10)
          ] /
          targetInit[typeInit === Align.RATIO_SCALE_WIDTH ? "width" : "height"];
        ret = {
          width: scale * TI.width,
          height: scale * TI.height,
        };
        break;
        */
      case Align.TOP_CENTER:
      case Align.CENTER_TOP:
        ret = {
          x: (RI.width - TI.width) / 2 + reference.x,
          y: reference.y,
        };
        break;
      case Align.BOTTOM_CENTER:
      case Align.CENTER_BOTTOM:
        ret = {
          x: (RI.width - TI.width) / 2 + reference.x,
          y: RI.height - TI.height + reference.y,
        };
        break;
      case Align.CENTER_LEFT:
        ret = {
          x: reference.x,
          y: (RI.height - TI.height) / 2 + reference.y,
        };
        break;
      case Align.CENTER_RIGHT:
        ret = {
          x: RI.width - TI.width + reference.x,
          y: (RI.height - TI.height) / 2 + reference.y,
        };
        break;
      default:
        // defaulting to TOP LEFT
        ret = {
          x: reference.x,
          y: reference.y,
        };
        break;
    }
    Apply.properties(targetInit, ret);
    return ret;
  }

  static align(target: Sprite, reference: Sprite, position = "", apply = true) {
    // let i;
    let tempProps = {};
    const hold = new Sprite("hold");
    hold.x = target.x;
    hold.y = target.y;
    hold.width = target.width;
    hold.height = target.height;

    if (typeof position === "string") {
      if (apply) {
        tempProps = Apply.alignHelper(target, reference, position);
      } else {
        tempProps = Apply.alignHelper(hold, reference, position);
      }
    }
    return {
      target,
      properties: tempProps,
    };
  }

  static properties(sprite: Sprite, obj: object) {
    return Object.assign(sprite, obj);
  }

  static center(sprite: Sprite, reference: Sprite) {
    this.properties(sprite, {
      x: (parseInt(reference.width, 10) - parseInt(sprite.width, 10)) / 2,
      y: (parseInt(reference.height, 10) - parseInt(sprite.height, 10)) / 2,
    });
    return sprite;
  }
}
