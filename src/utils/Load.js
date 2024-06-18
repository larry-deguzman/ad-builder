import Sprite from "../display/Sprite";
import SVG from "../display/Svg";

/**
 * This class is meant for loading a single item into your application. You can load the following types of files:
 * @class Load
 * <ul>
 *  <li>png</li>
 *  <li>jpeg</li>
 *  <li>jpg</li>
 *  <li>gif</li>
 *  <li>xml</li>
 *  <li>json</li>
 *  <li>txt</li>
 *  <li>text</li>
 * </ul>
 */

export default class Load {
  static get imageRX() {
    return [
      ["image", RegExp("jpeg$", "i")],
      ["image", RegExp("jpg$", "i")],
      ["image", RegExp("gif$", "i")],
      ["image", RegExp("png$", "i")],
      ["svg", RegExp("svg$", "i")],
    ];
  }

  static getName(source) {
    let name = source.split("?")[0].split("/");
    name = name[name.length - 1];
    name = name.replace(/\..*$/, "");
    return name;
  }

  static getType(source) {
    let ret = "text";
    this.imageRX.some((element) => {
      let stop = false;
      const [type, rxp] = element;
      let name = source.split("?")[0].split("/");
      name = name[name.length - 1];
      if (rxp.test(name)) {
        ret = type;
        stop = true;
      }
      return stop;
    });
    return ret;
  }

  static data(source, callbackRef, autoPopulate = true) {
    const originalIsAnArray = Array.isArray(source);
    const src = Array.isArray(source) ? source : [source];
    const callback = typeof callbackRef === "function" ? callbackRef : () => {};
    const prom = [];

    src.forEach((url) => {
      const obj = {
        url,
        name: this.getName(url),
        type: this.getType(url),
      };

      if (obj.type === "image") {
        prom.push(this.promiseImage(obj));
      } else {
        prom.push(this.promiseText(obj));
      }
    });

    Promise.all(prom).then((res) => {
      const ret = autoPopulate ? {} : [];
      res.forEach((value) => {
        switch (value.type) {
          case "image":
            {
              const mc = new Sprite(value.name);
              if (value.data !== null) {
                mc.image = value.data;
              }
              if (autoPopulate) {
                ret[value.name] = mc;
              } else {
                ret.push(value.data);
              }
            }
            break;
          case "svg":
            if (autoPopulate) {
              ret[value.name] = new SVG(value.name, value.data);
            } else {
              ret.push(value.data);
            }
            break;
          default:
            if (autoPopulate) {
              ret[value.name] = value.data;
            } else {
              ret.push(value.data);
            }
        }
      });
      if (Array.isArray(ret) === true) {
        if (originalIsAnArray === true) {
          callback(ret);
        } else {
          callback(ret[0]);
        }
      } else if (typeof ret === "object") {
        if (originalIsAnArray === true) {
          callback(ret);
        } else {
          const [[, value]] = Object.entries(ret);
          callback(value);
        }
      }
    });
  }

  static promiseImage(passedObj) {
    const obj = typeof passedObj === "object" ? passedObj : {};
    return new Promise((resolve) => {
      const img = new window.Image();
      /* eslint no-use-before-define: 0 */
      function removeListeners(event) {
        event.target.removeEventListener("load", loaded);
        event.target.removeEventListener("error", error);
      }
      function loaded(event) {
        removeListeners(event);
        obj.data = img;
        obj.error = null;
        resolve(obj);
      }
      function error(event) {
        removeListeners(event);
        obj.data = null;
        obj.error = Error(`Error loading: ${obj.url}`);
        resolve(obj);
      }

      img.addEventListener("load", loaded);
      img.addEventListener("error", error);
      img.src = obj.url;
    });
  }

  static promiseText(passedObj) {
    const obj = passedObj;
    return new Promise((resolve) => {
      const client = new XMLHttpRequest();
      const errorHandler = () => {
        obj.data = null;
        obj.error = Error(`Error loading: ${obj.url}`);
        return resolve(obj);
      };
      client.addEventListener("error", errorHandler);
      client.onreadystatechange = () => {
        if (client.readyState === 4) {
          if (client.status === 200) {
            obj.data = client.responseText;
            obj.error = false;
            resolve(obj);
          } else {
            obj.data = null;
            obj.error = Error(`Error loading: ${obj.url}`);
            resolve(obj);
          }
        }
      };
      client.open("GET", obj.url);
      client.send();
    });
  }

