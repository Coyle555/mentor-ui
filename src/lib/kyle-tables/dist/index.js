'use strict';



function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = require('prop-types');
var PropTypes__default = _interopDefault(PropTypes);
var classNames = _interopDefault(require('classnames'));
var lodash = require('lodash');
var Stickyfill = _interopDefault(require('stickyfilljs'));
var reactDom = require('react-dom');
var ReactTooltip = _interopDefault(require('react-tooltip'));
var Tether = _interopDefault(require('react-tether'));
var onClickOutside = _interopDefault(require('react-onclickoutside'));
var StructuredQuery = _interopDefault(require('structured-query'));
var reactDnd = require('react-dnd');
var reactIntl = require('react-intl');
var mentorInputs = require('mentor-inputs');
var reactColor = require('react-color');
var Dropzone = _interopDefault(require('react-dropzone'));
require('fuzzy');
var InsertForm = _interopDefault(require('insert-popup-form'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */


  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }

  return (
    /** @class */
    function () {
      function class_1() {
        this.__entries__ = [];
      }

      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function get() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      /**
       * @param {*} key
       * @returns {*}
       */

      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */


      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);

        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype["delete"] = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);

        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */


      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */


      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }

        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };

      return class_1;
    }()
  );
}();
/**
 * Detects whether window and document objects are available in current environment.
 */


var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

var global$1 = function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }

  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  } // eslint-disable-next-line no-new-func


  return Function('return this')();
}();
/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */


var requestAnimationFrame$1 = function () {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }

  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
}(); // Defines minimum timeout before adding a trailing call.


var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */

function throttle(callback, delay) {
  var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */

  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }

    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */


  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */


  function proxy() {
    var timeStamp = Date.now();

    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      } // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.


      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }

    lastCallTime = timeStamp;
  }

  return proxy;
} // Minimum delay before invoking the update of observers.


var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */

var ResizeObserverController =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */


  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    } // Add listeners if they haven't been added yet.


    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */


  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller has no connected observers.


    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */


  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */


  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return observer.gatherActive(), observer.hasActive();
    }); // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.


    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */


  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */


  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */


  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
}();
/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */


var defineConfigurable = function defineConfigurable(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }

  return target;
};
/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */


var getWindowOf = function getWindowOf(target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
  // provided element.

  return ownerGlobal || global$1;
}; // Placeholder of an empty content rectangle.


var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */

function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */


function getBordersSize(styles) {
  var positions = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }

  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */


function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};

  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }

  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */


function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */


function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.

  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }

  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.

  var width = toFloat(styles.width),
      height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).

  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  } // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.


  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


var isSVGGraphicsElement = function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  } // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens


  return function (target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
  };
}();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */


function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }

  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */


function createReadOnlyRect(_a) {
  var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */


function createRectInit(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */


var ResizeObservation =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */


  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */


  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };

  return ResizeObservation;
}();

var ResizeObserverEntry =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }

  return ResizeObserverEntry;
}();

var ResizeObserverSPI =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return;
    }

    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this); // Force the update of observations.

    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return;
    }

    observations["delete"](target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;

    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }

    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */


  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };

  return ResizeObserverSPI;
}(); // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.


var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */

var ResizeObserver =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.');
    }

    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }

  return ResizeObserver;
}(); // Expose public methods of ResizeObserver.


['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;

    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }

  return ResizeObserver;
}();

var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */

var now = function now() {
  return root.Date.now();
};

/** Built-in value references. */

var _Symbol = root.Symbol;

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

/** Error message constants. */

var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/** Error message constants. */

var FUNC_ERROR_TEXT$1 = 'Expected a function';
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */

function throttle$1(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var listHandle = {
  debounce: debounce,
  throttle: throttle$1
};
var getHandle = function getHandle(type) {
  return listHandle[type];
};
var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
var isSSR = function isSSR() {
  return typeof window === 'undefined';
};
var isDOMElement = function isDOMElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
};

function _typeof$1(obj) {
  if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
    _typeof$1 = function _typeof$1(obj) {
      return _typeof(obj);
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

var ChildWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits$1(ChildWrapper, _PureComponent);

  function ChildWrapper() {
    _classCallCheck$1(this, ChildWrapper);

    return _possibleConstructorReturn$1(this, _getPrototypeOf$1(ChildWrapper).apply(this, arguments));
  }

  _createClass$1(ChildWrapper, [{
    key: "render",
    value: function render() {
      // eslint-disable-next-line react/prop-types
      return this.props.children;
    }
  }]);

  return ChildWrapper;
}(React.PureComponent);

function _typeof$2(obj) {
  if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
    _typeof$2 = function _typeof$1(obj) {
      return _typeof(obj);
    };
  } else {
    _typeof$2 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
    };
  }

  return _typeof$2(obj);
}

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$2(self);
}

function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$2(o);
}

function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}

function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$2(o, p);
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ResizeDetector =
/*#__PURE__*/
function (_PureComponent) {
  _inherits$2(ResizeDetector, _PureComponent);

  function ResizeDetector(props) {
    var _this;

    _classCallCheck$2(this, ResizeDetector);

    _this = _possibleConstructorReturn$2(this, _getPrototypeOf$2(ResizeDetector).call(this, props));

    _defineProperty$1(_assertThisInitialized$2(_this), "cancelHandler", function () {
      if (_this.resizeHandler && _this.resizeHandler.cancel) {
        // cancel debounced handler
        _this.resizeHandler.cancel();

        _this.resizeHandler = null;
      }
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "rafClean", function () {
      if (_this.raf && _this.raf.cancel) {
        _this.raf.cancel();

        _this.raf = null;
      }
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "toggleObserver", function (type) {
      var element = _this.getElement();

      if (!element || !_this.resizeObserver[type]) return;

      _this.resizeObserver[type](element);
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "getElement", function () {
      var _this$props = _this.props,
          querySelector = _this$props.querySelector,
          targetDomEl = _this$props.targetDomEl;
      if (isSSR()) return undefined;
      if (querySelector) return document.querySelector(querySelector);
      if (targetDomEl && isDOMElement(targetDomEl)) return targetDomEl; // eslint-disable-next-line react/no-find-dom-node

      var currentElement = _this.element && reactDom.findDOMNode(_this.element);
      if (!currentElement) return undefined;
      return currentElement.parentElement;
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "createUpdater", function () {
      _this.rafClean();

      _this.raf = rafSchd(function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        var onResize = _this.props.onResize;

        if (isFunction(onResize)) {
          onResize(width, height);
        }

        _this.setState({
          width: width,
          height: height
        });
      });
      return _this.raf;
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "createResizeHandler", function (entries) {
      var _this$state = _this.state,
          widthCurrent = _this$state.width,
          heightCurrent = _this$state.height;
      var _this$props2 = _this.props,
          handleWidth = _this$props2.handleWidth,
          handleHeight = _this$props2.handleHeight;
      if (!handleWidth && !handleHeight) return;

      var updater = _this.createUpdater();

      entries.forEach(function (entry) {
        var _ref2 = entry && entry.contentRect || {},
            width = _ref2.width,
            height = _ref2.height;

        var isWidthChanged = handleWidth && widthCurrent !== width;
        var isHeightChanged = handleHeight && heightCurrent !== height;
        var isSizeChanged = isWidthChanged || isHeightChanged;
        var shouldSetSize = !_this.skipOnMount && isSizeChanged && !isSSR();

        if (shouldSetSize) {
          updater({
            width: width,
            height: height
          });
        }

        _this.skipOnMount = false;
      });
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "onRef", function (el) {
      _this.element = el;
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "getRenderType", function () {
      var _this$props3 = _this.props,
          render = _this$props3.render,
          children = _this$props3.children;

      if (isFunction(render)) {
        return 'renderProp';
      }

      if (isFunction(children)) {
        return 'childFunction';
      }

      if (React.isValidElement(children)) {
        return 'child';
      }

      if (Array.isArray(children)) {
        return 'childArray';
      }

      return 'parent';
    });

    _defineProperty$1(_assertThisInitialized$2(_this), "getTargetComponent", function () {
      var _this$props4 = _this.props,
          render = _this$props4.render,
          children = _this$props4.children,
          nodeType = _this$props4.nodeType;
      var _this$state2 = _this.state,
          width = _this$state2.width,
          height = _this$state2.height;
      var childProps = {
        width: width,
        height: height
      };

      var renderType = _this.getRenderType();

      switch (renderType) {
        case 'renderProp':
          return React.cloneElement(render(childProps), {
            key: 'resize-detector'
          });

        case 'childFunction':
          return React.cloneElement(children(childProps));

        case 'child':
          return React.cloneElement(children, childProps);

        case 'childArray':
          return children.map(function (el) {
            return !!el && React.cloneElement(el, childProps);
          });

        default:
          return React.createElement(nodeType);
      }
    });

    var skipOnMount = props.skipOnMount,
        refreshMode = props.refreshMode,
        refreshRate = props.refreshRate,
        refreshOptions = props.refreshOptions;
    _this.state = {
      width: undefined,
      height: undefined
    };
    _this.skipOnMount = skipOnMount;
    _this.raf = null;
    _this.element = null;
    _this.unmounted = false;
    var handle = getHandle(refreshMode);
    _this.resizeHandler = handle ? handle(_this.createResizeHandler, refreshRate, refreshOptions) : _this.createResizeHandler;
    _this.resizeObserver = new index(_this.resizeHandler);
    return _this;
  }

  _createClass$2(ResizeDetector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.toggleObserver('observe');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleObserver('unobserve');
      this.rafClean();
      this.cancelHandler();
      this.unmounted = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(ChildWrapper, {
        ref: this.onRef
      }, this.getTargetComponent());
    }
  }]);

  return ResizeDetector;
}(React.PureComponent);

ResizeDetector.propTypes = {
  handleWidth: PropTypes.bool,
  handleHeight: PropTypes.bool,
  skipOnMount: PropTypes.bool,
  refreshRate: PropTypes.number,
  refreshMode: PropTypes.string,
  refreshOptions: PropTypes.shape({
    leading: PropTypes.bool,
    trailing: PropTypes.bool
  }),
  querySelector: PropTypes.string,
  targetDomEl: PropTypes.any,
  // eslint-disable-line react/forbid-prop-types
  onResize: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.any,
  // eslint-disable-line react/forbid-prop-types
  nodeType: PropTypes.node
};
ResizeDetector.defaultProps = {
  handleWidth: false,
  handleHeight: false,
  skipOnMount: false,
  refreshRate: 1000,
  refreshMode: undefined,
  refreshOptions: undefined,
  querySelector: null,
  targetDomEl: null,
  onResize: null,
  render: undefined,
  children: null,
  nodeType: 'div'
};

var AddSingleRecord =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AddSingleRecord, _PureComponent);

  function AddSingleRecord() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddSingleRecord);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddSingleRecord)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick('single');
    });

    return _this;
  }

  _createClass(AddSingleRecord, [{
    key: "render",
    value: function render() {
      var disabled = this.props.disabled;
      return React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": "Add Record"
      }, React__default.createElement("button", {
        className: "btn-table",
        onClick: this.onClick,
        type: "button",
        disabled: disabled
      }, React__default.createElement("i", {
        className: "fal fa-file-plus"
      })));
    }
  }]);

  return AddSingleRecord;
}(React.PureComponent);

_defineProperty(AddSingleRecord, "propTypes", {
  disabled: PropTypes__default.bool,
  onClick: PropTypes__default.func
});

var AddMultipleRecords =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AddMultipleRecords, _PureComponent);

  function AddMultipleRecords() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddMultipleRecords);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddMultipleRecords)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick('multiple');
    });

    return _this;
  }

  _createClass(AddMultipleRecords, [{
    key: "render",
    value: function render() {
      var disabled = this.props.disabled;
      return React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": "Add Multiple Records"
      }, React__default.createElement("button", {
        className: "btn-table",
        onClick: this.onClick,
        type: "button",
        disabled: disabled
      }, React__default.createElement("i", {
        className: "fal fa-copy"
      })));
    }
  }]);

  return AddMultipleRecords;
}(React.PureComponent);

_defineProperty(AddMultipleRecords, "propTypes", {
  disabled: PropTypes__default.bool,
  onClick: PropTypes__default.func
});

var CustomButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CustomButton, _PureComponent);

  function CustomButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick(_this.props.selectedRows);
    });

    return _this;
  }

  _createClass(CustomButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          icon = _this$props.icon,
          selectedRows = _this$props.selectedRows,
          tip = _this$props.tip,
          validation = _this$props.validation;
      var isDisabled = disabled || typeof validation === 'function' && !validation(selectedRows);
      return React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": tip
      }, React__default.createElement("button", {
        className: className,
        disabled: isDisabled,
        onClick: this.onClick,
        type: "button"
      }, icon));
    }
  }]);

  return CustomButton;
}(React.PureComponent);

_defineProperty(CustomButton, "propTypes", {
  className: PropTypes__default.string,
  disabled: PropTypes__default.bool,
  icon: PropTypes__default.element,
  onClick: PropTypes__default.func,
  selectedRows: PropTypes__default.object,
  tip: PropTypes__default.string,
  validation: PropTypes__default.func
});

_defineProperty(CustomButton, "defaultProps", {
  icon: null
});

var DeleteWarning = function DeleteWarning(_ref) {
  var _ref$numRowsSelected = _ref.numRowsSelected,
      numRowsSelected = _ref$numRowsSelected === void 0 ? 0 : _ref$numRowsSelected,
      onDeleteClick = _ref.onDeleteClick;
  return React__default.createElement(React.Fragment, null, React__default.createElement("div", {
    className: "table-header-delete-warning-arrow"
  }), React__default.createElement("div", {
    className: "table-header-delete-warning"
  }, React__default.createElement("p", null, "Delete ", numRowsSelected, " ", numRowsSelected > 1 ? 'records?' : 'record?'), React__default.createElement("button", {
    className: "btn btn-danger btn-sm btn-block",
    onClick: onDeleteClick,
    type: "button"
  }, "Yes")));
};
var DeleteRecords =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DeleteRecords, _PureComponent);

  function DeleteRecords(props) {
    var _this;

    _classCallCheck(this, DeleteRecords);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DeleteRecords).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onDeleteWarnToggle", function () {
      _this.setState({
        deleteWarning: !_this.state.deleteWarning
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function () {
      _this.setState({
        deleteWarning: false
      });

      if (typeof _this.props.onDeleteClick === 'function') {
        _this.props.onDeleteClick();
      }
    });

    _this.state = {
      deleteWarning: false
    };
    return _this;
  }

  _createClass(DeleteRecords, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          numRowsSelected = _this$props.numRowsSelected;
      var deleteWarning = this.state.deleteWarning;
      return React__default.createElement(Tether, {
        attachment: "top center",
        targetAttachment: "bottom center",
        constraints: [{
          to: 'scrollParent'
        }],
        style: {
          zIndex: 4
        }
      }, React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": "Delete Rows"
      }, React__default.createElement("button", {
        className: "btn-table",
        disabled: numRowsSelected === 0,
        onClick: this.onDeleteWarnToggle,
        type: "button"
      }, React__default.createElement("i", {
        className: "fal fa-trash-alt"
      }))), deleteWarning && React__default.createElement(DeleteWarning, {
        numRowsSelected: numRowsSelected,
        onDeleteClick: this.onDeleteClick
      }));
    }
  }]);

  return DeleteRecords;
}(React.PureComponent);

