/* eslint vars-on-top: 0, new-cap: 0, no-use-before-define: 0 */
/**
 * User Agent Detection - UA
 *     var env = UA;
 *     env.browser;
 *     env.os;
 *     env.flash;
 *     env.isHtml5Supported;
 *     env.html;
 *
 * @class UA
 */
export default class UA {
  static getVersion(result) {
    let ver = 0;
    if (result && result[1]) {
      ver = result[1].replace(/_/g, ".");
    }
    return ver;
  }

  /**
   * Detect current OS
   * @function detectOS
   * @returns {Object} {name: string, version: number}
   */
  static detectOS(argUserAgent) {
    // Let's allow this special function to have more complexity than normal
    /* jshint maxcomplexity:false */
    let os = "other";
    let ver = 0;
    let tmp;
    const userAgent = argUserAgent || navigator.userAgent.toString();

    if (/windows|win32/i.test(userAgent) && !/windows phone/i.test(userAgent)) {
      os = "windows";
    } else if (/macintosh|mac_powerpc/i.test(userAgent)) {
      os = "macintosh";
    } else if (/iphone|ipod|ipad/i.test(userAgent)) {
      os = "ios";
      tmp = /OS ([0-9_]+)/i.exec(userAgent);
      ver = this.getVersion(tmp);
    } else if (/windows phone/i.test(userAgent)) {
      os = "Windows Phone";
      tmp = /Windows Phone [OS]*\s*([0-9.]+)/.exec(userAgent);
      ver = this.getVersion(tmp);
    } else if (/android/i.test(userAgent)) {
      os = "android";
      tmp = /Android\s*([0-9.]+)/.exec(userAgent);
      if (!tmp) {
        tmp = /Android;\s*([0-9.]+)/.exec(userAgent);
      }
      ver = this.getVersion(tmp);
    } else if (/linux/i.test(userAgent)) {
      os = "linux";
    } else if (/webOS/i.test(userAgent)) {
      os = "webOS";
    } else if (/BlackBerry/i.test(userAgent)) {
      os = "BlackBerry";
    } else if (/Opera Mini/i.test(userAgent)) {
      os = "Opera Mini";
    }

    return {
      name: os,
      version: parseInt(ver, 10),
    };
  }

  /**
   * Detect Mobiles
   * @function checkMobile
   * @returns {Boolean}
   */
  static checkMobile(userAgentAtt) {
    const userAgent = userAgentAtt || navigator.userAgent.toLowerCase();
    const ismobile =
      /iphone|ipod|mobile|phone|blackberry|opera|mini|windows\sce|palm|iemobile/i.test(
        userAgent
      ) && !/ipad/i.test(userAgent);

    return ismobile;
  }

  /**
   * Detect Tablets
   * @function checkTablet
   * @returns {Boolean}
   */
  static checkTablet(userAgentAtt) {
    const userAgent = userAgentAtt || navigator.userAgent.toLowerCase();
    const istablet =
      (/android|playbook|tablet|kindle|silk/i.test(userAgent) &&
        !/mobile/i.test(userAgent)) ||
      /ipad/i.test(userAgent);

    return istablet;
  }

  /**
   * Identifies the browser in use.
   * In case the browser is being used, returns the browser version, it returns 0 otherwise.
   * @function checkBrowser
   * @param {String} str navigator.userAgent.toString()
   * @param {String} regex Regex used to identify a specific browser version
   * @returns {Number} Browser version or 0
   */
  static checkBrowser(str, regex) {
    let version = 0;
    let m;

    /* istanbul ignore else  */
    if (typeof str === "string") {
      m = str.match(regex);
      /* istanbul ignore else  */
      if (m && (m[1] || m[2])) {
        version = this.numberific(m[1] || m[2]);
      }
    }
    return version;
  }

  static numberific(string) {
    const m = string.match(/[0-9]+.?[0-9]*/);
    /* istanbul ignore else */
    if (m && m[0]) {
      return parseFloat(m[0]);
    }
    /* istanbul ignore next */
    return 0;
  }

  /**
   * Detects if Canvas is supported by browser
   * @function detectCanvas
   * @returns {Boolean}
   */
  static detectCanvas() {
    const element = document.createElement("canvas");
    const test = !!(element.getContext && element.getContext("2d"));
    return test;
  }

  /**
   * Detects if Drag and Drop is supported by browser
   * @function detectDragDrop
   * @returns {Boolean}
   */
  static detectDragDrop(div = document.createElement("div")) {
    /* istanbul ignore else */
    if ("draggable" in div) {
      return true;
    }
    if ("ondragstart" in div && "ondrop" in div) {
      return true;
    }
    return false;
  }

  /**
   * Detects if canvas and text on canvas is supported by browser
   * @function detectCanvasText
   * @returns {Boolean}
   */
  static detectCanvasText() {
    const element = document.createElement("canvas");
    const test = !!(
      this.canvas && typeof element.getContext("2d").fillText === "function"
    );

    return test;
  }

