(function () {
  let {
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
  } = window.BB;

  function init() {
    Load.multipleScripts(["./js/root.js", "./js/header.js"], display, true);
  }

  function display() {
    console.log("display");
  }

  init();
})();