  static script(urlRef, callbackRef, config = {}) {
    const url = urlRef !== null && urlRef !== undefined ? urlRef : "";
    // allows for loading css as well as js
    const elementType = url.indexOf(".css") > -1 ? "link" : "script";
    const scriptType =
      elementType === "script" ? "text/javascript" : "text/css";

    const allowedUrl = true; // urlAllowedListCheck(url);
    const callback =
      callbackRef !== null && callbackRef !== undefined
        ? callbackRef
        : function noop() {};
    const { meta } = config;
    if (allowedUrl === false || url === null || url === undefined) {
      callback({
        script: null,
        meta: { error: "Missing URL field OR url now allowed." },
      });
      return null;
    }
    const script = document.createElement(elementType);
    if (typeof meta === "object") {
      Object.keys(meta).forEach((key) => {
        script.setAttribute(`data-${key}`, meta[key]);
      });
    }

    script.type = scriptType;

    // js only
    if (elementType === "script") {
      if (scriptType === "") {
        // only required for IE <9
        script.onreadystatechange = function stateChanged() {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback({ script, meta });
          }
        };
      } else {
        // Others
        script.onload = () => {
          callback({ script, meta });
        };
      }
      script.src = url;
    } else {
      // css files only
      script.setAttribute("rel", "stylesheet");
      script.setAttribute("type", "text/css");
      script.setAttribute("href", url);
      script.onload = () => {
        callback({ script, meta });
      };
    }

    if (config.autoAttach === false) {
      return script;
    }

    // for stage format only, the CSS needs to go to top
    // // TODO: right now only stage loads css files, so can keep this. However, need to fix if/when other formats load css files.
    let scope = window;
    if (scriptType === "text/css" && config.addCSStoTop === true) {
      scope = isWindowAccessible(window.top) ? window.top : window;
    }

    scope.document.getElementsByTagName("head")[0].appendChild(script);
    return script;
  }

  static multipleScripts(scriptArrayRef, callbackRef, config = {}) {
    /*
     *load all scripts syncrounsly...laters depend on formers
     */
    const callback =
      callbackRef !== null && callbackRef !== undefined
        ? callbackRef
        : function noop() {};
    const arr = Array.isArray(scriptArrayRef)
      ? scriptArrayRef
      : [scriptArrayRef];
    let count = 0;
    function loadNextScript() {
      if (arr && arr[count] && typeof arr[count] === "string") {
        Load.loadScript(
          arr[count],
          () => {
            count++;
            if (count === arr.length) {
              callback();
            } else {
              loadNextScript();
            }
          },
          config
        );
      } else {
        callback();
      }
    }
    loadNextScript();
  }

  static loadScript(urlRef, callbackRef, config = {}) {
    const url = urlRef !== null && urlRef !== undefined ? urlRef : "";
    // allows for loading css as well as js
    const elementType = url.indexOf(".css") > -1 ? "link" : "script";
    const scriptType =
      elementType === "script" ? "text/javascript" : "text/css";

    const allowedUrl = true; // urlAllowedListCheck(url);
    const callback =
      callbackRef !== null && callbackRef !== undefined
        ? callbackRef
        : function noop() {};
    const { meta } = config;
    if (allowedUrl === false || url === null || url === undefined) {
      callback({
        script: null,
        meta: { error: "Missing URL field OR url now allowed." },
      });
      return null;
    }
    const script = document.createElement(elementType);
    if (typeof meta === "object") {
      Object.keys(meta).forEach((key) => {
        script.setAttribute(`data-${key}`, meta[key]);
      });
    }

    script.type = scriptType;

    // js only
    if (elementType === "script") {
      if (scriptType === "") {
        // only required for IE <9
        script.onreadystatechange = function stateChanged() {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback({ script, meta });
          }
        };
      } else {
        // Others
        script.onload = () => {
          callback({ script, meta });
        };
      }
      script.src = url;
    } else {
      // css files only
      script.setAttribute("rel", "stylesheet");
      script.setAttribute("type", "text/css");
      script.setAttribute("href", url);
      script.onload = () => {
        callback({ script, meta });
      };
    }

    if (config.autoAttach === false) {
      return script;
    }

    // for stage format only, the CSS needs to go to top
    // // TODO: right now only stage loads css files, so can keep this. However, need to fix if/when other formats load css files.
    let scope = window;
    if (scriptType === "text/css" && config.addCSStoTop === true) {
      scope = isWindowAccessible(window.top) ? window.top : window;
    }

    scope.document.getElementsByTagName("head")[0].appendChild(script);
    return script;
  }
}