_defineProperty(DeleteRecords, "propTypes", {
  disabled: PropTypes__default.bool,
  numRowsSelected: PropTypes__default.number,
  onDeleteClick: PropTypes__default.func
});

_defineProperty(DeleteRecords, "defaultProps", {
  numRowsSelected: 0
});

var EditRecords = function EditRecords(_ref) {
  var disabled = _ref.disabled,
      editMode = _ref.editMode,
      onClick = _ref.onClick;
  var style = {};

  if (!disabled) {
    style.color = editMode ? '#8dc63f' : 'white';
  }

  return React__default.createElement("span", {
    "data-for": "table-tooltip",
    "data-tip": "Toggle Edit Mode"
  }, React__default.createElement("button", {
    className: "btn-table",
    type: "button",
    disabled: disabled,
    onClick: onClick
  }, React__default.createElement("i", {
    className: "fal fa-pencil",
    style: style
  })));
};
EditRecords.propTypes = {
  disabled: PropTypes__default.bool,
  editMode: PropTypes__default.bool,
  onClick: PropTypes__default.func
};

var ExportCSV = function ExportCSV(_ref) {
  var csvURL = _ref.csvURL,
      disabled = _ref.disabled;
  return React__default.createElement("a", {
    className: "btn-table",
    "data-for": "table-tooltip",
    "data-tip": "Export To CSV",
    disabled: disabled,
    href: csvURL,
    download: true
  }, React__default.createElement("i", {
    className: "fal fa-file-csv"
  }));
};
ExportCSV.propTypes = {
  disabled: PropTypes__default.bool,
  csvURL: PropTypes__default.string.isRequired
};

var QuickView =
/*#__PURE__*/
function (_Component) {
  _inherits(QuickView, _Component);

  function QuickView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QuickView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QuickView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick(_this.props.view.columns);
    });

    return _this;
  }

  _createClass(QuickView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          view = _this$props.view;
      return React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": view.tip
      }, React__default.createElement("button", {
        className: "btn-table",
        onClick: this.onClick,
        type: "button",
        disabled: disabled
      }, React__default.createElement("i", {
        className: view.icon
      })));
    }
  }]);

  return QuickView;
}(React.Component);
QuickView.propTypes = {
  disabled: PropTypes__default.bool,
  view: PropTypes__default.object
};
QuickView.defaultProps = {
  view: {}
};

// the columns in the table - visible and nonvisible

var ViewColumnsComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(ViewColumnsComponent, _Component);

  function ViewColumnsComponent(props) {
    var _this;

    _classCallCheck(this, ViewColumnsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewColumnsComponent).call(this, props)); // @btnActive: true when the display columns button
    // 	is active; false otherwise; used to highlight button

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.setState({
        btnActive: !_this.state.btnActive
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.setState({
        btnActive: false
      });
    });

    _this.state = {
      btnActive: false
    };
    return _this;
  }

  _createClass(ViewColumnsComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          onDisplayColChange = _this$props.onDisplayColChange,
          viewColumns = _this$props.viewColumns;
      var btnActive = this.state.btnActive;
      var btnClasses = classNames({
        'btn-table': true,
        'active': btnActive
      });
      return React__default.createElement(Tether, {
        attachment: "top right",
        targetAttachment: "bottom right",
        constraints: [{
          to: 'scrollParent'
        }],
        style: {
          zIndex: 10
        }
      }, React__default.createElement("span", {
        "data-for": "table-tooltip",
        "data-tip": "Toggle Columns"
      }, React__default.createElement("button", {
        className: btnClasses,
        onClick: this.onClick,
        type: "button",
        disabled: disabled
      }, React__default.createElement("i", {
        className: "fal fa-columns"
      }))), btnActive && React__default.createElement("ul", {
        className: "table-header-columns-ul ignore-react-onclickoutside"
      }, viewColumns.map(function (col) {
        return React__default.createElement("li", {
          key: col.id,
          className: "table-header-columns-li"
        }, React__default.createElement("div", {
          className: "pretty p-default"
        }, React__default.createElement("input", {
          type: "checkbox",
          id: col.category,
          checked: col.display,
          name: col.id,
          onChange: onDisplayColChange
        }), React__default.createElement("div", {
          className: "state p-primary"
        }, React__default.createElement("label", {
          htmlFor: col.category
        }, col.category))));
      })));
    }
  }]);

  return ViewColumnsComponent;
}(React.Component);

_defineProperty(ViewColumnsComponent, "propTypes", {
  disabled: PropTypes__default.bool,
  onDisplayColChange: PropTypes__default.func,
  viewColumns: PropTypes__default.arrayOf(PropTypes__default.object)
});

_defineProperty(ViewColumnsComponent, "defaultProps", {
  viewColumns: []
});

var ViewColumns = onClickOutside(ViewColumnsComponent);

var Toolbar =
/*#__PURE__*/
function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).call(this, props)); // @collapseMenuOpen: true when toolbar buttons are collapsed
    // 	into a single button and is active; false otherwise

    _defineProperty(_assertThisInitialized(_this), "toggleCollapsedMenu", function () {
      _this.setState({
        collapseMenuOpen: !_this.state.collapseMenuOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCollapsedButtons", function () {
      var loading = _this.props.loading;
      var collapseMenuOpen = _this.state.collapseMenuOpen;
      var collapseBtnClasses = classNames({
        'btn-table': true,
        'active': collapseMenuOpen
      });
      return React__default.createElement(Tether, {
        attachment: "top right",
        targetAttachment: "bottom right",
        constraints: [{
          to: 'scrollParent'
        }],
        style: {
          zIndex: 4
        }
      }, React__default.createElement("button", {
        className: collapseBtnClasses,
        disabled: loading,
        onClick: _this.toggleCollapsedMenu,
        type: "button"
      }, React__default.createElement("i", {
        className: "far fa-list-ul"
      })), collapseMenuOpen && React__default.createElement("div", {
        className: "table-header-collapsed-menu",
        "data-testid": "collapsedMenu"
      }, _this.renderButtons()));
    });

    _this.state = {
      collapseMenuOpen: false
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: "renderButtons",
    value: function renderButtons() {
      var _this$props = this.props,
          columns = _this$props.columns,
          csvURL = _this$props.csvURL,
          customToolbarButtons = _this$props.customToolbarButtons,
          deletable = _this$props.deletable,
          editable = _this$props.editable,
          editMode = _this$props.editMode,
          tableId = _this$props.tableId,
          insertable = _this$props.insertable,
          loading = _this$props.loading,
          multipleInsertion = _this$props.multipleInsertion,
          numRowsSelected = _this$props.numRowsSelected,
          onDisplayColChange = _this$props.onDisplayColChange,
          onDeleteClick = _this$props.onDeleteClick,
          onEditClick = _this$props.onEditClick,
          onInsertClick = _this$props.onInsertClick,
          onQuickViewColChange = _this$props.onQuickViewColChange,
          quickViews = _this$props.quickViews,
          selectedRows = _this$props.selectedRows,
          singleInsertion = _this$props.singleInsertion,
          viewColumns = _this$props.viewColumns;
      return React__default.createElement(React.Fragment, null, quickViews.length > 0 && React__default.createElement(React.Fragment, null, React__default.createElement("div", {
        className: "table-header-icon m-r-sm"
      }, quickViews.map(function (view, i) {
        return React__default.createElement(QuickView, {
          view: view,
          onClick: onQuickViewColChange,
          disabled: loading,
          key: i
        });
      })), React__default.createElement("span", {
        className: "table-header-icon-divider m-r-md"
      })), customToolbarButtons.map(function (btn) {
        return React__default.createElement(CustomButton, {
          className: btn.className || "btn-table",
          disabled: loading,
          icon: btn.icon,
          key: btn.tip,
          onClick: btn.onClick,
          selectedRows: selectedRows,
          tip: btn.tip,
          validation: btn.validation
        });
      }), insertable && singleInsertion && React__default.createElement(AddSingleRecord, {
        onClick: onInsertClick,
        disabled: loading
      }), insertable && multipleInsertion && React__default.createElement(AddMultipleRecords, {
        onClick: onInsertClick,
        disabled: loading
      }), viewColumns && React__default.createElement(ViewColumns, {
        disabled: loading,
        onDisplayColChange: onDisplayColChange,
        viewColumns: columns
      }), editable && React__default.createElement(EditRecords, {
        disabled: loading,
        editMode: editMode,
        onClick: onEditClick
      }), deletable && React__default.createElement(DeleteRecords, {
        disabled: loading,
        numRowsSelected: numRowsSelected,
        onDeleteClick: onDeleteClick
      }), !!csvURL && React__default.createElement(ExportCSV, {
        csvURL: csvURL,
        disabled: loading,
        tableId: tableId
      }), React__default.createElement(ReactTooltip, {
        id: "table-tooltip",
        place: "top",
        type: "dark",
        effect: "solid",
        multiline: false
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var isToolbarCollapsed = this.props.isToolbarCollapsed;
      return React__default.createElement("div", {
        className: "table-header-toolbar"
      }, isToolbarCollapsed ? this.renderCollapsedButtons() : this.renderButtons());
    }
  }]);

  return Toolbar;
}(React.Component);

_defineProperty(Toolbar, "propTypes", {
  isToolbarCollapsed: PropTypes__default.bool,
  columns: PropTypes__default.arrayOf(PropTypes__default.object),
  customToolbarButtons: PropTypes__default.arrayOf(PropTypes__default.object),
  deletable: PropTypes__default.bool,
  editable: PropTypes__default.bool,
  editMode: PropTypes__default.bool,
  csvURL: PropTypes__default.string,
  id: PropTypes__default.string,
  insertable: PropTypes__default.bool,
  loading: PropTypes__default.bool,
  multipleInsertion: PropTypes__default.bool,
  numRowsSelected: PropTypes__default.number,
  onDisplayColChange: PropTypes__default.func,
  onDeleteClick: PropTypes__default.func,
  onEditClick: PropTypes__default.func,
  onInsertClick: PropTypes__default.func,
  onQuickViewColChange: PropTypes__default.func,
  quickViews: PropTypes__default.arrayOf(PropTypes__default.object),
  singleInsertion: PropTypes__default.bool,
  viewColumns: PropTypes__default.bool
});

_defineProperty(Toolbar, "defaultProps", {
  columns: [],
  customToolbarButtons: [],
  insertable: true,
  multipleInsertion: true,
  quickViews: [],
  singleInsertion: true,
  viewColumns: true
});

__$styleInject(".table-header-container {\n  display: flex;\n  color: #fff;\n  background-color: #003852;\n  padding: 10px;\n  height: inherit;\n  max-height: inherit;\n}\n.table-header-filter {\n  flex: 1;\n}\n.table-header-icon {\n  display: inline;\n}\n.table-header-toolbar {\n  line-height: 40px;\n}\n.table-header-collapsed-menu {\n  background-color: #003852;\n  border: 1px solid #ccc;\n  margin-top: 11px;\n  border-radius: 5px;\n  padding-top: 3px;\n  padding-left: 0px;\n  box-shadow: 2px 2px 4px -3px rgba(0, 0, 0, 0.75);\n  padding: 10px;\n}\n.table-header-collapsed-menu .btn-table {\n  margin: 0 10px;\n}\n.table-header-icon-divider {\n  display: inline-block;\n  width: 1px;\n  height: 35px;\n  border-right: 1px solid grey;\n  box-sizing: border-box;\n  margin-bottom: -4px;\n}\n.table-header-delete-warning-arrow {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #566075;\n  margin: 0 auto;\n  margin-top: 5px;\n}\n.table-header-delete-warning {\n  background-color: #fff;\n  border: 1px solid #566075;\n  padding: 5px;\n  border-radius: 3px;\n  text-align: center;\n  min-width: 150px;\n}\n.table-heading-cell {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  padding: 8px;\n  font-weight: bold;\n  background-color: #fff;\n  height: 68px;\n  margin-top: 30px;\n}\n/* sticky polyfill */\n.table-heading-cell:before,\n.table-heading-cell:after {\n  content: '';\n  display: table;\n}\n.table-header-columns-ul {\n  border: medium none;\n  border-radius: 3px;\n  box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);\n  font-size: 12px;\n  list-style: none outside none;\n  text-shadow: none;\n  background-color: #fff;\n  margin: 5px 0 0 0;\n  padding-left: 4px;\n  padding-right: 4px;\n  max-height: 200px;\n  overflow-y: auto;\n  z-index: 4;\n}\n.table-header-columns-li {\n  text-align: left;\n  padding-left: 3px;\n  border-radius: 3px;\n  color: inherit;\n  margin: 4px;\n  font-weight: normal;\n  user-select: none;\n}\n");

var TOOLBAR_BREAKPOINT = 980;
var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props)); // @isToolbarCollapsed: true when the toolbar needs to be collapsed
    // 	since the width is too small to render; false otherwise

    _defineProperty(_assertThisInitialized(_this), "setIsCollapsedToolbar", function (innerWidth, breakpoint) {
      var isToolbarCollapsed = _this.state.isToolbarCollapsed;

      if (innerWidth > breakpoint && isToolbarCollapsed) {
        _this.setState({
          isToolbarCollapsed: false
        });
      } else if (innerWidth < breakpoint && !isToolbarCollapsed) {
        _this.setState({
          isToolbarCollapsed: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleComponentResize", function (width, height) {
      _this.setIsCollapsedToolbar(width, TOOLBAR_BREAKPOINT);
    });

    _this.state = {
      isToolbarCollapsed: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          filter = _this$props.filter,
          toolbar = _this$props.toolbar;
      var isToolbarCollapsed = this.state.isToolbarCollapsed;
      return React__default.createElement(ResizeDetector, {
        handleWidth: true,
        onResize: this.handleComponentResize
      }, React__default.createElement("div", {
        className: "table-header-container",
        ref: function ref(_ref) {
          return _this2.headerRef = _ref;
        }
      }, React__default.createElement("div", {
        className: "table-header-filter"
      }, React__default.createElement(StructuredQuery, filter)), React__default.createElement(Toolbar, _extends({}, toolbar, {
        isToolbarCollapsed: isToolbarCollapsed
      }))));
    }
  }]);

  return Header;
}(React.Component);

