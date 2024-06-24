(function () {
  const {
    Base,
    Align,
    Apply,
    Border,
    InvisibleButton,
    Remove,
    Sprite,
    Svg,
    Textfield,
    Convert,
    Create,
    Detect,
    EventManager,
    Load,
    UA,
  } = BB;
  var root;
  Base.traceLog = true;

  function getItem(name) {
    return Base.byId(name).src;
  }
  function init() {
    root = new Sprite("root");
    root.width = 970;
    root.height = 250;
    root.backgroundColor = "black";
    root.overflow = "hidden";
    root.addToBody();
    createAd();
  }
  function createAd() {
    Load.data(
      [getItem("clouds"), getItem("title"), getItem("dvd")],
      assetsLoaded
    );
  }

  function assetsLoaded(data) {
    var border = new Border({ color: "black", thickness: 1 });
    var inv = new InvisibleButton(970, 250, "inv", false);
    var cta = new Sprite("cta");
    var ctaText = new Textfield("ctaText");
    var caption = new Textfield("caption");

    caption.text = "On Sale Now!";
    caption.color = "black";
    caption.fontSize = "48px";
    caption.fontFamily = "Helvetica Neue, Arial, sans-serif";
    caption.left = "670px";
    caption.top = "0px";
    caption.width = "250px";
    caption.p.style.textDectoration = "bold";
    caption.p.style.textAlign = "center";
    caption.noSelect(true);

    ctaText.text = "Buy Now";
    ctaText.color = "white";
    ctaText.fontSize = "16px";
    ctaText.fontFamily = "Helvetica Neue, Arial, sans-serif";
    ctaText.left = "43px";
    ctaText.top = "-9px";
    ctaText.noSelect(true);

    cta.style = {
      left: "720px",
      top: "182px",
      borderRadius: "30px",
      width: "150px",
      height: "33px",
      backgroundColor: "#b13e52",
      border: "1px solid white",
    };

    data.dvd.x = 485;
    data.dvd.y = 25;
    data.clouds.right = 0;

    root.addChild(data.clouds);
    root.addChild(data.title);
    root.addChild(data.dvd);
    root.addChild(border);
    root.addChild(caption);

    cta.addChild(ctaText);
    inv.addChild(cta);
    root.addChild(inv);

    addListener(inv);
  }

  function addListener(inv) {
    inv.addEventListener("click", function () {
      window.open(clickTag, "_blank");
    });
  }
  init();
})();
