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
  let root;
  function init() {
    root = new Sprite(Base.byId("root"));
    root.style = {
      margin: "auto",
      height: "1024px",
    };
  }
  init();
})();