_defineProperty(Header, "propTypes", {
  filter: PropTypes__default.object,
  toolbar: PropTypes__default.object
});

var TableHeaderCell =
/*#__PURE__*/
function (_Component) {
  _inherits(TableHeaderCell, _Component);

  function TableHeaderCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TableHeaderCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableHeaderCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onSortClick", function (event) {
      if (typeof _this.props.onClick === 'function') {
        _this.props.onClick(_this.props.id);
      }
    });

    return _this;
  }

  _createClass(TableHeaderCell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Stickyfill.add(this.headerCellRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          customClasses = _this$props.customClasses,
          sortIcon = _this$props.sortIcon,
          sorted = _this$props.sorted,
          title = _this$props.title;
      var classList = classNames(_defineProperty({
        'table-heading-cell': true
      }, customClasses.tableHeaderCell, !!customClasses.tableHeaderCell));
      return React__default.createElement("th", {
        className: classList,
        ref: function ref(_ref) {
          return _this2.headerCellRef = _ref;
        }
      }, React__default.createElement("div", {
        className: "apm-cursor-p",
        onClick: this._onSortClick
      }, title, " ", sorted && sortIcon));
    }
  }]);

  return TableHeaderCell;
}(React.Component);

_defineProperty(TableHeaderCell, "propTypes", {
  customClasses: PropTypes__default.object,
  id: PropTypes__default.string,
  onClick: PropTypes__default.func,
  sortIcon: PropTypes__default.element,
  sorted: PropTypes__default.bool,
  title: PropTypes__default.string
});

_defineProperty(TableHeaderCell, "defaultProps", {
  customClasses: {},
  sorted: false,
  sortIcon: null,
  title: ''
});

var TableHeaderCheckboxCell = function TableHeaderCheckboxCell(_ref) {
  var allRowsSelected = _ref.allRowsSelected,
      _onRowSelectAll = _ref._onRowSelectAll;
  return React__default.createElement("th", {
    className: "table-heading-cell table-checkbox-cell"
  }, React__default.createElement("div", {
    className: "pretty p-icon"
  }, React__default.createElement("input", {
    checked: allRowsSelected,
    onChange: _onRowSelectAll,
    type: "checkbox"
  }), React__default.createElement("div", {
    className: "state p-info"
  }, React__default.createElement("i", {
    className: "icon fal fa-check"
  }), React__default.createElement("label", null))));
};
TableHeaderCheckboxCell.propTypes = {
  allRowsSelected: PropTypes__default.bool,
  _onRowSelectAll: PropTypes__default.func
};

var sortDescendingIcon = React__default.createElement("i", {
  className: "fas fa-sort-down"
});
var sortAscendingIcon = React__default.createElement("i", {
  className: "fas fa-sort-up"
});
var TableHeaderRow = function TableHeaderRow(_ref) {
  var allowSelection = _ref.allowSelection,
      allRowsSelected = _ref.allRowsSelected,
      cells = _ref.cells,
      customClasses = _ref.customClasses,
      editMode = _ref.editMode,
      expandable = _ref.expandable,
      extraColumns = _ref.extraColumns,
      sort = _ref.sort,
      _onRowSelectAll = _ref._onRowSelectAll,
      _onSort = _ref._onSort;
  var headerRowClasses = classNames(_defineProperty({}, customClasses.tableHeaderRow, !!customClasses.tableHeaderRow)); // used if the table is expandable since the expand column is 
  // the last column

  var headerCellClasses = classNames(_defineProperty({
    'table-heading-cell': true
  }, customClasses.tableHeaderCell, !!customClasses.tableHeaderCell));
  return React__default.createElement("tr", {
    className: headerRowClasses
  }, expandable && React__default.createElement("th", {
    className: "table-heading-cell table-expand-cell"
  }), extraColumns.map(function (col, i) {
    return React__default.cloneElement(col.header, {
      key: "table-extra-col-".concat(i)
    });
  }), allowSelection && React__default.createElement(TableHeaderCheckboxCell, {
    allRowsSelected: allRowsSelected,
    editMode: editMode,
    _onRowSelectAll: _onRowSelectAll
  }), cells.map(function (cell, i) {
    return React__default.createElement(TableHeaderCell, {
      customClasses: customClasses,
      id: cell.id,
      key: cell.category,
      onClick: _onSort,
      sorted: sort.id === cell.id,
      sortIcon: sort.ascending ? sortAscendingIcon : sortDescendingIcon,
      title: cell.category
    });
  }));
};
TableHeaderRow.propTypes = {
  allRowsSelected: PropTypes__default.bool,
  allowSelection: PropTypes__default.bool,
  cells: PropTypes__default.arrayOf(PropTypes__default.object).isRequired,
  customClasses: PropTypes__default.object,
  editMode: PropTypes__default.bool,
  expandable: PropTypes__default.bool,
  extraColumns: PropTypes__default.arrayOf(PropTypes__default.object),
  sort: PropTypes__default.shape({
    id: PropTypes__default.string,
    ascending: PropTypes__default.bool
  }),
  _onRowSelectAll: PropTypes__default.func,
  _onSort: PropTypes__default.func
};
TableHeaderRow.defaultProps = {
  cells: [],
  customClasses: {},
  extraColumns: [],
  sort: {}
};

var TableHeader = function TableHeader(_ref) {
  var allowSelection = _ref.allowSelection,
      allRowsSelected = _ref.allRowsSelected,
      columns = _ref.columns,
      customClasses = _ref.customClasses,
      editMode = _ref.editMode,
      expandable = _ref.expandable,
      extraColumns = _ref.extraColumns,
      sort = _ref.sort,
      _onRowSelectAll = _ref._onRowSelectAll,
      _onSort = _ref._onSort;
  var classList = classNames(_defineProperty({}, customClasses.tableHeader, !!customClasses.tableHeader));
  return React__default.createElement("thead", {
    className: classList
  }, React__default.createElement(TableHeaderRow, {
    allowSelection: allowSelection,
    allRowsSelected: allRowsSelected,
    cells: columns,
    customClasses: customClasses,
    editMode: editMode,
    expandable: expandable,
    extraColumns: extraColumns,
    sort: sort,
    _onRowSelectAll: _onRowSelectAll,
    _onSort: _onSort
  }));
};
TableHeader.propTypes = {
  columns: PropTypes__default.arrayOf(PropTypes__default.object),
  sort: PropTypes__default.shape({
    id: PropTypes__default.string,
    ascending: PropTypes__default.bool
  }),
  _onSort: PropTypes__default.func
};
TableHeader.defaultProps = {
  customClasses: {}
};

// used to generate a drag preview box when user drags row(s)
function getMaxTextWidth(ctx, style, text) {
  var maxWidth = 0;
  var maxTextIndex = -1;
  text.forEach(function (t, i) {
    if (t.length > maxWidth) {
      maxWidth = t.length;
      maxTextIndex = i;
    }
  });

  if (typeof ctx.measureText === 'function' && maxTextIndex > -1) {
    return ctx.measureText(text[maxTextIndex]).width;
  } else {
    var perCharWidth = style.fontSize / 1.7;
    return maxWidth * perCharWidth;
  }
}

function parseBoxShadow(style) {
  var parts = (style.boxShadow || '').replace(/px/g, '').split(/[^,] /);
  var offsetX = parts[0];
  var offsetY = parts[1];
  var blur = parts[2];
  var color = parts[3];
  return {
    shadowBlur: parseInt(blur, 10) || 0,
    shadowColor: color || 'transparent',
    shadowOffsetX: parseInt(offsetX, 10) || 0,
    shadowOffsetY: parseInt(offsetY, 10) || 0
  };
}

var defaultStyle = {
  backgroundColor: 'rgb(0, 0, 0)',
  borderRadius: 5,
  color: 'white',
  fontSize: 15,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10
};
var TEXT_OFFSET = 7;
function createDragPreview() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var img = arguments.length > 1 ? arguments[1] : undefined;
  if (text.length === 0) text = ['...'];
  var style = defaultStyle;
  if (!img) img = new Image();
  var shadowStyle = parseBoxShadow(style);
  var marginBottom = shadowStyle.shadowOffsetY + shadowStyle.shadowBlur * 2;
  var marginRight = shadowStyle.shadowOffsetX + shadowStyle.shadowBlur * 2;
  var rectHeight = style.paddingTop + style.fontSize * text.length + style.paddingBottom;
  var rectStrokeWidth = 1;
  var c = document.createElement('canvas');
  c.height = rectHeight + marginBottom;
  var ctx = c.getContext('2d');
  ctx.font = style.fontSize + 'px sans-serif'; // once before for measurement

  var textWidth = getMaxTextWidth(ctx, style, text);
  var rectWidth = style.paddingLeft + textWidth + style.paddingRight;
  ctx.canvas.width = style.paddingLeft + textWidth + style.paddingRight + marginRight + rectStrokeWidth * 2;
  ctx.font = style.fontSize + 'px sans-serif'; // once after for actually styling

  ctx.rect(0, 0, rectWidth, rectHeight);
  ctx.save();
  ctx.fillStyle = style.backgroundColor;
  ctx.shadowColor = shadowStyle.shadowColor;
  ctx.shadowBlur = shadowStyle.shadowBlur;
  ctx.shadowOffsetX = shadowStyle.shadowOffsetX;
  ctx.shadowOffsetY = shadowStyle.shadowOffsetY;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = style.color;
  text.forEach(function (t, i) {
    ctx.fillText(t, style.paddingLeft, style.paddingTop * .75 * (i + 1) + style.fontSize + TEXT_OFFSET * i);
  });
  img.src = c.toDataURL();
  return img;
}

function getDragType(props) {
  return props.dragType;
}
var rowSource = {
  beginDrag: function beginDrag(props) {
    return {
      rowId: props.rowId,
      selectedRows: props.selectedRows
    };
  },
  endDrag: function endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      var draggedRowIds = Object.keys(props.selectedRows);

      var _monitor$getDropResul = monitor.getDropResult(),
          id = _monitor$getDropResul.id,
          dropResults = _objectWithoutProperties(_monitor$getDropResul, ["id"]);

      props.dragCb(draggedRowIds, id, dropResults);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
} // provides custom message for dragPreview


function formatDragMessage() {
  var selectedRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(selectedRows).map(function (key) {
    return selectedRows[key].name;
  });
} // wrap a row with react-dnd to make it draggable
// cannot be a stateless component since react 16

var DragRow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DragRow, _PureComponent);

  function DragRow(props) {
    var _this;

    _classCallCheck(this, DragRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DragRow).call(this, props));
    _this.state = {
      dragPreviewText: ''
    };
    return _this;
  }

  _createClass(DragRow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var dragPreviewText = formatDragMessage(this.props.selectedRows);
      this.dragPreview = createDragPreview(dragPreviewText);
      this.props.connectDragPreview(this.dragPreview);
      this.setState({
        dragPreviewText: dragPreviewText
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.selectedRows !== nextProps.selectedRows) {
        this.setState({
          dragPreviewText: formatDragMessage(nextProps.selectedRows)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // handles updates to the dragPreview image as the dynamic numRows value changes
      this.dragPreview = createDragPreview(this.state.dragPreviewText, this.dragPreview);
    }
  }, {
    key: "render",
    value: function render() {
      var connectDragSource = this.props.connectDragSource;
      return connectDragSource(this.props.children);
    }
  }]);

  return DragRow;
}(React.PureComponent);

_defineProperty(DragRow, "propTypes", {
  connectDragPreview: PropTypes__default.func.isRequired,
  connectDragSource: PropTypes__default.func.isRequired
});

var TableRowDraggable = reactDnd.DragSource(getDragType, rowSource, collect)(DragRow);

var rowTarget = {
  drop: function drop(props, monitor) {
    return {
      id: props.rowId
    };
  }
};

function collect$1(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver({
      shallow: true
    })
  };
}

function getDropType(props) {
  return props.dropType;
}

var DroppableRow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DroppableRow, _PureComponent);

  function DroppableRow() {
    _classCallCheck(this, DroppableRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(DroppableRow).apply(this, arguments));
  }

  _createClass(DroppableRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          colSpan = _this$props.colSpan,
          connectDropTarget = _this$props.connectDropTarget,
          desc = _this$props.desc,
          isOver = _this$props.isOver,
          canDrop = _this$props.canDrop,
          name = _this$props.name;

      if (canDrop && isOver) {
        return connectDropTarget(React__default.createElement("tr", null, React__default.createElement("td", {
          className: "table-cell-droppable font-bold bg-primary",
          colSpan: colSpan
        }, "".concat(name, " - ").concat(desc))));
      }

      return connectDropTarget(this.props.children);
    }
  }]);

  return DroppableRow;
}(React.PureComponent);
var TableRowDroppable = reactDnd.DropTarget(getDropType, rowTarget, collect$1)(DroppableRow);

var ExpandIcon = function ExpandIcon(_ref) {
  var expanded = _ref.expanded,
      onClick = _ref.onClick;
  var iconClasses = classNames({
    'fas': true,
    'fa-caret-down': expanded,
    'fa-caret-right': !expanded,
    'fa-2x': true
  });
  return React__default.createElement("td", {
    onClick: onClick,
    className: "table-expand-icon"
  }, React__default.createElement("i", {
    className: iconClasses
  }));
};
ExpandIcon.propTypes = {
  expanded: PropTypes__default.bool.isRequired,
  onClick: PropTypes__default.func.isRequired
};
ExpandIcon.defaultProps = {
  expanded: false
};

var TABLE_INPUT_RE = /^\/?(\w+)/; // Converts a cell value to a string
//
// @value(string|object|null|[object]) - the value passed into a cell
// @return(string) - the value in string format