  /**
   * Detects if playing audio is supported by browser
   * @function detectAudio
   * @returns {Boolean}
   */
  static detectAudio(element = document.createElement("audio")) {
    let test = false;
    let ogg = false;
    let mp3 = false;
    let wav = false;

    /* istanbul ignore if */
    if ("canPlayType" in element) {
      ogg = element
        .canPlayType('audio/ogg; codecs="vorbis"')
        .replace(/^no$/, "");
      mp3 = element.canPlayType("audio/mpeg;").replace(/^no$/, "");
      wav = element.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "");
      if (ogg !== "" || mp3 !== "" || wav !== "") {
        test = true;
      }
    }
    return test;
  }

  /**
   * Detects if native video playing is supported by browser
   * @function detectVideo
   * @returns {Boolean}
   */
  static detectVideo(element = document.createElement("video")) {
    let test = false;
    let ogg = false;
    let h264 = false;
    let h264B = false;
    let h264C = false;
    let webm = false;

    /* istanbul ignore next */
    if ("canPlayType" in element) {
      ogg = element
        .canPlayType('video/ogg; codecs=theora"')
        .replace(/^no$/, "");
      h264 = element
        .canPlayType('video/mp4; codecs="avc1.42E01E"')
        .replace(/^no$/, "");
      h264B = element
        .canPlayType('video/mp4; codecs="mp4v.20.8"')
        .replace(/^no$/, "");
      h264C = element
        .canPlayType('video/mp4; codecs="mp4a.40.2"')
        .replace(/^no$/, "");
      webm = element
        .canPlayType('video/webm; codecs="vp8, vorbis"')
        .replace(/^no$/, "");

      if (
        ogg !== "" ||
        h264 !== "" ||
        h264B !== "" ||
        h264C !== "" ||
        webm !== ""
      ) {
        test = true;
      }
    }
    return test;
  }

  static get userAgent() {
    return navigator.userAgent.toString();
  }

  static get IE() {
    return this.checkBrowser(
      this.userAgent,
      /MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/
    );
  }

  static get edge() {
    return this.checkBrowser(this.userAgent, /Edge\/([0-9.]+)/);
  }

  static get firefox() {
    return this.checkBrowser(this.userAgent, /Firefox\/([0-9.]+)/);
  }

  static get safari() {
    return this.checkBrowser(this.userAgent, /Version\/([0-9.]+)\s?Safari/);
  }

  static get chrome() {
    return this.checkBrowser(this.userAgent, /Chrome\/([0-9.]+)/);
  }

  static get webkit() {
    return this.checkBrowser(this.userAgent, /AppleWebKit\/([0-9.]+)/);
  }

  static get OS() {
    return this.detectOS(this.userAgent);
  }

  // static get flash() { return this.detectFlash(); }
  static get isMobile() {
    return this.checkMobile();
  }

  static get isTablet() {
    return this.checkTablet();
  }

  /* HTML5 Tests */
  static get dragDrop() {
    return this.detectDragDrop();
  }

  static get video() {
    return this.detectVideo();
  }

  static get audio() {
    return this.detectAudio();
  }

  static get canvas() {
    return this.detectCanvas();
  }

  static get canvasText() {
    return this.detectCanvasText();
  }

  static get isHtml5Supported() {
    return this.detectHTML5Supported(
      this.video,
      this.audio,
      this.canvas,
      this.canvasText
    );
  }

  static get currentBrowser() {
    return this.detectBrowser();
  }

  /**
   * Detects browser
   * @function detectBrowser
   * @returns {Object} {name: string, version: number}
   */
  static detectBrowser() {
    /* istanbul ignore next */
    this.browser_t = {
      name: "other",
      version: 0,
    };
    /* istanbul ignore next */
    if (this.IE) {
      this.browser_t.name = "MSIE";
      this.browser_t.version = this.IE;
    } else if (this.edge) {
      this.browser_t.name = "Edge";
      this.browser_t.version = this.edge;
    } else if (this.firefox) {
      this.browser_t.name = "FireFox";
      this.browser_t.version = this.firefox;
    } else if (this.safari) {
      this.browser_t.name = "Safari";
      this.browser_t.version = this.safari;
    } else if (this.chrome) {
      this.browser_t.name = "Chrome";
      this.browser_t.version = this.chrome;
    } else if (this.webkit) {
      this.browser_t.name = "WebKit";
      this.browser_t.version = this.webkit;
    }
    return this.browser_t;
  }

  static detectHTML5Supported(...check) {
    // if any of the checks are false...it will retuen false
    // doing this for full coverage
    /* eslint arrow-body-style: 0 */
    return check.every((element) => {
      return element;
    });
  }

  static get browser() {
    return this.currentBrowser;
  }

  static get os() {
    return this.OS;
  }

  /**
   * Helper reference to document.documentElement
   */
  static get html() {
    return document.documentElement;
  }

  static get ie() {
    return this.IE;
  }

  static get ATTRS() {
    return { NAME: "UA" };
  }
}
