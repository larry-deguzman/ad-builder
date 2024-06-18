import Sprite from "../display/Sprite";
import SVG from "../display/Svg";

type Pack = {
  url: string;
  name: string;
  type: string;
  data?: HTMLImageElement | string | SVGElement | null;
};

export default class Load {
  static get imageRX(): [string, RegExp][] {
    return [
      ["image", RegExp("jpeg$", "i")],
      ["image", RegExp("jpg$", "i")],
      ["image", RegExp("gif$", "i")],
      ["image", RegExp("png$", "i")],
      ["svg", RegExp("svg$", "i")],
    ];
  }

  static getName(source: string): string {
    const name: string[] = Load.removeGetExtension(source).split("/");
    const string: string = name[name.length - 1];
    return string.replace(/\..*$/, "");
  }

  static removeGetExtension(source: string): string {
    const name: string[] = source.split("?");
    return name[0];
  }

  static getType(source: string): string {
    const file: string = Load.removeGetExtension(source);
    const ext: string = file
      .split(".")
      [file.split(".").length - 1].toLowerCase();
    let shouldSkip = false;
    let ret: string = "txt";
    this.imageRX.some((element) => {
      const [type, rxp] = element;
      if (rxp.test(ext) && !shouldSkip) {
        shouldSkip = true;
        ret = type;
      }
    });
    return ret;
  }

  static data(
    source: string | string[],
    callbackRef: Function,
    autoPopulate: boolean = true
  ): void {
    const originalIsAnArray = Array.isArray(source);
    const src = Array.isArray(source) ? source : [source];
    const callback = typeof callbackRef === "function" ? callbackRef : () => {};
    const prom: Promise<Pack>[] = [];

    src.forEach((url) => {
      const pack: Pack = {
        url,
        name: this.getName(url),
        type: this.getType(url),
      };

      if (pack.type === "image") {
        prom.push(this.promiseImage(pack));
      } else {
        prom.push(this.promiseText(pack));
      }
    });

    Promise.all(prom).then((packs) => {
      const retArr: any[] = [];
      const retObj: { [key: string]: any } = {};
      packs.forEach((pack) => {
        switch (pack.type) {
          case "image":
            if (autoPopulate) {
              const sprite = new Sprite(pack.name);
              if (pack.data !== null && pack.data instanceof HTMLImageElement) {
                sprite.image(pack.data);
              }
              retObj[pack.name] = sprite;
            } else {
              retArr.push(pack.data);
            }
            break;
          case "svg":
            if (autoPopulate) {
              retObj[pack.name] = new SVG(pack.name, pack.data as string);
            } else {
              retArr.push(pack.data);
            }
            break;
          default:
            if (autoPopulate) {
              retObj[pack.name] = pack.data;
            } else {
              retArr.push(pack.data);
            }
        }
      });
      if (autoPopulate) {
        // retObj is populated
        if (originalIsAnArray) {
          callback(retObj);
        } else {
          callback(retObj[0]);
        }
      } else {
        // autoPopulate is false, retArr is populated
        if (originalIsAnArray) {
          callback(retArr);
        } else {
          const [[, value]] = Object.entries(retArr);
          callback(value);
        }
      }
    });
  }

  static promiseImage(pack: Pack): Promise<Pack> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = pack.url;
      img.onload = () => resolve({ ...pack, data: img });
      img.onerror = reject;
    });
  }

  static promiseText(pack: Pack): Promise<Pack> {
    return new Promise((resolve) => {
      const client = new XMLHttpRequest();
      client.onreadystatechange = () => {
        if (client.readyState === 4) {
          if (client.status === 200) {
            pack.data = client.responseText;
            resolve(pack);
          } else {
            pack.data = null;
            resolve(pack);
          }
        }
      };
      client.open("GET", pack.url);
      client.send();
    });
  }

  static script(
    urlRef: string,
    callback: Function
  ): HTMLScriptElement | HTMLLinkElement {
    const url = urlRef;
    const elementType = RegExp(/\.css$/).test(url) ? "link" : "script";
    const script = document.createElement(elementType);
    script.type = elementType === "link" ? "text/css" : "text/javascript";

    // const { meta } = config;
    // if (typeof meta === "object") {
    //   Object.keys(meta).forEach((key) => {
    //     script.setAttribute(`data-${key}`, meta[key]);
    //   });
    // }

    if (elementType === "script") {
      script.onload = () => {
        callback(script);
      };
      (script as HTMLScriptElement).src = url;
    } else {
      // css files only
      script.setAttribute("rel", "stylesheet");
      script.setAttribute("type", "text/css");
      script.setAttribute("href", url);
      (script as HTMLLinkElement).onload = () => {
        callback(script);
      };
    }
    // if (config.autoAttach === false) {
    //   return script;
    // }
    // for stage format only, the CSS needs to go to top
    // // TODO: right now only stage loads css files, so can keep this. However, need to fix if/when other formats load css files.
    // let scope = window;
    // if (scriptType === "text/css" && config.addCSStoTop === true) {
    //   scope = isWindowAccessible(window.top) ? window.top : window;
    // }
    window.document.getElementsByTagName("head")[0].appendChild(script);
    return script;
  }

  static multipleScripts(scriptArray: string[], callback: Function): void {
    let count = 0;
    function loadNextScript() {
      if (
        scriptArray &&
        scriptArray[count] &&
        typeof scriptArray[count] === "string"
      ) {
        Load.loadScript(scriptArray[count], () => {
          count++;
          if (count === scriptArray.length) {
            callback();
          } else {
            loadNextScript();
          }
        });
      } else {
        callback(scriptArray);
      }
    }
    loadNextScript();
  }

  static loadScript = this.script;
  static loadCSS = this.script;
}