function convertCellToString(value) {
  if (value === null || value === undefined) {
    return '';
  }

  var valueType = _typeof(value); // handle primitive data types


  if (valueType === 'string' || valueType === 'number') {
    return value.toString();
  } else if (valueType === 'boolean') {
    return value.toString(); // handle objects with a name field
  } else if (valueType === 'object' && value.name) {
    return value.name;
  }

  return '';
}
// front end. Takes in a nested object and returns an array of objects
//
// @model(Object) - Has the following properties
// 	[id]: {
// 		asyncFilter(func): async filter for loading in options in a list filter
// 		category(string): name of the column
// 		collection([object]): if a column has a list of values to tokenize
// 		display(bool): true if column is viewed; false otherwise
// 		file(object): an object describing a file; has key image if its
// 			an image file; path key to tell where to upload a file
// 		id(string): unique identifier of a column
// 		insertable(bool): true to use this field when inserting a new 
// 			record; false otherwise
// 		options([string]): list of options to filter with
// 		order(number): the order in which a column is shown
// 		required(bool): true if the field is required when inserting or
// 			editing a record
// 		type(string): data type of the column
// 		updateable(bool): true if the user can edit the column in the
// 			record; false otherwise
//	}
// @return([Object]) - An array with objects
// 	[{
// 		id: id,
// 		category: displayName, 
// 		display: display,
// 		type: type,
// 		options: enum,
// 	}]

function convertModel(model) {
  if (!model || _typeof(model) !== 'object' || _typeof(model) === 'object' && Array.isArray(model)) {
    return;
  }

  var columns = [];
  console.log({
    model: model
  });
  Object.keys(model).forEach(function (key, i) {
    columns.push({
      asyncFilter: model[key].asyncFilter,
      category: model[key].displayName || lodash.upperFirst(key),
      collection: !!model[key].collection,
      display: !model[key].hidden && model[key].display !== false,
      file: !!model[key].upload ? {
        image: model[key].image,
        path: model[key].path
      } : undefined,
      hidden: !!model[key].hidden,
      id: key,
      insertable: model[key].insertable,
      lookup: model[key].lookup,
      multiline: !!model[key].multiline,
      options: model[key]["enum"],
      required: !!model[key].required,
      tableOnInsert: model[key].drilldown && model[key].asyncFilter ? {
        apiPath: model[key].asyncFilter,
        name: TABLE_INPUT_RE.exec(model[key].asyncFilter)[1]
      } : undefined,
      tokenize: !!model[key].collection || !!model[key].tokenize,
      type: model[key].type,
      updateable: model[key].updateable !== false
    });
  });
  return columns;
}

var AsyncDropdownCell =
/*#__PURE__*/
function (_Component) {
  _inherits(AsyncDropdownCell, _Component);

  function AsyncDropdownCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AsyncDropdownCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AsyncDropdownCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function (error, value, name) {
      var updateData = _defineProperty({}, name, value);

      _this.props.onBlur(_this.props.rowId, updateData);
    });

    return _this;
  }

  _createClass(AsyncDropdownCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          colId = _this$props.colId,
          inputClass = _this$props.inputClass,
          lookup = _this$props.lookup,
          required = _this$props.required,
          value = _this$props.value;
      return React__default.createElement(mentorInputs.AsyncDropdown, {
        className: inputClass,
        name: colId,
        onBlur: this._onBlur,
        route: lookup.route,
        required: required,
        value: value
      });
    }
  }]);

  return AsyncDropdownCell;
}(React.Component);

_defineProperty(AsyncDropdownCell, "propTypes", {
  colId: PropTypes__default.string,
  inputClass: PropTypes__default.string,
  onBlur: PropTypes__default.func,
  lookup: PropTypes__default.shape({
    getOptionLabel: PropTypes__default.func,
    getOptionValue: PropTypes__default.func,
    route: PropTypes__default.string
  }),
  options: PropTypes__default.arrayOf(PropTypes__default.string),
  required: PropTypes__default.bool,
  rowId: PropTypes__default.string,
  value: PropTypes__default.string
});

_defineProperty(AsyncDropdownCell, "defaultProps", {
  lookup: {}
});

var EditColorPicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EditColorPicker, _PureComponent);

  function EditColorPicker(props) {
    var _this;

    _classCallCheck(this, EditColorPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditColorPicker).call(this, props)); // @color: current color in picker

    _defineProperty(_assertThisInitialized(_this), "onColorChange", function (color) {
      var _this$props = _this.props,
          onColorChange = _this$props.onColorChange,
          colId = _this$props.colId,
          rowId = _this$props.rowId;

      _this.setState({
        color: color
      });

      _this.props.onColorChange(rowId, _defineProperty({}, colId, color.hex));
    });

    _this.state = {
      color: _this.props.color
    };
    return _this;
  }

  _createClass(EditColorPicker, [{
    key: "render",
    value: function render() {
      var color = this.state.color;
      return React__default.createElement(reactColor.ChromePicker, {
        color: color,
        disableAlpha: true,
        onChangeComplete: this.onColorChange
      });
    }
  }]);

  return EditColorPicker;
}(React.PureComponent);

_defineProperty(EditColorPicker, "propTypes", {
  colId: PropTypes__default.string,
  color: PropTypes__default.string,
  onColorChange: PropTypes__default.func,
  rowId: PropTypes__default.string
});

_defineProperty(EditColorPicker, "defaultProps", {
  color: '#fff'
});

var EPSILON = 0.00000001; // edit a regular text input cell
// updated data is sent to server when the input box loses focus or the user
// hits enter

var EditInputCell =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EditInputCell, _PureComponent);

  function EditInputCell(props) {
    var _this;

    _classCallCheck(this, EditInputCell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditInputCell).call(this, props)); // original value loaded into input

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function (error, value, name) {
      if (error) return; // add an epsilon check to deal with floating point arithmetic
      // to make sure a change in float input is large enough to update

      if (_this.props.type === 'float' && Math.abs(value - _this.origValue) < EPSILON) {
        return;
      }

      _this.origValue = value;

      var updateData = _defineProperty({}, name, value);

      _this.props.onBlur(_this.props.rowId, updateData);
    });

    _this.origValue = _this.props.value;
    return _this;
  }

  _createClass(EditInputCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          colId = _this$props.colId,
          inputClass = _this$props.inputClass,
          required = _this$props.required,
          type = _this$props.type,
          value = _this$props.value;
      var Input = mentorInputs.getMentorInput(type);
      return React__default.createElement(Input, {
        className: inputClass,
        "data-testid": "edit-input",
        name: colId,
        onBlur: this._onBlur,
        required: required,
        value: value
      });
    }
  }]);

  return EditInputCell;
}(React.PureComponent);

_defineProperty(EditInputCell, "propTypes", {
  colId: PropTypes__default.string,
  inputClass: PropTypes__default.string,
  onBlur: PropTypes__default.func,
  required: PropTypes__default.bool,
  rowId: PropTypes__default.string,
  type: PropTypes__default.string,
  value: PropTypes__default.string
});

_defineProperty(EditInputCell, "defaultProps", {
  type: 'string',
  value: ''
});

var EditDropzoneCell =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EditDropzoneCell, _PureComponent);

  function EditDropzoneCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditDropzoneCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditDropzoneCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (acceptedFiles, rejectedFiles) {
      if (!acceptedFiles.length) return;
      var _this$props = _this.props,
          path = _this$props.path,
          rowId = _this$props.rowId;

      _this.props.uploadFileCb(rowId, path, acceptedFiles);
    });

    return _this;
  }

  _createClass(EditDropzoneCell, [{
    key: "render",
    value: function render() {
      return React__default.createElement(Dropzone, {
        accept: this.props.mimeType,
        style: {
          width: '100%',
          height: '40px',
          display: 'block',
          lineHeight: '40px',
          textAlign: 'center',
          border: '2px dashed darkgrey',
          borderRadius: '5px',
          backgroundColor: 'lightgrey',
          boxSizing: 'border-box'
        },
        activeStyle: {
          border: '2px solid darkgrey'
        },
        rejectStyle: {
          border: '2px solid red'
        },
        onDrop: this.onDrop
      }, React__default.createElement("p", {
        className: "no-margins"
      }, "Drop File"));
    }
  }]);

  return EditDropzoneCell;
}(React.PureComponent);

_defineProperty(EditDropzoneCell, "propTypes", {
  path: PropTypes__default.string.isRequired,
  rowId: PropTypes__default.string.isRequired,
  uploadFileCb: PropTypes__default.func
});

var EditImageCell =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EditImageCell, _PureComponent);

  function EditImageCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditImageCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditImageCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          colId = _this$props.colId,
          onDeleteClick = _this$props.onDeleteClick,
          rowId = _this$props.rowId;
      onDeleteClick(rowId, colId);
    });

    return _this;
  }

  _createClass(EditImageCell, [{
    key: "render",
    value: function render() {
      var value = this.props.value;
      return React__default.createElement(React.Fragment, null, React__default.createElement("img", {
        src: value,
        style: {
          maxWidth: '50px'
        }
      }), React__default.createElement("i", {
        className: "fa fa-times table-cell-edit-image apm-cursor-p",
        "data-testid": "table-image-delete",
        onClick: this.onDeleteClick
      }));
    }
  }]);

  return EditImageCell;
}(React.PureComponent);

_defineProperty(EditImageCell, "propTypes", {
  colId: PropTypes__default.string,
  onDeleteClick: PropTypes__default.func,
  rowId: PropTypes__default.string,
  value: PropTypes__default.string
});

var EditTableInputCell =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(EditTableInputCell, _PureComponent);

  function EditTableInputCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditTableInputCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditTableInputCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onSelectData", function (data, name) {
      var updateData = _defineProperty({}, name, {
        id: data.id,
        name: data.name
      });

      _this.props.onBlur(_this.props.rowId, updateData);
    });

    return _this;
  }

  _createClass(EditTableInputCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          apiInfo = _this$props.apiInfo,
          colId = _this$props.colId,
          inputClass = _this$props.inputClass,
          required = _this$props.required,
          value = _this$props.value;
      return React__default.createElement("input", {
        className: inputClass,
        disabled: true,
        type: "text",
        value: "Under Construction"
      }); // return (
      // 	<TableInput
      // 		apiInfo={apiInfo}
      // 		className={inputClass}
      // 		name={colId}
      // 		onSelectData={this.onSelectData}
      // 		required={required}
      // 		value={value}
      // 	/>
      // );
    }
  }]);

  return EditTableInputCell;
}(React.PureComponent);

_defineProperty(EditTableInputCell, "propTypes", {
  apiInfo: PropTypes__default.object,
  onChange: PropTypes__default.func,
  colId: PropTypes__default.string,
  rowId: PropTypes__default.string,
  row: PropTypes__default.object,
  inputClass: PropTypes__default.string,
  onBlur: PropTypes__default.func,
  value: PropTypes__default.oneOfType([PropTypes__default.string, PropTypes__default.number])
});

_defineProperty(EditTableInputCell, "defaultProps", {
  value: ''
});

var TokenCell =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TokenCell, _PureComponent);

  function TokenCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TokenCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TokenCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          colId = _this$props.colId,
          onClick = _this$props.onClick,
          rowId = _this$props.rowId,
          token = _this$props.token;
      onClick(rowId, colId, token);
    });

    return _this;
  }

  _createClass(TokenCell, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          editMode = _this$props2.editMode,
          rowSelected = _this$props2.rowSelected,
          token = _this$props2.token;
      var val = _typeof(token) === 'object' ? token.name : token;
      return React__default.createElement("span", {
        className: "table-token",
        title: val
      }, val, editMode && rowSelected && React__default.createElement("i", {
        className: "fa fa-times token-delete",
        "data-testid": "token-delete",
        onClick: this.onClick
      }));
    }
  }]);

  return TokenCell;
}(React.PureComponent);

_defineProperty(TokenCell, "propTypes", {
  colId: PropTypes__default.string,
  editMode: PropTypes__default.bool,
  onClick: PropTypes__default.func,
  rowId: PropTypes__default.string,
  token: PropTypes__default.oneOfType([PropTypes__default.string, PropTypes__default.object])
});

var MAX_HEIGHT = 250;
var TableListFilter =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TableListFilter, _PureComponent);

  function TableListFilter(props) {
    var _this;

    _classCallCheck(this, TableListFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableListFilter).call(this, props)); // @menuBottom: position of the menu bottom in viewport; used
    // 	when the menu will render out of viewport
    // @menuLeft: position of the menu left in viewport
    // @menuTop: position of the menu top in viewport
    // @menuWidth: width of the menu

    _defineProperty(_assertThisInitialized(_this), "onChange", function (err, val) {
      if (val.length > 0) {
        _this.updateMenuPosn();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateMenuPosn", function () {
      var portalRef = _this.props.portalRef;

      var menuPosn = _this.wrapperRef.getBoundingClientRect();

      var wrapperPosn = portalRef.getBoundingClientRect();
      var left = menuPosn.left - wrapperPosn.left;
      var top = menuPosn.top - wrapperPosn.top + menuPosn.height + portalRef.scrollTop;
      var bottom = null; // check if the render could cause the menu to render out of the viewport

      if (menuPosn.bottom + MAX_HEIGHT > wrapperPosn.bottom) {
        bottom = wrapperPosn.bottom - menuPosn.bottom - portalRef.scrollTop + menuPosn.height;
        top = null;
      }

      if (left !== _this.state.menuLeft || top !== _this.state.menuTop || bottom !== _this.state.menuBottom) {
        _this.setState({
          menuLeft: left,
          menuTop: top,
          menuWidth: menuPosn.width,
          menuBottom: bottom
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMatch", function (value, name) {
      var _this$props = _this.props,
          onMatch = _this$props.onMatch,
          rowId = _this$props.rowId;
      onMatch(rowId, name, value);
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuPosn", function (event) {
      _this.updateMenuPosn();

      window.addEventListener('resize', _this.updateMenuPosn);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      window.removeEventListener('resize', _this.updateMenuPosn);
    });

    _this.state = {
      menuBottom: null,
      menuLeft: 0,
      menuTop: 0,
      menuWidth: 100
    };
    return _this;
  }

  _createClass(TableListFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMenuPosn();
    } // check to make sure input hasnt shifted; if it has reset the posn
    // of the menu top/left

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateMenuPosn();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          customFilter = _this$props2.customFilter,
          inputClass = _this$props2.inputClass,
          matchOnEmpty = _this$props2.matchOnEmpty,
          name = _this$props2.name,
          options = _this$props2.options,
          portalRef = _this$props2.portalRef,
          value = _this$props2.value;
      var _this$state = this.state,
          menuBottom = _this$state.menuBottom,
          menuLeft = _this$state.menuLeft,
          menuTop = _this$state.menuTop,
          menuWidth = _this$state.menuWidth;
      return React__default.createElement("div", {
        ref: function ref(_ref) {
          return _this2.wrapperRef = _ref;
        }
      }, React__default.createElement(mentorInputs.ListFilter, {
        className: inputClass,
        customFilter: customFilter,
        listStyle: {
          container: {
            position: 'absolute',
            bottom: !!menuBottom ? menuBottom : undefined,
            left: menuLeft,
            maxHeight: MAX_HEIGHT,
            top: !!menuTop ? menuTop : undefined,
            width: menuWidth,
            zIndex: 3
          }
        },
        matchOnEmpty: matchOnEmpty,
        name: name,
        onFocus: this.getMenuPosn,
        onBlur: this.onBlur,
        onMatch: this.onMatch,
        options: options,
        portalRef: portalRef,
        value: value
      }));
    }
  }]);

  return TableListFilter;
}(React.PureComponent);

