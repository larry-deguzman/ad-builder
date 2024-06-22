/* eslint max-len:0 */
// NOTE: These are the polyfills required throughout the project.
// Promise polyfill and object.assign for browser support.
import "core-js/features/promise";
import "core-js/stable/object/assign";
import "core-js/features/object/entries";
import "core-js/features/array/includes";
import "core-js/stable/array/from";

import Base from "../base/Base";
import Align from "../display/Align";
import Apply from "../display/Apply";
import Border from "../display/Border";
import InvisibleButton from "../display/InvisibleButton";
import Remove from "../display/Remove";
import Sprite from "../display/Sprite";
import Svg from "../display/Svg";
import Convert from "../math/Convert";
import Create from "../utils/Create";
import Detect from "../utils/Detect";
import EventManager from "../utils/EventManager";
import Load from "../utils/Load";
import UA from "../utils/UA";

// import GetQueryParams from "../utils/GetQueryParams";
type BuildingBlocks = {
  Base: typeof Base;
  Align: typeof Align;
  Apply: typeof Apply;
  Border: typeof Border;
  InvisibleButton: typeof InvisibleButton;
  Remove: typeof Remove;
  Sprite: typeof Sprite;
  Svg: typeof Svg;
  Convert: typeof Convert;
  Create: typeof Create;
  Detect: typeof Detect;
  EventManager: typeof EventManager;
  Load: typeof Load;
  UA: typeof UA;
};
declare global {
  interface Window {
    BB: BuildingBlocks;
  }
}
export default function exporter() {
  window.BB = {
    Base,
    Align,
    Apply,
    Border,
    InvisibleButton,
    Remove,
    Sprite,
    Svg,
    Convert,
    Create,
    Detect,
    EventManager,
    Load,
    UA,
  };
}
// GetQueryParams,
