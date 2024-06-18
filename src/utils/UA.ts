/* eslint vars-on-top: 0, new-cap: 0, no-use-before-define: 0 */

type Browser = {
  name: string;
  version: number;
};

export default class UA {
  static getVersion(result: string[] | null): number {
    let ver: number = 0;
    if (result && result[1]) {
      ver = parseInt(result[1].replace(/_/g, "."), 10);
    }
    return ver;
  }

  static detectOS(argUserAgent: string | null): Browser {
    // Let's allow this special function to have more complexity than normal
    /* jshint maxcomplexity:false */
    let os: string = "other";
    let ver: number = 0;
    let tmp: RegExpExecArray | null;
    const userAgent: string = argUserAgent || navigator.userAgent.toString();

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
      version: ver,
    };
  }

  static checkMobileTabletDesktop(userAgentAtt: string | null): string {
    let ret: string = "desktop";
    const userAgent: string = userAgentAtt || navigator.userAgent.toLowerCase();
    const isMobile: boolean =
      /iphone|ipod|mobile|phone|blackberry|opera|mini|windows\sce|palm|iemobile/i.test(
        userAgent
      ) && !/ipad/i.test(userAgent);
    const isTablet: boolean =
      (/android|playbook|tablet|kindle|silk/i.test(userAgent) &&
        !/mobile/i.test(userAgent)) ||
      /ipad/i.test(userAgent);

    if (isMobile) {
      ret = "mobile";
    } else if (isTablet) {
      ret = "tablet";
    }
    return ret;
  }

  static checkBrowser(str: string, regex: RegExp): number {
    let version: number = 0;
    let m: RegExpMatchArray | null;

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

  static numberific(string: string): number {
    const m: RegExpMatchArray | null = string.match(/[0-9]+.?[0-9]*/);
    /* istanbul ignore else */
    if (m && m[0]) {
      return parseFloat(m[0]);
    }
    /* istanbul ignore next */
    return 0;
  }

  static detectCanvas(): boolean {
    const element: HTMLCanvasElement = document.createElement("canvas");
    const test: boolean = !!(element.getContext && element.getContext("2d"));
    return test;
  }

  static detectDragDrop(
    div: HTMLDivElement = document.createElement("div")
  ): boolean {
    /* istanbul ignore else */
    if ("draggable" in div) {
      return true;
    }
    if ("ondragstart" in div && "ondrop" in div) {
      return true;
    }
    return false;
  }

  static detectCanvasText(): boolean {
    const element: HTMLCanvasElement = document.createElement("canvas");
    const test = !!(
      element !== null &&
      this.canvas &&
      typeof element.getContext("2d")?.fillText === "function"
    );

    return test;
  }

  static detectAudio(
    element: HTMLAudioElement = document.createElement("audio")
  ): boolean {
    let test: boolean = false;
    let ogg: boolean | string = false;
    let mp3: boolean | string = false;
    let wav: boolean | string = false;

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

  static detectVideo(
    element: HTMLVideoElement = document.createElement("video")
  ): boolean {
    let test = false;
    let ogg: boolean | string = false;
    let h264: boolean | string = false;
    let h264B: boolean | string = false;
    let h264C: boolean | string = false;
    let webm: boolean | string = false;

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

  static get userAgent(): string {
    return navigator.userAgent.toString();
  }

  static get IE(): number {
    return this.checkBrowser(
      this.userAgent,
      /MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/
    );
  }

  static get edge(): number {
    return this.checkBrowser(this.userAgent, /Edge\/([0-9.]+)/);
  }

  static get firefox(): number {
    return this.checkBrowser(this.userAgent, /Firefox\/([0-9.]+)/);
  }

  static get safari(): number {
    return this.checkBrowser(this.userAgent, /Version\/([0-9.]+)\s?Safari/);
  }

  static get chrome(): number {
    return this.checkBrowser(this.userAgent, /Chrome\/([0-9.]+)/);
  }

  static get webkit(): number {
    return this.checkBrowser(this.userAgent, /AppleWebKit\/([0-9.]+)/);
  }

  static get OS(): Browser {
    return this.detectOS(this.userAgent);
  }

  // static get flash() { return this.detectFlash(); }
  static get isMobile(): boolean {
    return this.checkMobileTabletDesktop(null) === "mobile";
  }

  static get isTablet(): boolean {
    return this.checkMobileTabletDesktop(null) === "tablet";
  }

  /* HTML5 Tests */
  static get dragDrop(): boolean {
    return this.detectDragDrop();
  }

  static get video(): boolean {
    return this.detectVideo();
  }

  static get audio(): boolean {
    return this.detectAudio();
  }

  static get canvas(): boolean {
    return this.detectCanvas();
  }

  static get canvasText(): boolean {
    return this.detectCanvasText();
  }

  static get isHtml5Supported(): boolean | HTMLElement {
    return this.detectHTML5Supported(
      this.video,
      this.audio,
      this.canvas,
      this.canvasText
    );
  }

  static get currentBrowser(): Browser {
    return this.detectBrowser();
  }

  static detectBrowser(): Browser {
    /* istanbul ignore next */
    const browser: Browser = {
      name: "other",
      version: 0,
    };
    /* istanbul ignore next */
    if (this.IE) {
      browser.name = "MSIE";
      browser.version = this.IE;
    } else if (this.edge) {
      browser.name = "Edge";
      browser.version = this.edge;
    } else if (this.firefox) {
      browser.name = "FireFox";
      browser.version = this.firefox;
    } else if (this.safari) {
      browser.name = "Safari";
      browser.version = this.safari;
    } else if (this.chrome) {
      browser.name = "Chrome";
      browser.version = this.chrome;
    } else if (this.webkit) {
      browser.name = "WebKit";
      browser.version = this.webkit;
    }
    return browser;
  }

  static detectHTML5Supported(
    ...check: HTMLElement[] | boolean[]
  ): HTMLElement | boolean {
    // if any of the checks are false...it will retuen false
    // doing this for full coverage
    /* eslint arrow-body-style: 0 */
    return check.every((element) => {
      return element;
    });
  }

  static get browser(): Browser {
    return this.currentBrowser;
  }

  static get os(): Browser {
    return this.OS;
  }

  /**
   * Helper reference to document.documentElement
   */
  static get html(): HTMLElement {
    return document.documentElement;
  }

  static get ie(): number {
    return this.IE;
  }

  static get ATTRS(): { NAME: string } {
    return { NAME: "UA" };
  }
}