_defineProperty(TableListFilter, "propTypes", {
  customFilter: PropTypes__default.func,
  matchOnEmpty: PropTypes__default.bool,
  options: PropTypes__default.arrayOf(PropTypes__default.oneOfType([PropTypes__default.object, PropTypes__default.string])),
  value: PropTypes__default.string
});

_defineProperty(TableListFilter, "defaultProps", {
  customFilter: null,
  matchOnEmpty: true,
  options: []
});

var TableDatePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TableDatePicker, _PureComponent);

  function TableDatePicker(props) {
    var _this;

    _classCallCheck(this, TableDatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableDatePicker).call(this, props)); // @menuLeft: position of the menu left in viewport
    // @menuTop: position of the menu top in viewport

    _defineProperty(_assertThisInitialized(_this), "updateMenuPosn", function () {
      var menuPosn = _this.wrapperRef.getBoundingClientRect();

      var left = menuPosn.left;
      var top = menuPosn.top + window.scrollY + menuPosn.height;

      if (left !== _this.state.menuLeft || top !== _this.state.menuTop) {
        _this.setState({
          menuLeft: left,
          menuTop: top
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuPosn", function (event) {
      var menuPosn = _this.wrapperRef.getBoundingClientRect();

      _this.setState({
        menuLeft: menuPosn.left,
        menuTop: menuPosn.top + window.scrollY + menuPosn.height
      });

      window.addEventListener('resize', _this.updateMenuPosn);
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function (error, value, name) {
      var updateData = _defineProperty({}, name, value);

      _this.props.onBlur(_this.props.rowId, updateData);

      window.removeEventListener('resize', _this.updateMenuPosn);
    });

    _this.state = {
      menuLeft: 0,
      menuTop: 0
    };
    return _this;
  }

  _createClass(TableDatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMenuPosn();
    } // check to make sure input hasnt shifted; if it has reset the posn
    // of the menu top/left

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateMenuPosn();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          inputClass = _this$props.inputClass,
          name = _this$props.name,
          onBlur = _this$props.onBlur,
          portalRef = _this$props.portalRef,
          required = _this$props.required,
          value = _this$props.value;
      var _this$state = this.state,
          menuLeft = _this$state.menuLeft,
          menuTop = _this$state.menuTop;
      return React__default.createElement("div", {
        ref: function ref(_ref) {
          return _this2.wrapperRef = _ref;
        }
      }, React__default.createElement(mentorInputs.DatePicker, {
        className: inputClass,
        name: name,
        onBlur: this._onBlur,
        pickerStyle: {
          container: {
            position: 'absolute',
            left: menuLeft,
            top: menuTop,
            zIndex: 1
          }
        },
        portalRef: portalRef,
        required: required,
        value: value
      }));
    }
  }]);

  return TableDatePicker;
}(React.PureComponent);

_defineProperty(TableDatePicker, "propTypes", {
  value: PropTypes__default.string
});

var SelectCell =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectCell, _Component);

  function SelectCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function (error, value, name) {
      var updateData = _defineProperty({}, name, value);

      _this.props.onBlur(_this.props.rowId, updateData);
    });

    return _this;
  }

  _createClass(SelectCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          colId = _this$props.colId,
          inputClass = _this$props.inputClass,
          options = _this$props.options,
          required = _this$props.required,
          value = _this$props.value;
      return React__default.createElement(mentorInputs.SelectInput, {
        className: inputClass,
        "data-testid": "select-cell",
        name: colId,
        onBlur: this._onBlur,
        options: options,
        required: required,
        value: value
      });
    }
  }]);

  return SelectCell;
}(React.Component);

_defineProperty(SelectCell, "propTypes", {
  colId: PropTypes__default.string,
  inputClass: PropTypes__default.string,
  onBlur: PropTypes__default.func,
  options: PropTypes__default.arrayOf(PropTypes__default.string),
  required: PropTypes__default.bool,
  rowId: PropTypes__default.string,
  value: PropTypes__default.string
});

_defineProperty(SelectCell, "defaultProps", {
  options: []
});

var Cell = function Cell(_ref) {
  var asyncFilter = _ref.asyncFilter,
      cellOptions = _ref.cellOptions,
      cellType = _ref.cellType,
      colId = _ref.colId,
      customClasses = _ref.customClasses,
      customColumn = _ref.customColumn,
      editMode = _ref.editMode,
      file = _ref.file,
      model = _ref.model,
      multiline = _ref.multiline,
      onBlur = _ref.onBlur,
      onColorChange = _ref.onColorChange,
      onOptionMatch = _ref.onOptionMatch,
      onDeleteImageClick = _ref.onDeleteImageClick,
      onDeleteTokenClick = _ref.onDeleteTokenClick,
      portalRef = _ref.portalRef,
      required = _ref.required,
      row = _ref.row,
      rowId = _ref.rowId,
      rowSelected = _ref.rowSelected,
      tableOnInsert = _ref.tableOnInsert,
      tokenize = _ref.tokenize,
      type = _ref.type,
      updatable = _ref.updatable,
      uploadFileCb = _ref.uploadFileCb,
      value = _ref.value;
  var cellClass = classNames(_defineProperty({
    'table-cell-view': !editMode || editMode && !rowSelected || updatable === false || multiline,
    'table-cell-edit': editMode && rowSelected && updatable !== false && !multiline
  }, customClasses.tableCell, !!customClasses.tableCell));
  var editInputClass = classNames(_defineProperty({
    'table-cell-edit-input': true
  }, customClasses.tableEditCell, !!customClasses.tableEditCell));
  var _origValue = value;
  var cell;
  var title;

  if (_typeof(value) !== 'object' && model[colId] && !model[colId].image && !!value) {
    title = value;
  }

  if (!!customColumn) {
    cell = customColumn(row, {
      colId: colId,
      editMode: editMode,
      rowSelected: rowSelected,
      value: value,
      _origValue: _origValue
    });

    if (!!cell) {
      return React__default.createElement("td", {
        className: cellClass,
        title: title
      }, cell);
    }
  } // cell is an array so tokenize


  if (tokenize) {
    if (!Array.isArray(value)) {
      value = [];
    } // create all the tokens


    cell = value.map(function (val, i) {
      return React__default.createElement(TokenCell, {
        colId: colId,
        editMode: editMode && rowSelected && updatable !== false,
        key: _typeof(val) === 'object' ? rowId + val.id : rowId + val,
        onClick: onDeleteTokenClick,
        rowId: rowId,
        rowSelected: rowSelected,
        token: val
      });
    });
    return React__default.createElement("td", {
      className: "table-cell-view"
    }, cell);
  } // convert different data types to the proper string


  value = convertCellToString(value); // determine the type of cell to render based on column data
  // Token cell if its an array of objects
  // no edit box if column is not in edit mode or updatable or
  // disable column is enabled and column isn't editable so just display value

  if (!rowSelected || !editMode || updatable === false || multiline) {
    if (model[colId] && model[colId].image && !!value) {
      cell = React__default.createElement("img", {
        src: value,
        style: {
          maxWidth: '50px'
        }
      });
    } else if (type === 'datetime' && Date.parse(value)) {
      cell = React__default.createElement(React.Fragment, null, React__default.createElement(reactIntl.FormattedDate, {
        value: value,
        year: "numeric",
        month: "long",
        day: "numeric"
      }), ' - ', React__default.createElement(reactIntl.FormattedTime, {
        value: value,
        hour: "numeric",
        minute: "numeric"
      }));
    } else {
      cell = value;
    }
  } else if (!!tableOnInsert) {
    cell = React__default.createElement(EditTableInputCell, {
      apiInfo: tableOnInsert,
      colId: colId,
      inputClass: editInputClass,
      onBlur: onBlur,
      required: required,
      row: row,
      rowId: rowId,
      type: cellType,
      value: value
    }); // add a delete button to images in edit mode
  } else if (model[colId] && model[colId].image && !!value) {
    cell = React__default.createElement(EditImageCell, {
      colId: colId,
      onDeleteClick: onDeleteImageClick,
      rowId: rowId,
      value: value
    }); // color picker cell
  } else if (model[colId] && model[colId].color) {
    cell = React__default.createElement(EditColorPicker, {
      colId: colId,
      color: value,
      onColorChange: onColorChange,
      rowId: rowId
    }); // file dropzone cell
  } else if (file) {
    cell = React__default.createElement(EditDropzoneCell, {
      path: file.path,
      rowId: rowId,
      uploadFileCb: uploadFileCb
    });
  } else if (model[colId] && model[colId].lookup) {
    cell = React__default.createElement(AsyncDropdownCell, {
      colId: colId,
      inputClass: editInputClass,
      lookup: model[colId].lookup,
      onBlur: onBlur,
      required: required,
      rowId: rowId,
      value: value
    });
  } else if (cellOptions) {
    cell = React__default.createElement(SelectCell, {
      colId: colId,
      inputClass: editInputClass,
      onBlur: onBlur,
      options: cellOptions,
      required: required,
      row: row,
      rowId: rowId,
      value: value
    });
  } else if (asyncFilter) {
    cell = React__default.createElement(TableListFilter, {
      clearInputAfterMatch: false,
      customFilter: mentorInputs.asyncFilter(asyncFilter),
      inputClass: editInputClass,
      matchOnEmpty: !required,
      name: colId,
      onMatch: onOptionMatch,
      options: cellOptions,
      portalRef: portalRef,
      required: required,
      rowId: rowId,
      value: value
    });
  } else if (type === 'datetime') {
    cell = React__default.createElement(TableDatePicker, {
      inputClass: editInputClass,
      name: colId,
      onBlur: onBlur,
      portalRef: portalRef,
      required: required,
      row: row,
      rowId: rowId,
      value: value
    }); // regular editable input cell
  } else {
    cell = React__default.createElement(EditInputCell, {
      colId: colId,
      inputClass: editInputClass,
      onBlur: onBlur,
      required: required,
      row: row,
      rowId: rowId,
      type: cellType,
      value: value
    });
  }

  return React__default.createElement("td", {
    className: cellClass,
    title: title
  }, cell);
};
Cell.propTypes = {
  asyncFilter: PropTypes__default.string,
  cellClass: PropTypes__default.string,
  cellOptions: PropTypes__default.arrayOf(PropTypes__default.oneOfType([PropTypes__default.string, PropTypes__default.object])),
  colId: PropTypes__default.string,
  customClasses: PropTypes__default.object,
  customColumn: PropTypes__default.func,
  editMode: PropTypes__default.bool,
  model: PropTypes__default.object,
  onBlur: PropTypes__default.func,
  onOptionMatch: PropTypes__default.func,
  row: PropTypes__default.object,
  rowId: PropTypes__default.string,
  updatable: PropTypes__default.bool,
  value: PropTypes__default.oneOfType([PropTypes__default.string, PropTypes__default.number, PropTypes__default.object, PropTypes__default.bool, PropTypes__default.array])
};
Cell.defaultProps = {
  customClasses: {},
  model: {}
};

// Also can be expanded

var TableRow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TableRow, _PureComponent);

  function TableRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onExpandClick", function (event) {
      event.stopPropagation();

      _this.props._onExpandClick(_this.props.rowId);
    });

    _defineProperty(_assertThisInitialized(_this), "_onRowSelect", function (event) {
      _this.props._onRowSelect(_this.props.row);
    });

    _defineProperty(_assertThisInitialized(_this), "generateCustomFilter", function (col) {
      if (typeof _this.props.generateCustomFilter === 'function') {
        return _this.props.generateCustomFilter(col, _this.props.row);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "onExtraColClick", function (onClick) {
      if (typeof onClick === 'function') {
        onClick(_this.props.row);
      }
    });

    return _this;
  }

  _createClass(TableRow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          allowSelection = _this$props.allowSelection,
          columns = _this$props.columns,
          customClasses = _this$props.customClasses,
          customColumns = _this$props.customColumns,
          draggable = _this$props.draggable,
          dropType = _this$props.dropType,
          editDraggable = _this$props.editDraggable,
          editMode = _this$props.editMode,
          expandable = _this$props.expandable,
          expanded = _this$props.expanded,
          extraColumns = _this$props.extraColumns,
          model = _this$props.model,
          onBlur = _this$props.onBlur,
          onOptionMatch = _this$props.onOptionMatch,
          onColorChange = _this$props.onColorChange,
          onDeleteImageClick = _this$props.onDeleteImageClick,
          onDeleteTokenClick = _this$props.onDeleteTokenClick,
          onInsertTokenClick = _this$props.onInsertTokenClick,
          portalRef = _this$props.portalRef,
          selectedRows = _this$props.selectedRows,
          rowSelected = _this$props.rowSelected,
          row = _this$props.row,
          rowId = _this$props.rowId,
          uploadFileCb = _this$props.uploadFileCb;

      var rowClass = _defineProperty({
        'table-row': true,
        'table-row-selected': rowSelected
      }, customClasses.tableRow, !!customClasses.tableRow); // table row to display


      var tableRow = React__default.createElement("tr", {
        className: classNames(rowClass)
      }, expandable && React__default.createElement(ExpandIcon, {
        expanded: expanded,
        onClick: this._onExpandClick
      }), extraColumns.map(function (col, i) {
        return React__default.createElement("td", {
          className: classNames("table-cell-view text-center", {
            "apm-cursor-p": typeof col.onClick === 'function'
          }),
          key: "".concat(rowId, "-extra-").concat(i),
          onClick: _this2.onExtraColClick.bind(null, col.onClick)
        }, col.cell);
      }), allowSelection && React__default.createElement("td", {
        className: "table-cell-view table-cell-selector"
      }, React__default.createElement("div", {
        className: "pretty p-icon"
      }, React__default.createElement("input", {
        checked: !!rowSelected,
        onChange: this._onRowSelect,
        type: "checkbox"
      }), React__default.createElement("div", {
        className: "state p-info"
      }, React__default.createElement("i", {
        className: "icon fal fa-check"
      }), React__default.createElement("label", null)))), columns.map(function (col) {
        return React__default.createElement(Cell, {
          asyncFilter: _this2.generateCustomFilter(col),
          cellOptions: col.options,
          cellType: col.type,
          colId: col.id,
          customClasses: customClasses,
          customColumn: customColumns[col.id],
          editMode: editMode,
          file: col.file,
          key: col.id,
          model: model,
          multiline: model[col.id] ? model[col.id].multiline : undefined,
          onBlur: onBlur,
          onOptionMatch: onOptionMatch,
          onColorChange: onColorChange,
          onDeleteImageClick: onDeleteImageClick,
          onDeleteTokenClick: onDeleteTokenClick,
          onInsertTokenClick: onInsertTokenClick,
          portalRef: portalRef,
          required: col.required,
          row: row,
          rowId: rowId,
          rowSelected: rowSelected,
          tableOnInsert: col.tableOnInsert,
          tokenize: col.tokenize,
          type: col.type,
          updatable: col.updateable,
          uploadFileCb: uploadFileCb,
          value: row[col.id]
        });
      }));

      if (!!dropType && !rowSelected) {
        var colSpan = expandable ? columns.length + 2 : columns.length + 1;
        return React__default.createElement(TableRowDroppable, {
          colSpan: colSpan,
          desc: row.desc,
          dropType: dropType,
          name: row.name,
          rowId: rowId
        }, tableRow); // if view row is draggable, wrap row in a draggable component
      } else if (!editMode && draggable && rowSelected) {
        return React__default.createElement(TableRowDraggable, {
          dragCb: draggable.dragCb,
          dragType: draggable.dragType,
          selectedRows: selectedRows,
          rowId: rowId
        }, tableRow); // else if edit mode and edit row is draggable, wrap it
      } else if (editMode && editDraggable && rowSelected) {
        return React__default.createElement(TableRowDraggable, {
          dragCb: editDraggable.dragCb,
          dragType: editDraggable.dragType,
          selectedRows: selectedRows,
          rowId: rowId
        }, tableRow);
      }

      return tableRow;
    }
  }]);

  return TableRow;
}(React.PureComponent);

