import Sprite from "./Sprite";
import Align from "./Align";

export default class Apply {
  static alignHelper(targetInit, referenceInit, typeInit) {
    let scale;
    let ret = {};
    const contain = targetInit.parentObject === referenceInit;
    const reference = {
      x: contain ? 0 : referenceInit.x,
      y: contain ? 0 : referenceInit.y,
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
          x: referenceInit.width - targetInit.width + reference.x,
          y: reference.y,
        };
        break;
      case Align.BOTTOM_LEFT:
        ret = {
          x: reference.x,
          y: referenceInit.height - targetInit.height + reference.y,
        };
        break;
      case Align.BOTTOM_RIGHT:
        ret = {
          x: referenceInit.width - targetInit.width + reference.x,
          y: referenceInit.height - targetInit.height + reference.y,
        };
        break;
      case Align.CENTER:
        ret = {
          x: (referenceInit.width - targetInit.width) / 2 + reference.x,
          y: (referenceInit.height - targetInit.height) / 2 + reference.y,
        };
        break;
      case Align.FILL:
        ret = {
          x: reference.x,
          y: reference.y,
          width: referenceInit.width,
          height: referenceInit.height,
        };
        break;
      case Align.RATIO_SCALE_WIDTH:
      case Align.RATIO_SCALE_HEIGHT:
        scale =
          referenceInit[
            typeInit === Align.RATIO_SCALE_WIDTH ? "width" : "height"
          ] /
          targetInit[typeInit === Align.RATIO_SCALE_WIDTH ? "width" : "height"];
        ret = {
          width: scale * targetInit.width,
          height: scale * targetInit.height,
        };
        break;
      case Align.TOP_CENTER:
      case Align.CENTER_TOP:
        ret = {
          x: (referenceInit.width - targetInit.width) / 2 + reference.x,
          y: reference.y,
        };
        break;
      case Align.BOTTOM_CENTER:
      case Align.CENTER_BOTTOM:
        ret = {
          x: (referenceInit.width - targetInit.width) / 2 + reference.x,
          y: referenceInit.height - targetInit.height + reference.y,
        };
        break;
      case Align.CENTER_LEFT:
        ret = {
          x: reference.x,
          y: (referenceInit.height - targetInit.height) / 2 + reference.y,
        };
        break;
      case Align.CENTER_RIGHT:
        ret = {
          x: referenceInit.width - targetInit.width + reference.x,
          y: (referenceInit.height - targetInit.height) / 2 + reference.y,
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

  static align(target, reference, position = "", apply = true) {
    // let i;
    let tempProps = {};
    const hold = new Sprite("hold");
    const props = ["x", "y", "width", "height"];
    props.forEach((value) => {
      hold[value] = target[value];
    });
    /* istanbul ignore else */
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

  static firstChildId(sprite, id) {
    const { firstChild } = sprite.div;
    firstChild.id = id;
    return sprite;
  }

  static properties(sprite, obj) {
    if (Array.isArray(sprite)) {
      sprite.forEach((value, key) => {
        Object.assign(sprite[key], obj);
      });
      return sprite;
    }
    return Object.assign(sprite, obj);
  }

  static center(sprite, reference) {
    this.properties(sprite, {
      x: (reference.width - sprite.width) / 2,
      y: (reference.height - sprite.height) / 2,
    });
    return sprite;
  }
}
