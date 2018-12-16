const animate = (() => {
  "use strict";

  const defaults = {
    delay: 0,
    duration: 400,
    easing: "ease"
  };


  // array utils ===================================================================================

  const head = (arr) => {
    return arr[0];
  };

  const tail = (arr) => {
    return arr.slice(1);
  };

  const contains = (() => {
    return Array.prototype.includes
      ? (arr, value) => arr.includes(value)
      : (arr, value) => arr.some(el => el === value)
  })();

  const toArray = (obj) => {
    if (obj.nodeType) {
      return [obj];
    }
    if (Array.isArray(obj)) {
      return obj;
    }
    return [...obj];
  };


  // params utils ==================================================================================

  const requireParams = (func) => {
    return params => {
      if (typeof params != "object") return;
      func(params);
    };
  };

  const getParamsEl = (el) => {
    return toArray(typeof el == "string" ? selectElements(el) : el);
  };


  // misc utils ====================================================================================

  const selectElements = (selector, context = document) => {
    if (/^[\#.]?[\w-]+$/.test(selector)) {
      if (head(selector) == ".") {
        return context.getElementsByClassName(tail(selector));
      }
      if (head(selector) == "#") {
        return context.getElementById(tail(selector));
      }
      return context.getElementsByTagName(selector);
    }
    return context.querySelectorAll(selector);
  };

  const hasUnit = (value) => {
    return /\D$/.test(value);
  };


  // transition ====================================================================================

  const setTransition = (() => {
    const addUnit = (value) => {
      if (hasUnit(value)) {
        return value;
      }
      return value + "ms";
    };
    return (el, params) => {
      var transition = {
        "property": "opacity," + transformProperty(),
        "duration": addUnit(params.duration || defaults.duration),
        "timing-function": params.easing || defaults.easing,
        "delay": addUnit(params.delay || defaults.delay)
      };
      Object.keys(transition).forEach((prop) => {
        el.style["transition-" + prop] = transition[prop];
      });
    };
  })();

  const clearTransition = (params) => {
    const clearListener = (event) => {
      event.target.removeEventListener("transitionend", clearListener);
      if (!params.complete) return;
      params.complete.call(event.target);
    };
    return clearListener;
  };


  // opacity =======================================================================================

  const setOpacity = (el, params) => {
    if (params.opacity == undefined) return;
    el.style.opacity = params.opacity;
  };


  // transform =====================================================================================

  const transformProperty = (() => {
    var transform;
    return () => {
      if (!transform) {
        transform = "transform" in document.body.style ? "transform" : "-webkit-transform";
      }
      return transform;
    };
  })();

  const isTransform = (() => {
    const ignore = ["complete", "el", "opacity"].concat(Object.keys(defaults));
    return (key) => !contains(ignore, key);
  })();

  const getTransformFunctions = (params) => {
    return Object.keys(params).filter((key) => {
      return isTransform(key);
    });
  };

  // polyfill requestAnimationFrame

  (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
  }());

  const setTransform = (() => {
    const addUnit = (transformFunction, value) => {
      if (hasUnit(value) || /scale/.test(transformFunction)) {
        return value;
      }
      if (/rotate|skew/.test(transformFunction)) {
        return value + "deg";
      }
      return value + "px";
    };
    return (el, params) => {
      const transforms = getTransformFunctions(params);
      if (!transforms.length) return;
      el.style[transformProperty()] = transforms.map((func) => {
        return func + "(" + addUnit(func, params[func]) + ")";
      }).join(" ");
    };
  })();


  // init ==========================================================================================

  const setStyle = (params) => {
    return (el) => {
      // wait for the next frame
      requestAnimationFrame(() => {
        [setTransition, setOpacity, setTransform].forEach((func) => {
          func(el, params);
        });
      });
      el.addEventListener("transitionend", clearTransition(params));
    };
  };

  return requireParams((params) => {
    getParamsEl(params.el).forEach(setStyle(params));
  });
})();

export default animate;