_defineProperty(TableRow, "propTypes", {
  columns: PropTypes__default.arrayOf(PropTypes__default.object),
  customColumns: PropTypes__default.object,
  draggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.shape({
    dragType: PropTypes__default.string,
    dragCb: PropTypes__default.func
  })]),
  editDraggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.shape({
    editDragType: PropTypes__default.string,
    editDragCb: PropTypes__default.func
  })]),
  editMode: PropTypes__default.bool,
  expandable: PropTypes__default.bool,
  expanded: PropTypes__default.bool,
  model: PropTypes__default.object,
  onBlur: PropTypes__default.func,
  onOptionMatch: PropTypes__default.func,
  onDeleteTokenClick: PropTypes__default.func,
  rowSelected: PropTypes__default.bool,
  row: PropTypes__default.object,
  rowId: PropTypes__default.string,
  _onExpandClick: PropTypes__default.func
});

_defineProperty(TableRow, "defaultProps", {
  columns: [],
  customClasses: {},
  customColumns: {},
  draggable: false,
  editDraggable: false,
  editMode: false,
  expandable: false,
  extraColumns: [],
  model: {},
  row: {}
});

var TableBody =
/*#__PURE__*/
function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    var _this;

    _classCallCheck(this, TableBody);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableBody).call(this, props)); // @expandedRows: a hash map of all expanded rows
    // 	only used when the table body is expandable

    _defineProperty(_assertThisInitialized(_this), "_onExpandClick", function (rowId) {
      var newExpandedRows = Object.assign({}, _this.state.expandedRows, _defineProperty({}, rowId, !_this.state.expandedRows[rowId]));

      _this.setState({
        expandedRows: newExpandedRows
      });
    });

    _this.state = {
      expandedRows: {}
    };
    return _this;
  } // when a row is clicked, keep track if it needs to be expanded or not


  _createClass(TableBody, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          allowSelection = _this$props.allowSelection,
          columns = _this$props.columns,
          customClasses = _this$props.customClasses,
          editMode = _this$props.editMode,
          rowData = _this$props.rowData,
          dragProperties = _this$props.dragProperties,
          dropType = _this$props.dropType,
          customColumns = _this$props.customColumns,
          expandable = _this$props.expandable,
          ExpandComponent = _this$props.ExpandComponent,
          extraColumns = _this$props.extraColumns,
          generateCustomFilter = _this$props.generateCustomFilter,
          model = _this$props.model,
          portalRef = _this$props.portalRef,
          selectedRows = _this$props.selectedRows,
          uploadFileCb = _this$props.uploadFileCb,
          _onBlur = _this$props._onBlur,
          _onColorChange = _this$props._onColorChange,
          _onDeleteImageClick = _this$props._onDeleteImageClick,
          _onDeleteTokenClick = _this$props._onDeleteTokenClick,
          _onInsertTokenClick = _this$props._onInsertTokenClick,
          _onOptionMatch = _this$props._onOptionMatch,
          _onRowSelect = _this$props._onRowSelect;
      var expandedRows = this.state.expandedRows;
      var rows = []; // if not in edit mode and edit mode isn't being force toggled

      rowData.forEach(function (row, i) {
        rows.push(React__default.createElement(TableRow, {
          allowSelection: allowSelection,
          columns: columns,
          customClasses: customClasses,
          customColumns: customColumns,
          draggable: dragProperties.draggable,
          dropType: dropType,
          editDraggable: dragProperties.editDraggable,
          editMode: editMode,
          expandable: expandable,
          expanded: expandedRows[row.id],
          extraColumns: extraColumns,
          generateCustomFilter: generateCustomFilter,
          key: row.id,
          model: model,
          onOptionMatch: _onOptionMatch,
          onBlur: _onBlur,
          onColorChange: _onColorChange,
          onDeleteImageClick: _onDeleteImageClick,
          onDeleteTokenClick: _onDeleteTokenClick,
          onInsertTokenClick: _onInsertTokenClick,
          portalRef: portalRef,
          selectedRows: selectedRows,
          rowSelected: !!selectedRows[row.id],
          row: row,
          rowId: row.id,
          uploadFileCb: uploadFileCb,
          _onExpandClick: _this2._onExpandClick,
          _onRowSelect: _onRowSelect
        })); // if rows are expandable and the row is expanded

        if (expandable && expandedRows[row.id]) {
          rows.push(React__default.createElement("tr", {
            key: "".concat(row.id, "-").concat(i)
          }, React__default.createElement("td", {
            colSpan: extraColumns.length + 1
          }), React__default.createElement("td", {
            colSpan: columns.length + 1,
            style: {
              borderLeft: '1px solid #667587'
            }
          }, React__default.cloneElement(ExpandComponent, {
            row: row
          }))));
        }
      });
      var classList = classNames(_defineProperty({}, customClasses.tableBody, !!customClasses.tableBody));
      return React__default.createElement("tbody", {
        className: classList
      }, rows);
    }
  }]);

  return TableBody;
}(React.Component);

_defineProperty(TableBody, "propTypes", {
  columns: PropTypes__default.arrayOf(PropTypes__default.object).isRequired,
  customColumns: PropTypes__default.object,
  editMode: PropTypes__default.bool,
  expandable: PropTypes__default.bool,
  extraColumns: PropTypes__default.array,
  ExpandComponent: PropTypes__default.element,
  dragProperties: PropTypes__default.shape({
    draggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.object]),
    editDraggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.object])
  }),
  model: PropTypes__default.object,
  rowData: PropTypes__default.arrayOf(PropTypes__default.object).isRequired,
  selectedRows: PropTypes__default.object,
  _onBlur: PropTypes__default.func,
  _onOptionMatch: PropTypes__default.func
});

_defineProperty(TableBody, "defaultProps", {
  columns: [],
  customClasses: {},
  dragProperties: {
    draggable: false,
    editDraggable: false
  },
  dropType: '',
  expandable: false,
  extraColumns: [],
  rowData: [],
  selectedRows: {}
});

var NoResults = function NoResults(props) {
  return React__default.createElement("div", {
    className: "table-no-results text-success text-center font-bold"
  }, "No Results");
};

// the total number of entries

var RecordCount = function RecordCount(_ref) {
  var currentPage = _ref.currentPage,
      entriesViewable = _ref.entriesViewable,
      pageSize = _ref.pageSize,
      recordCount = _ref.recordCount;
  return React__default.createElement("p", null, "Showing ", React__default.createElement("b", null, entriesViewable > 0 ? pageSize * (currentPage - 1) + 1 : 0), " to ", React__default.createElement("b", null, pageSize * (currentPage - 1) + entriesViewable), " of ", React__default.createElement("b", null, recordCount), " records");
};
RecordCount.propTypes = {
  currentPage: PropTypes__default.number.isRequired,
  entriesViewable: PropTypes__default.number.isRequired,
  pageSize: PropTypes__default.number.isRequired,
  recordCount: PropTypes__default.number.isRequired
};
RecordCount.defaultProps = {
  currentPage: 1,
  entriesViewable: 25,
  pageSize: 25,
  recordCount: 0
};

var PageDropdown = function PageDropdown(_ref) {
  var currentPage = _ref.currentPage,
      onChange = _ref.onChange,
      pageSize = _ref.pageSize,
      recordCount = _ref.recordCount;
  var maxPage = Math.ceil(recordCount / pageSize); // invalid page counts render nothing

  if (maxPage <= 0 || maxPage === Infinity) {
    return null;
  }

  var _onBlur = function _onBlur(err, value) {
    if (err) return;

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return React__default.createElement("div", {
    className: "form-inline"
  }, React__default.createElement("div", {
    className: "form-group"
  }, React__default.createElement("label", null, "Page number: "), React__default.createElement("div", {
    className: "input-group"
  }, React__default.createElement(mentorInputs.IntegerInput, {
    className: "m-l-sm m-r-xs",
    "data-testid": "pagedropdown",
    max: maxPage,
    min: 1,
    name: "page-dropdown",
    onBlur: _onBlur,
    value: currentPage
  }), React__default.createElement("div", {
    className: "input-group-addon",
    style: {
      backgroundColor: 'transparent',
      border: 'none'
    }
  }, "of ", maxPage))));
};
PageDropdown.propTypes = {
  currentPage: PropTypes__default.number,
  onChange: PropTypes__default.func,
  pageSize: PropTypes__default.number,
  recordCount: PropTypes__default.number
};
PageDropdown.defaultProps = {
  currentPage: 1,
  pageSize: 25,
  recordCount: 0
};

var NextButton = function NextButton(_ref) {
  var hasNext = _ref.hasNext,
      onClick = _ref.onClick;
  return React__default.createElement("button", {
    disabled: !hasNext,
    onClick: onClick,
    type: "button"
  }, "Next ", React__default.createElement("i", {
    className: "fas fa-chevron-right"
  }));
};
NextButton.propTypes = {
  hasNext: PropTypes__default.bool,
  onClick: PropTypes__default.func
};
NextButton.defaultProps = {
  hasNext: false
};

var PreviousButton = function PreviousButton(_ref) {
  var hasPrevious = _ref.hasPrevious,
      onClick = _ref.onClick;
  return React__default.createElement("button", {
    disabled: !hasPrevious,
    onClick: onClick,
    type: "button"
  }, React__default.createElement("i", {
    className: "fas fa-chevron-left"
  }), " Previous");
};
PreviousButton.propTypes = {
  hasPrevious: PropTypes__default.bool,
  onClick: PropTypes__default.func
};
PreviousButton.defaultProps = {
  hasPrevious: false
};

__$styleInject(".table-footer {\n  width: 100%;\n  padding: 15px 25px;\n  background: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 25;\n}\n.table-footer select {\n  background-color: #FFFFFF;\n  background-image: none;\n  border: 1px solid #003852;\n  border-radius: 1px;\n  color: #16181e;\n  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;\n}\n.table-footer select:focus {\n  outline: none;\n  border-color: #8DC63F;\n}\n.table-footer button:first-child {\n  margin-right: 30px;\n}\n.table-footer button {\n  padding: 0;\n  background: white;\n  outline: none;\n  border: 0;\n}\n.table-footer button:hover:enabled {\n  color: #8dc63f;\n}\n.table-footer button[disabled] {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n");

var TableFooter = function TableFooter(_ref) {
  var currentPage = _ref.currentPage,
      entriesViewable = _ref.entriesViewable,
      onGetPage = _ref.onGetPage,
      onNext = _ref.onNext,
      onPrevious = _ref.onPrevious,
      pageSize = _ref.pageSize,
      recordCount = _ref.recordCount;

  if (recordCount === 0) {
    return null;
  }

  var hasNext = currentPage * pageSize < recordCount;
  var hasPrevious = currentPage > 1;
  return React__default.createElement("div", {
    className: "table-footer m-t-sm"
  }, React__default.createElement("div", null, React__default.createElement(PreviousButton, {
    hasPrevious: hasPrevious,
    onClick: onPrevious
  }), React__default.createElement(NextButton, {
    hasNext: hasNext,
    onClick: onNext
  })), React__default.createElement("div", {
    className: "text-center"
  }, React__default.createElement(RecordCount, {
    currentPage: currentPage,
    entriesViewable: entriesViewable,
    pageSize: pageSize,
    recordCount: recordCount
  })), React__default.createElement(PageDropdown, {
    currentPage: currentPage,
    onChange: onGetPage,
    pageSize: pageSize,
    recordCount: recordCount
  }));
};
TableFooter.propTypes = {
  currentPage: PropTypes__default.number,
  entriesViewable: PropTypes__default.number,
  onGetPage: PropTypes__default.func,
  onNext: PropTypes__default.func,
  onPrevious: PropTypes__default.func,
  pageSize: PropTypes__default.number,
  recordCount: PropTypes__default.number
};
TableFooter.defaultProps = {
  currentPage: 1,
  pageSize: 25,
  recordCount: 0
};

// Describes the layout of the table

var TableMain = function TableMain(_ref) {
  var _React$createElement;

  var columns = _ref.columns,
      customClasses = _ref.customClasses,
      dragProperties = _ref.dragProperties,
      dropType = _ref.dropType,
      events = _ref.events,
      expandable = _ref.expandable,
      extraColumns = _ref.extraColumns,
      generateCustomFilter = _ref.generateCustomFilter,
      id = _ref.id,
      model = _ref.model,
      numRowsSelected = _ref.numRowsSelected,
      pageProperties = _ref.pageProperties,
      recordProperties = _ref.recordProperties,
      rowProperties = _ref.rowProperties,
      selectedRows = _ref.selectedRows,
      sort = _ref.sort,
      _onRowSelect = _ref._onRowSelect,
      _onRowSelectAll = _ref._onRowSelectAll;
  var classList = classNames(_defineProperty({
    'table-main': true
  }, customClasses.table, !!customClasses.table));
  var portalRef = React.useRef(null);
  return React__default.createElement("div", {
    className: "table-main-container",
    ref: portalRef
  }, React__default.createElement("div", {
    className: "table-content"
  }, pageProperties.recordCount > 0 ? React__default.createElement("table", {
    className: classList,
    id: id
  }, React__default.createElement(TableHeader, {
    allowSelection: rowProperties.allowSelection,
    allRowsSelected: numRowsSelected === rowProperties.data.length,
    columns: columns,
    customClasses: customClasses,
    editMode: rowProperties.editMode,
    expandable: expandable,
    extraColumns: extraColumns,
    sort: sort,
    _onRowSelectAll: _onRowSelectAll,
    _onSort: events.onSort
  }), React__default.createElement(TableBody, {
    allowSelection: rowProperties.allowSelection,
    columns: columns,
    customClasses: customClasses,
    customColumns: rowProperties.customColumns,
    dragProperties: dragProperties,
    dropType: dropType,
    editMode: rowProperties.editMode,
    extraColumns: extraColumns,
    ExpandComponent: rowProperties.ExpandComponent,
    expandEditable: rowProperties.expandEditable,
    expandable: expandable,
    generateCustomFilter: rowProperties.generateCustomFilter,
    model: model,
    portalRef: portalRef.current,
    rowData: rowProperties.data,
    selectedRows: selectedRows,
    uploadFileCb: rowProperties.uploadFileCb,
    _onBlur: rowProperties._editOnBlur,
    _onOptionMatch: rowProperties._editOnOptionMatch,
    _onColorChange: rowProperties._editOnColorChange,
    _onDeleteImageClick: rowProperties._editOnDeleteImageClick,
    _onDeleteTokenClick: rowProperties._editOnDeleteTokenClick,
    _onInsertTokenClick: rowProperties._editOnInsertTokenClick,
    _onRowSelect: _onRowSelect
  })) : React__default.createElement(NoResults, null)), React__default.createElement(TableFooter, (_React$createElement = {
    entriesViewable: recordProperties.entriesViewable,
    currentPage: recordProperties.currentPage,
    recordCount: recordProperties.count
  }, _defineProperty(_React$createElement, "currentPage", pageProperties.currentPage), _defineProperty(_React$createElement, "pageSize", pageProperties.pageSize), _defineProperty(_React$createElement, "recordCount", pageProperties.recordCount), _defineProperty(_React$createElement, "onNext", events.onNext), _defineProperty(_React$createElement, "onPrevious", events.onPrevious), _defineProperty(_React$createElement, "onGetPage", events.onGetPage), _React$createElement)));
};
TableMain.propTypes = {
  columns: PropTypes__default.arrayOf(PropTypes__default.object),
  model: PropTypes__default.object,
  dragProperties: PropTypes__default.shape({
    draggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.shape({
      dragType: PropTypes__default.string,
      dragCb: PropTypes__default.func
    })]),
    editDraggable: PropTypes__default.oneOfType([PropTypes__default.bool, PropTypes__default.shape({
      editDragType: PropTypes__default.string,
      editDragCb: PropTypes__default.func
    })])
  }),
  recordProperties: PropTypes__default.shape({
    entriesViewable: PropTypes__default.number,
    count: PropTypes__default.number,
    currentPage: PropTypes__default.number
  }),
  sort: PropTypes__default.shape({
    icons: PropTypes__default.object,
    properties: PropTypes__default.object
  }),
  events: PropTypes__default.shape({
    onNext: PropTypes__default.func,
    onPrevious: PropTypes__default.func,
    onGetPage: PropTypes__default.func,
    onSort: PropTypes__default.func
  }),
  rowProperties: PropTypes__default.shape({
    data: PropTypes__default.arrayOf(PropTypes__default.object),
    insertRowCb: PropTypes__default.func,
    ExpandComponent: PropTypes__default.element,
    expandEditable: PropTypes__default.bool,
    customColumns: PropTypes__default.object,
    _onBlur: PropTypes__default.func,
    _onChange: PropTypes__default.func
  }),
  pageProperties: PropTypes__default.shape({
    enabled: PropTypes__default.bool,
    currentPage: PropTypes__default.number,
    pageSize: PropTypes__default.number,
    recordCount: PropTypes__default.number
  })
};
TableMain.defaultProps = {
  columns: [],
  customClasses: {},
  dragProperties: {},
  events: {},
  pageProperties: {
    enabled: true,
    recordCount: 0
  },
  recordProperties: {
    count: 0,
    currentPage: 1,
    entriesViewable: 25
  },
  rowProperties: {
    data: []
  },
  sort: {}
};

var MENTOR_LOGO_LEFT_PATH = "M 0,200 v 200 h 39 39 v -88.32 c 0,-52.457 0.148,-88.474 0.364,-88.7 0.452,-0.473 1.202,-44.76 1.606,-94.914 l 0.03,-3.734 0.9,1.076 c 1.66507,2.62974 67.30297,66.16423 68.25108,66.95795 0.45858,0.73769 3.627,1.0352 4.84363,0.56794 2.47529,-1.95604 36.86313,-41.98317 38.81136,-44.27433 4.74599,-4.52232 -0.51279,-7.4618 -2.21342,-9.93159 C 188.80969,135.92414 63.639195,4.4253259 57.376547,-0.11122888 L -1.6749927,-0.06203677 0,200";
var MENTOR_LOGO_RIGHT_PATH = "M 330.7417,0.01981344 C 326.35671,4.7924267 167.09994,197.80398 164.48899,200.55076 c -1.36169,1.55463 -1.16506,4.70413 -0.169,6.151 0.63368,1.06232 31.70999,34.79199 35.70675,39.32451 1.79131,1.98312 8.95044,3.24974 12.451,-0.036 2.73399,-3.11948 104.79355,-117.51423 109.27659,-121.68521 0.1076,14.23648 0.10245,39.80001 0.20567,58.89494 -0.047,1.87 -0.057,51.415 -0.023,110.1 L 322,400 h 39 39 V 200 0 h -34.553 c -1.24717,0 -33.6817,0.00251564 -34.7053,0.01981344"; // A loading component to show to the user while data is retrieved

var Loading = function Loading(props) {
  return React__default.createElement("div", {
    className: "table-loading"
  }, React__default.createElement("svg", {
    width: "50",
    height: "50",
    viewBox: "0 0 50 50",
    style: {
      overflow: 'visible'
    }
  }, React__default.createElement("circle", {
    cx: "25",
    cy: "25",
    r: "25",
    fill: "none",
    stroke: "#8dc63f",
    strokeWidth: "4",
    strokeDasharray: "125, 10, 10, 10"
  }, React__default.createElement("animateTransform", {
    attributeName: "transform",
    attributeType: "XML",
    type: "rotate",
    from: "0 25 25",
    to: "360 25 25",
    dur: "0.75s",
    repeatCount: "indefinite"
  })), React__default.createElement("circle", {
    cx: "25",
    cy: "25",
    r: "18",
    fill: "#8dc63f"
  }), React__default.createElement("path", {
    d: MENTOR_LOGO_LEFT_PATH,
    transform: "translate(15, 15) scale(0.05)",
    fill: "#003852"
  }), React__default.createElement("path", {
    d: MENTOR_LOGO_RIGHT_PATH,
    transform: "translate(15, 15) scale(0.05)",
    fill: "white"
  })));
};

__$styleInject(".table-container {\n  width: 100%;\n  max-width: 100%;\n  background: white;\n  height: 100%;\n}\n.table-main-container {\n  overflow: auto;\n  height: calc(100% - 65px);\n  display: flex;\n  flex-direction: column;\n  background: white;\n  position: relative;\n}\n.table-main-container .table-content {\n  flex: 1;\n}\n.table-main {\n  border-spacing: 0;\n  padding: 0;\n  margin-top: 0;\n  border-collapse: separate;\n  width: 100%;\n  background: white;\n  table-layout: fixed;\n}\n.apm-table-map {\n  height: 100%;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 3;\n}\n.apm-table-map-appear {\n  right: 0;\n}\n.apm-table-map-appear-active {\n  right: 50%;\n  transition: right 400ms ease-in-out;\n}\n.apm-table-map-enter {\n  right: 0;\n}\n.apm-table-map-enter-active {\n  border-right: 5px solid #8DC63F;\n  right: 50%;\n  transition: right 400ms ease-in-out;\n}\n.apm-table-map-enter-done {\n  border-right: 5px solid #8DC63F;\n  right: 50%;\n}\n.apm-table-map-exit {\n  border-right: 5px solid #8DC63F;\n  right: 50%;\n}\n.apm-table-map-exit-active {\n  border-right: 5px solid #8DC63F;\n  right: 0;\n  transition: right 400ms ease-in-out;\n}\n.apm-table-map-exit-done {\n  right: 0;\n}\n.apm-table-map-display {\n  height: 100%;\n  display: flex;\n  align-self: flex-end;\n}\n.table-loading {\n  margin: 75px;\n  text-align: center;\n}\n.table-no-results {\n  position: relative;\n  top: 20%;\n  font-size: 3rem;\n  padding: 50px;\n}\n.table-popover {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 4;\n  left: 100%;\n}\n.table-popover-appear {\n  left: 100%;\n}\n.table-popover-appear-active {\n  left: 0;\n  transition: left 400ms ease-in-out;\n}\n.table-popover-enter {\n  left: 100%;\n}\n.table-popover-enter-active {\n  left: 0;\n  transition: left 400ms ease-in-out;\n}\n.table-popover-enter-done {\n  left: 0;\n}\n.table-popover-exit {\n  left: 0;\n}\n.table-popover-exit-active {\n  left: 100%;\n  transition: left 400ms ease-in-out;\n}\n.table-popover-exit-done {\n  left: 100%;\n}\n.table-row-hierarchy:last-child .table-cell-view {\n  border-bottom: 1px solid #dfe6ee;\n}\n.table-row-hierarchy:hover {\n  box-shadow: 0 2px 14px 0 rgba(176, 186, 197, 0.6);\n}\n.table-row-hierarchy:nth-child(odd) {\n  background: #f4f7fa;\n}\n.table-row-hierarchy-cell {\n  position: relative;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  height: 73px;\n  box-sizing: border-box;\n}\n.table-hierarchy-branch {\n  border: none;\n  border-left: 2px dotted grey;\n  position: absolute;\n  top: 0;\n  width: 0;\n  height: 73px;\n}\n.table-hierarchy-container {\n  border: none;\n  border-left: 2px dotted grey;\n  position: absolute;\n  top: 0;\n  width: 0;\n}\n.table-hierarchy-container .table-hierarchy-content {\n  position: absolute;\n  top: 10px;\n  left: 15px;\n  height: 42px;\n}\n.table-hierarchy-container hr {\n  border-top: 2px dotted grey;\n  width: 10px;\n  margin-top: 34px;\n}\n");

var sortMap = {
  ASC: 'DESC',
  DESC: 'ASC'
};
var DEFAULT_PAGE = 1; // Table with filters to be rendered after data is loaded

var Table =
/*#__PURE__*/
function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_loadNextPage", function () {
      _this.props.handleTableChange(_this.props.pageSize, _this.props.currentPage + 1, _this.props.sortId, _this.props.sortDir, _this.props.filters);
    });

    _defineProperty(_assertThisInitialized(_this), "_loadPrevPage", function () {
      _this.props.handleTableChange(_this.props.pageSize, _this.props.currentPage - 1, _this.props.sortId, _this.props.sortDir, _this.props.filters);
    });

    _defineProperty(_assertThisInitialized(_this), "_loadGetPage", function (pageNum) {
      _this.props.handleTableChange(_this.props.pageSize, pageNum, _this.props.sortId, _this.props.sortDir, _this.props.filters);
    });

    _defineProperty(_assertThisInitialized(_this), "_loadSort", function (sortColId) {
      var sortId = _this.props.sortId;
      var sortDir; // If same column send back opposite direction

      if (sortId === sortColId) {
        sortDir = sortMap[_this.props.sortDir] || 'ASC'; // else if new column, start with desc ordering
      } else {
        sortId = sortColId;
        sortDir = sortMap.ASC;
      }

      _this.props.handleTableChange(_this.props.pageSize, _this.props.currentPage, sortId, sortDir, _this.props.filters);
    });

    _defineProperty(_assertThisInitialized(_this), "_loadFilterChange", function (filters) {
      _this.props.handleTableChange(_this.props.pageSize, DEFAULT_PAGE, _this.props.sortId, _this.props.sortDir, filters);
    });

    _defineProperty(_assertThisInitialized(_this), "exportTableInsert", function () {
      var _this$props = _this.props,
          exportTable = _this$props.exportTable,
          filters = _this$props.filters;

      if (typeof exportTable === 'function') {
        exportTable(filters);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onEditClick", function () {
      _this.setState({
        editMode: !_this.state.editMode
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onInsertClick", function (insertType) {
      _this.setState({
        insertMode: !_this.state.insertMode,
        insertType: insertType
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onInsertTokenClick", function (rowId, colId, token) {
      var insertTokenCb = _this.props.insertTokenCb;

      if (typeof insertTokenCb === 'function') {
        insertTokenCb(rowId, colId, token);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDeleteClick", function () {
      var deleteCb = _this.props.deleteCb;
      var selectedRows = _this.state.selectedRows;

      if (typeof deleteCb === 'function') {
        var rowIds = []; // only add row ids that user has selected

        Object.keys(selectedRows).forEach(function (rowId) {
          if (!!selectedRows[rowId]) {
            rowIds.push(rowId);
          }
        });
        deleteCb(rowIds);

        _this.setState({
          numRowsSelected: 0,
          selectedRows: {}
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDeleteTokenClick", function (rowId, colId, token) {
      var deleteTokenCb = _this.props.deleteTokenCb;

      if (typeof deleteTokenCb === 'function') {
        deleteTokenCb(rowId, colId, token);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDeleteImageClick", function (rowId, colId) {
      var updateCb = _this.props.updateCb;

      if (typeof updateCb === 'function') {
        updateCb(rowId, _defineProperty({}, colId, null));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDisplayColChange", function (event) {
      var colId = event.target.name;
      var isChecked = event.target.checked;
      var model = Object.assign({}, _this.state.model);

      var columns = _this.state.columns.slice();

      var colIndex = columns.findIndex(function (col) {
        return col.id === colId;
      });
      model[colId].display = isChecked;
      columns[colIndex].display = isChecked;

      _this.setState({
        model: model,
        columns: columns
      });

      if (typeof _this.props.onDisplayColChange === 'function') {
        var displayCols = [];
        columns.forEach(function (col) {
          if (col.display !== false) {
            displayCols.push(col.id);
          }
        });

        _this.props.onDisplayColChange(displayCols);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onQuickViewColChange", function (colIds) {
      var newModel = Object.assign({}, _this.state.model);
      var modelColIds = Object.keys(_this.state.model);
      modelColIds.forEach(function (colId) {
        newModel[colId].display = !!colIds[colId] || false;
      });

      _this.setState({
        columns: convertModel(newModel),
        model: newModel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function (rowId, updateData) {
      var updateCb = _this.props.updateCb;

      if (typeof updateCb === 'function') {
        updateCb(rowId, updateData);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onOptionMatch", function (rowId, colId, option) {
      var updateCb = _this.props.updateCb;

      if (typeof updateCb === 'function') {
        updateCb(rowId, _defineProperty({}, colId, option));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_uploadFileCb", function (rowId, path, files) {
      var uploadFileCb = _this.props.uploadFileCb;

      if (typeof uploadFileCb === 'function') {
        uploadFileCb(rowId, path, files);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onSubmitInsertion", function (insertData) {
      var insertCb = _this.props.insertCb;

      if (typeof insertCb === 'function') {
        insertCb(insertData, _this.state.insertType);
      }

      if (_this.state.insertType === 'single') {
        _this.setState({
          insertMode: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onRowSelect", function (row) {
      var data = _this.props.data;
      var _this$state = _this.state,
          numRowsSelected = _this$state.numRowsSelected,
          selectedRows = _this$state.selectedRows;
      var isRowSelected = !selectedRows[row.id];
      var numSelected = isRowSelected ? numRowsSelected + 1 : numRowsSelected - 1;
      var newSelectedRows = Object.assign({}, selectedRows);

      if (isRowSelected) {
        newSelectedRows[row.id] = row;
      } else {
        delete newSelectedRows[row.id];
      } // user manually selected all rows


      _this.allRowsSelected = Object.keys(newSelectedRows).length === data.length;

      _this.setState({
        numRowsSelected: numSelected,
        selectedRows: newSelectedRows
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onRowSelectAll", function (event) {
      event.stopPropagation();
      var data = _this.props.data;
      _this.allRowsSelected = !_this.allRowsSelected;
      var newSelectedRows = {};

      if (_this.allRowsSelected) {
        data.forEach(function (row) {
          newSelectedRows[row.id] = row;
        });
      }

      _this.setState({
        numRowsSelected: _this.allRowsSelected ? data.length : 0,
        selectedRows: newSelectedRows
      });
    });

    _defineProperty(_assertThisInitialized(_this), "sortFilterOptions", function (filterOptions) {
      filterOptions.sort(function (col1, col2) {
        if (col1.category < col2.category) {
          return -1;
        }

        if (col1.category > col2.category) {
          return 1;
        }

        return 0;
      });
      return filterOptions;
    });

    _defineProperty(_assertThisInitialized(_this), "prepColumnsForHeader", function (columns) {
      return columns.filter(function (col) {
        return !!col.category && !col.hidden;
      }).map(function (col) {
        return {
          id: col.id,
          category: col.category,
          display: col.display
        };
      }).sort(function (col1, col2) {
        if (col1.category < col2.category) return -1;
        if (col1.category > col2.category) return 1;
        return 0;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLayout", function () {
      var customClasses = _this.props.customClasses;
      var recordProperties = {
        entriesViewable: _this.props.data.length,
        currentPage: _this.props.currentPage,
        count: _this.props.recordCount
      };
      var filterOptions = lodash.cloneDeep(_this.props.columns);
      filterOptions = _this.sortFilterOptions(filterOptions);
      filterOptions.forEach(function (option) {
        if (option.asyncFilter) {
          option.asyncFilter = mentorInputs.asyncFilter(option.asyncFilter);
        }
      });
      var HeaderComponent = React__default.createElement(Header, {
        filter: {
          disabled: _this.props.queryDisabled,
          enableQueryOnClick: _this.props.enableQueryOnClick,
          exportSearch: typeof _this.props.exportTable === 'function' ? _this.exportTableInsert : null,
          initTokens: _this.props.filters,
          onTokenAdd: _this._loadFilterChange,
          onTokenRemove: _this._loadFilterChange,
          options: filterOptions
        },
        toolbar: {
          columns: _this.prepColumnsForHeader(_this.state.columns),
          csvURL: _this.props.csvURL,
          customToolbarButtons: _this.props.customToolbarButtons,
          deletable: _this.props.deletable,
          editable: _this.props.editable,
          editMode: _this.state.editMode,
          excelURL: _this.props.excelURL,
          getFiles: _this.props.getFiles,
          tableId: _this.props.id,
          insertable: _this.props.insertable,
          loading: _this.props.loading,
          multipleInsertion: _this.props.multipleInsertion,
          numRowsSelected: _this.state.numRowsSelected,
          onDeleteClick: _this._onDeleteClick,
          onDisplayColChange: _this._onDisplayColChange,
          onEditClick: _this._onEditClick,
          onInsertClick: _this._onInsertClick,
          onQuickViewColChange: _this._onQuickViewColChange,
          pdfURL: _this.props.pdfURL,
          quickViews: _this.props.quickViews,
          selectedRows: _this.state.selectedRows,
          singleInsertion: _this.props.singleInsertion,
          tooltipPlace: _this.props.tooltipPlace,
          viewColumns: _this.props.viewColumns
        }
      });
      var TableComponent = null;

      if (_this.props.loading) {
        TableComponent = React__default.createElement(Loading, null);
      } else {
        TableComponent = React__default.createElement(TableMain, {
          columns: _this.state.columns.filter(function (col) {
            return col.display !== false;
          }),
          customClasses: _this.props.customClasses,
          id: _this.props.id,
          model: _this.state.model,
          expandable: !!_this.props.ExpandComponent,
          extraColumns: _this.props.extraColumns,
          rowProperties: {
            allowSelection: _this.props.allowSelection,
            customColumns: _this.props.customColumns,
            data: _this.props.data,
            editMode: _this.state.editMode,
            ExpandComponent: _this.props.ExpandComponent,
            generateCustomFilter: _this.props.generateCustomFilter,
            uploadFileCb: _this._uploadFileCb,
            _editOnBlur: _this._onBlur,
            _editOnOptionMatch: _this._onOptionMatch,
            _editOnColorChange: _this._onBlur,
            _editOnDeleteImageClick: _this._onDeleteImageClick,
            _editOnDeleteTokenClick: _this._onDeleteTokenClick,
            _editOnInsertTokenClick: _this._onInsertTokenClick
          },
          recordProperties: recordProperties,
          dragProperties: {
            draggable: _this.props.draggable,
            editDraggable: _this.props.editDraggable
          },
          dropType: _this.props.dropType,
          pageProperties: {
            enabled: _this.props.pagination,
            currentPage: _this.props.currentPage,
            pageSize: _this.props.pageSize,
            recordCount: _this.props.recordCount
          },
          events: {
            onNext: _this._loadNextPage,
            onGetPage: _this._loadGetPage,
            onPrevious: _this._loadPrevPage,
            onSort: _this._loadSort
          },
          sort: {
            id: _this.props.sortId,
            ascending: _this.sortDir === 'ASC'
          },
          numRowsSelected: _this.state.numRowsSelected,
          selectedRows: _this.state.selectedRows,
          _onRowSelect: _this._onRowSelect,
          _onRowSelectAll: _this._onRowSelectAll
        });
      }

      if (typeof _this.props.customLayout === 'function') {
        return _this.props.customLayout(HeaderComponent, TableComponent);
      }

      var containerClasses = classNames(_defineProperty({
        'table-container': true
      }, customClasses.container, !!customClasses.container));
      return React__default.createElement("div", {
        className: containerClasses
      }, HeaderComponent, TableComponent);
    });

    _this.allRowsSelected = false; // @customColumns
    // @editMode(bool) - toggle for edit mode of table
    // @insertMode(bool) - toggle for insertion mode of table
    // @insertType(string) - type of insertion to use when
    // 	inserting records; either single or multiple
    // @model(Object) - template object describing how to render
    // 	the table
    // @numRowsSelected: number of rows currently selected
    // @selectedRows: map of all the rows the user has selected

    _this.state = {
      customColumns: _this.props.customColumns,
      columns: _this.props.columns.length > 0 ? lodash.cloneDeep(_this.props.columns) : convertModel(_this.props.model),
      editMode: false,
      insertMode: false,
      insertType: 'single',
      model: _this.props.model,
      numRowsSelected: 0,
      selectedRows: {}
    };
    return _this;
  }

  _createClass(Table, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        var selectedRows = this.state.selectedRows;
        var newSelectedRows = {};
        var numRowsSelected = 0; // need to cycle through the new data and turn off any
        // selected rows that were selected from the old data
        // and are not in the new data

        nextProps.data.forEach(function (row) {
          // if selected row is in new data add it to new
          // selected rows
          if (row && selectedRows[row.id]) {
            newSelectedRows[row.id] = row;
            numRowsSelected++;
          }
        });
        this.setState({
          numRowsSelected: numRowsSelected,
          selectedRows: newSelectedRows
        });
      }

      if (this.props.model !== nextProps.model) {
        this.setState({
          model: nextProps.model
        });
      }

      if (this.props.columns !== nextProps.columns) {
        var newColumns = nextProps.columns; // convert model if no columns were passed in

        if (!newColumns) {
          newColumns = convertModel(nextProps.model);
        }

        this.setState({
          model: nextProps.model,
          columns: newColumns
        });
      }
    } // Retrieve next page of records

  }, {
    key: "render",
    value: function render() {
      var insertMode = this.state.insertMode;
      return React__default.createElement(React__default.Fragment, null, insertMode && React__default.createElement(InsertForm, {
        initInsertData: this.props.initInsertData,
        formFields: !!this.props.formFields ? lodash.cloneDeep(this.props.formFields) : lodash.cloneDeep(this.state.columns),
        onDisable: this._onInsertClick,
        onSubmit: this._onSubmitInsertion,
        resetForm: this.state.insertType === 'multiple'
      }), this.renderLayout());
    }
  }]);

  return Table;
}(React.Component);

_defineProperty(Table, "propTypes", {
  allowSelection: PropTypes__default.bool,
  csvURL: PropTypes__default.string,
  excelURL: PropTypes__default.string,
  pdfURL: PropTypes__default.string,
  currentPage: PropTypes__default.number,
  customClasses: PropTypes__default.shape({
    container: PropTypes__default.string,
    table: PropTypes__default.string,
    tableBody: PropTypes__default.string,
    tableHeader: PropTypes__default.string,
    tableHeaderRow: PropTypes__default.string,
    tableHeaderCell: PropTypes__default.string,
    tableRow: PropTypes__default.string,
    tableCell: PropTypes__default.string
  }),
  customColumns: PropTypes__default.object,
  customLayout: PropTypes__default.func,
  customToolbarButtons: PropTypes__default.arrayOf(PropTypes__default.shape({
    tip: PropTypes__default.string.isRequired,
    icon: PropTypes__default.element.isRequired,
    onClick: PropTypes__default.func.isRequired
  })),
  data: PropTypes__default.arrayOf(PropTypes__default.object),
  deletable: PropTypes__default.bool,
  deleteCb: PropTypes__default.func,
  deleteTokenCb: PropTypes__default.func,
  displayCols: PropTypes__default.arrayOf(PropTypes__default.string),
  draggable: PropTypes__default.shape({
    dragType: PropTypes__default.string,
    dragCb: PropTypes__default.func
  }),
  dropType: PropTypes__default.string,
  editable: PropTypes__default.bool,
  editDraggable: PropTypes__default.shape({
    editDragType: PropTypes__default.string,
    editDragCb: PropTypes__default.func
  }),
  enableQueryOnClick: PropTypes__default.bool,
  ExpandComponent: PropTypes__default.element,
  exportTable: PropTypes__default.func,
  extraColumns: PropTypes__default.arrayOf(PropTypes__default.shape({
    header: PropTypes__default.element,
    cell: PropTypes__default.element,
    onClick: PropTypes__default.func
  })),
  formFields: PropTypes__default.arrayOf(PropTypes__default.object),
  generateCustomFilter: PropTypes__default.func,
  getFiles: PropTypes__default.bool,
  id: PropTypes__default.string.isRequired,
  initInsertData: PropTypes__default.object,
  insertable: PropTypes__default.bool,
  insertCb: PropTypes__default.func,
  loading: PropTypes__default.bool,
  model: PropTypes__default.object,
  multipleInsertion: PropTypes__default.bool,
  pagination: PropTypes__default.bool,
  queryDisabled: PropTypes__default.bool,
  quickViews: PropTypes__default.arrayOf(PropTypes__default.object),
  recordCount: PropTypes__default.number,
  selectRecordCount: PropTypes__default.bool,
  singleInsertion: PropTypes__default.bool,
  sortDir: PropTypes__default.oneOf(['ASC', 'DESC']),
  sortId: PropTypes__default.string,
  tooltipPlace: PropTypes__default.string,
  updateCb: PropTypes__default.func,
  uploadFileCb: PropTypes__default.func,
  viewColumns: PropTypes__default.bool
});

_defineProperty(Table, "defaultProps", {
  allowSelection: true,
  csvURL: '',
  excelURL: '',
  pdfURL: '',
  columns: [],
  customClasses: {
    container: '',
    table: '',
    tableBody: '',
    tableHeader: '',
    tableHeaderRow: '',
    tableHeaderCell: '',
    tableRow: '',
    tableCell: '',
    tableEditCell: ''
  },
  customColumns: {},
  customToolbarButtons: [],
  customLayout: null,
  currentPage: DEFAULT_PAGE,
  data: [],
  deleteCb: null,
  deleteTokenCb: null,
  displayCols: [],
  draggable: null,
  dropType: '',
  editable: true,
  editDraggable: null,
  enableQueryOnClick: false,
  ExpandComponent: null,
  exportTable: null,
  extraColumns: [],
  filters: [],
  formFields: null,
  generateCustomFilters: null,
  getFiles: true,
  id: '',
  initInsertData: null,
  insertable: true,
  insertCb: null,
  model: {},
  multipleInsertion: true,
  pagination: true,
  queryDisabled: false,
  quickViews: [],
  selectRecordCount: true,
  singleInsertion: true,
  tooltipPlace: 'top',
  updateCb: null,
  uploadFileCb: null,
  viewColumns: true
});

exports.Table = Table;
exports.convertModel = convertModel;
