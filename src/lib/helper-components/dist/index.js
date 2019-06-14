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
var PropTypes = _interopDefault(require('prop-types'));
var cn = _interopDefault(require('classnames'));
var reactDom = require('react-dom');
var reactTransitionGroup = require('react-transition-group');
var lodash = require('lodash');
var fscreen = _interopDefault(require('fscreen'));

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

__$styleInject(".APMButton {\n  font-size: 16px;\n  border-radius: 3px;\n  background-color: #8DC63F;\n  border: none;\n  color: #FFF;\n  padding: 0px 18px;\n  transition: all 0.1s ease;\n}\n.APMButton:hover {\n  background-color: rgba(141, 198, 63, 0.8);\n}\n.APMButton:focus {\n  outline: none;\n}\n.APMButton:active {\n  background-color: #4D8000;\n}\n.APMButton-end-cap-left {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.APMButton-end-cap-right {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.APMButton-light {\n  background-color: #FFF;\n  border: 1px solid #8DC63F;\n  color: #8DC63F;\n}\n.APMButton-light:hover {\n  background-color: #8DC63F;\n  color: #FFF;\n}\n.APMButton-light:active {\n  transition: none;\n  background-color: #4D8000;\n  border-color: #4D8000;\n  color: #FFF;\n}\n.APMButton-outline {\n  background-color: #313531 !important;\n  border: 1px solid #8091A5;\n}\n.APMButton-outline:hover {\n  background-color: #8091A5 !important;\n  color: #FFF !important;\n}\n.APMButton-outline:active {\n  transition: none !important;\n  background-color: #667587 !important;\n  border-color: #667587 !important;\n  color: #FFF;\n}\n.APMButton-is-mini {\n  font-size: 14px;\n  padding: 2px 8px;\n}\n.APMButton-is-medium {\n  padding: 8px 14px;\n  min-width: 70px;\n  height: 40px;\n}\n.APMButton-is-capless {\n  border-right: none;\n  border-left: none;\n  border-radius: 0;\n}\n.APMButton-is-disabled,\n.APMButton-is-disabled:hover {\n  background-color: #B0BAC5;\n  border: 1px solid #B0BAC5;\n  color: #FFF;\n  cursor: not-allowed;\n}\n");

var Button = function Button(props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      children = props.children,
      medium = props.medium,
      isLight = props.isLight,
      isMini = props.isMini,
      isOutline = props.isOutline,
      isLeftEndCap = props.isLeftEndCap,
      isRightEndCap = props.isRightEndCap,
      isCapless = props.isCapless,
      isDisabled = props.isDisabled,
      onClick = props.onClick,
      btnAttributes = _objectWithoutProperties(props, ["className", "children", "medium", "isLight", "isMini", "isOutline", "isLeftEndCap", "isRightEndCap", "isCapless", "isDisabled", "onClick"]);

  return React__default.createElement("button", _extends({}, btnAttributes, {
    onClick: !isDisabled ? onClick : function () {},
    className: cn("APMButton", {
      "APMButton-light": isLight
    }, {
      "APMButton-outline": isOutline
    }, {
      "APMButton-is-mini": isMini
    }, {
      "APMButton-end-cap-left": isLeftEndCap
    }, {
      "APMButton-end-cap-right": isRightEndCap
    }, {
      "APMButton-is-capless": isCapless
    }, {
      "APMButton-is-disabled": isDisabled
    }, {
      "APMButton-is-medium": medium
    }, className)
  }), children);
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  medium: PropTypes.bool,
  isLight: PropTypes.bool,
  isMini: PropTypes.bool,
  isOutline: PropTypes.bool,
  isLeftEndCap: PropTypes.bool,
  isRightEndCap: PropTypes.bool,
  isCapless: PropTypes.bool,
  isDisabled: PropTypes.bool
};

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal(props) {
    var _this;

    _classCallCheck(this, Portal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portal).call(this, props));
    _this.root = document.querySelector('#modal-root');
    _this.el = document.createElement('div');
    return _this;
  }

  _createClass(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.root.appendChild(this.el);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.root.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      return reactDom.createPortal(this.props.children, this.el);
    }
  }]);

  return Portal;
}(React__default.Component);

var _default =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(_default, _React$Component2);

  function _default() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      hasError: false,
      info: '',
      error: ''
    });

    return _this2;
  }

  _createClass(_default, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({
        hasError: true,
        info: info.componentStack,
        error: error.message
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.hasError) return this.props.children;
      return React__default.createElement(Portal, null, React__default.createElement("div", {
        className: "apm-modal-overlay",
        style: {
          backgroundColor: '#fff',
          overflow: 'scroll'
        }
      }, React__default.createElement("div", {
        className: "container",
        style: {
          marginTop: 30,
          width: '65%'
        }
      }, React__default.createElement("div", {
        className: "panel panel-danger"
      }, React__default.createElement("div", {
        className: "panel-heading",
        style: {
          textAlign: 'center'
        }
      }, React__default.createElement("h2", null, "Something went wrong.")), React__default.createElement("div", {
        className: "panel-body"
      }, React__default.createElement("h2", null, this.state.error))), React__default.createElement("div", {
        className: "center-block"
      }, this.state.info.split('\n').map(function (line, i) {
        return React__default.createElement("p", {
          key: i
        }, " ", line, " ");
      })))));
    }
  }]);

  return _default;
}(React__default.Component);

var statusText = {
  400: 'Route not found',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Resource not found',
  500: 'Server Error'
};

var ErrorPage = function ErrorPage(props) {
  return React__default.createElement("div", {
    className: "middle-box text-center animated fadeInDown"
  }, React__default.createElement("h1", null, props.status), React__default.createElement("h3", {
    className: "font-bold"
  }, statusText[props.status] || 'Something went wrong'), React__default.createElement("div", {
    className: "error-desc"
  }, props.children));
};

ErrorPage.propTypes = {
  status: PropTypes.number
}; // ErrorPage.defaultProps = {

var MENTOR_LOGO_LEFT_PATH = "M 0,200 v 200 h 39 39 v -88.32 c 0,-52.457 0.148,-88.474 0.364,-88.7 0.452,-0.473 1.202,-44.76 1.606,-94.914 l 0.03,-3.734 0.9,1.076 c 1.66507,2.62974 67.30297,66.16423 68.25108,66.95795 0.45858,0.73769 3.627,1.0352 4.84363,0.56794 2.47529,-1.95604 36.86313,-41.98317 38.81136,-44.27433 4.74599,-4.52232 -0.51279,-7.4618 -2.21342,-9.93159 C 188.80969,135.92414 63.639195,4.4253259 57.376547,-0.11122888 L -1.6749927,-0.06203677 0,200";
var MENTOR_LOGO_RIGHT_PATH = "M 330.7417,0.01981344 C 326.35671,4.7924267 167.09994,197.80398 164.48899,200.55076 c -1.36169,1.55463 -1.16506,4.70413 -0.169,6.151 0.63368,1.06232 31.70999,34.79199 35.70675,39.32451 1.79131,1.98312 8.95044,3.24974 12.451,-0.036 2.73399,-3.11948 104.79355,-117.51423 109.27659,-121.68521 0.1076,14.23648 0.10245,39.80001 0.20567,58.89494 -0.047,1.87 -0.057,51.415 -0.023,110.1 L 322,400 h 39 39 V 200 0 h -34.553 c -1.24717,0 -33.6817,0.00251564 -34.7053,0.01981344"; // A loading component to show to the user while data is retrieved

var Loading = function Loading(_ref) {
  var className = _ref.className,
      centered = _ref.centered,
      size = _ref.size;
  var classes = cn('text-center', _defineProperty({
    'apm-centered': centered
  }, className, !!className));
  var dim = size === 'large' ? '100' : '50';
  return React__default.createElement("div", {
    className: classes
  }, React__default.createElement("svg", {
    width: dim,
    height: dim,
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

Loading.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['medium', 'large'])
};
Loading.defaultProps = {
  centered: false,
  className: '',
  size: 'medium'
};

var NoResults = function NoResults(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return React__default.createElement("div", {
    className: cn('text-success text-center font-bold', className)
  }, children);
};

NoResults.propTypes = {
  className: PropTypes.string
};
NoResults.defaultProps = {
  className: ''
};

var Spinner = function Spinner(_ref) {
  var className = _ref.className,
      large = _ref.large;
  return React__default.createElement("i", {
    className: cn(_defineProperty({
      'fa fa-spinner apm-spinner': true,
      'fa-lg': large
    }, className, !!className))
  });
};

Spinner.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool
};
Spinner.defaultProps = {
  className: '',
  large: false
};

/* Takes a main css class for a component and
 * an optional overriding class or classes (array)
 * and returns a function which constructs a class strings.
 *
 *
 * function composeClass(
 * 		string, [
 *    		string of classes,
 *    		single classString,
 *    		Array of classes
 *  	]
 * )
 *
 *
 * For example if given the main class of APMDrawer
 * and the overriding class of className:
 *
 * const cc = composeClass('APMDrawer', 'className');
 *
 * cc('bg') => 'APMDrawer-bg className-bg';
 *
 * cc('bg', 'container') => 'APMDrawer-bg className-bg APMDrawer-containter
 * className-container';
 *
 * const cc = composeClass('mainClass', ['jam', 'cake', 'fig']);
 *
 * cc('jello', 'frosting') => 'mainClass-jello mainClass-frosting jam-jello
 * jam-frosting cake-jello cake-frosting fig-jello fig-frosting'
 */
function composeClass(mainClass, classPre) {
  if (classPre) {
    var classesPre;
    if (typeof classPre === 'string') classesPre = classPre.split(' ').filter(function (item) {
      return item.length > 0;
    });else if (Array.isArray(classPre)) classesPre = classPre;
    return function () {
      for (var _len = arguments.length, inClasses = new Array(_len), _key = 0; _key < _len; _key++) {
        inClasses[_key] = arguments[_key];
      }

      if (inClasses.length < 1) return "".concat(mainClass, " ").concat(classesPre.join(' '));
      inClasses.unshift('');
      return inClasses.join(" ".concat(mainClass, "-")) + ' ' + classesPre.map(function (classPre) {
        return inClasses.join(" ".concat(classPre, "-")).substr(1);
      }).join(' ');
    };
  } else {
    return function () {
      for (var _len2 = arguments.length, inClasses = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        inClasses[_key2] = arguments[_key2];
      }

      if (inClasses.length < 1) return "".concat(mainClass);

      if (inClasses.length > 1) {
        inClasses.unshift('');
        return inClasses.join(" ".concat(mainClass, "-")).substr(1);
      }

      return "".concat(mainClass, "-").concat(inClasses[0]);
    };
  }
}

__$styleInject(".APMDrawer {\n  display: flex;\n  flex-direction: column;\n  transition: border 0.4s ease;\n}\n.APMDrawer-inner {\n  background: #313531;\n  flex-direction: column;\n  height: auto;\n  display: none;\n  padding-left: 18px;\n}\n.APMDrawer-inner-enter-active,\n.APMDrawer-inner-exit-active {\n  position: relative;\n  overflow: hidden;\n  transition-delay: 0s;\n  transition-timing-function: ease;\n  transition-duration: 0.4s;\n  transition-property: height, visibility;\n}\n.APMDrawer-inner-enter-done {\n  height: auto !important;\n  display: block;\n}\n.APMDrawer-inner-exit-done {\n  height: auto !important;\n  display: none !important;\n}\n.APMDrawer-label {\n  font-family: 'Lato', sans-serif;\n  color: #B0BAC5;\n  max-width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.APMDrawer-label-block {\n  display: flex;\n  align-items: center;\n}\n.APMDrawer-label-block-icon {\n  font-size: 16px;\n  height: 16px;\n  position: relative;\n  width: 16px;\n  margin-right: 12px;\n}\n.APMDrawer-label-block-icon:before {\n  position: absolute;\n  color: #B0BAC5;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.APMDrawer-label-container {\n  display: flex;\n  background-color: #313531;\n  padding: 0 18px 0 18px;\n  justify-content: space-between;\n  cursor: pointer;\n  transition: all 0.1s ease;\n  font-size: 16px;\n  min-height: 48px;\n}\n.APMDrawer-label-container-is-open {\n  background-color: #313531;\n}\n.APMDrawer-label-container-is-open .APMDrawer-label-block-icon:before,\n.APMDrawer-label-container-is-active .APMDrawer-label-block-icon:before,\n.APMDrawer-label-container:hover .APMDrawer-label-block-icon:before,\n.APMDrawer-label-container-is-open .APMDrawer-label,\n.APMDrawer-label-container-is-active .APMDrawer-label,\n.APMDrawer-label-container:hover .APMDrawer-label {\n  color: #F4F7FA;\n}\n.APMDrawer-label-container:hover {\n  background-color: #313531;\n}\n.APMDrawer-label-icon {\n  align-self: center;\n  color: #B0BAC5;\n}\n.APMDrawer-label-icon-active {\n  transform: rotate(-90deg);\n  color: #F4F7FA;\n}\n.APMDrawer-label:hover {\n  color: #F4F7FA;\n}\n.APMDrawer-bg {\n  border-radius: 3px;\n  overflow: hidden;\n}\n");

var DrawerContext = React__default.createContext(null);
var Drawer = React__default.memo(function (_ref) {
  var className = _ref.className,
      style = _ref.style,
      label = _ref.label,
      iconClass = _ref.iconClass,
      dataTip = _ref.dataTip,
      DynamicChild = _ref.DynamicChild,
      id = _ref.id,
      labelContainerStyle = _ref.labelContainerStyle;

  var _useState = React.useState('0px'),
      _useState2 = _slicedToArray(_useState, 2),
      innerHeight = _useState2[0],
      setInnerHeight = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  var dynamicChildRef = React.useRef(null);
  var innerRef = React.useRef(null);
  React.useEffect(function () {
    updateHeight();
  }, [DynamicChild]);

  function updateHeight() {
    if (dynamicChildRef.current) {
      var node = dynamicChildRef.current;
      var height = getHeightForNode(node);
      if (isOpen && innerRef.current) innerRef.current.style.height = "".concat(height, "px");
      setInnerHeight("".concat(height, "px"));
    }
  }

  function toggleDrawer() {
    setIsOpen(function (prevState) {
      return !prevState;
    });
  }

  function resetHeight() {
    updateHeight();
  }

  function renderChildren(state) {
    return React__default.createElement("div", {
      ref: dynamicChildRef
    }, React__default.createElement(DrawerContext.Provider, {
      value: resetHeight
    }, React__default.createElement(DynamicChild, null)));
  }

  var cc = composeClass('APMDrawer', className);
  return React__default.createElement("div", {
    className: cc('bg'),
    "data-tip": dataTip
  }, React__default.createElement("div", {
    className: cn(cc(), _defineProperty({}, cc('is-open'), isOpen))
  }, React__default.createElement("div", {
    className: cn(cc('label-container'), _defineProperty({}, cc('label-container-is-open'), isOpen)),
    onClick: toggleDrawer,
    style: labelContainerStyle
  }, React__default.createElement("div", {
    className: cc('label-block')
  }, iconClass && React__default.createElement("i", {
    className: cn([cc('label-block-icon')], iconClass)
  }), React__default.createElement("span", {
    className: cc('label')
  }, label)), React__default.createElement("i", {
    className: cn(cc('label-icon'), "far fa-angle-left", _defineProperty({}, cc('label-icon-active'), isOpen))
  })), React__default.createElement(reactTransitionGroup.CSSTransition, {
    "in": isOpen,
    timeout: 400,
    classNames: "APMDrawer-inner",
    appear: true,
    onEnter: function onEnter(node) {
      node.style.height = '0px';
      node.style.display = 'block';
    },
    onEntering: function onEntering(node) {
      node.style.height = innerHeight;
    },
    onExiting: function onExiting(node) {
      node.style.height = '0px';
    }
  }, function (state) {
    return React__default.createElement("div", {
      className: cc('inner'),
      ref: innerRef
    }, renderChildren());
  })));
});

function getHeightForNode(node) {
  var s = document.createElement('div');
  s.appendChild(node.cloneNode(true));
  s.style.display = 'block';
  s.style.position = 'absolute';
  s.style.left = '-10000px';
  document.body.appendChild(s);
  var height = s.clientHeight;
  document.body.removeChild(s);
  return height;
}

Drawer.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  dataTip: PropTypes.string,
  DynamicChild: PropTypes.func,
  id: PropTypes.string
};

__$styleInject(".APMHamburger {\n  padding: 18px 36px 14px 24px;\n  height: 60px;\n  width: 100%;\n  border: none;\n  background-color: white;\n  margin-top: -4px;\n  transition: all 0.1s ease;\n}\n.APMHamburger-inner {\n  height: 2px;\n  background-color: #B0BAC5;\n  width: 18px;\n  transition: hover 0.1s ease;\n}\n.APMHamburger-inner:before,\n.APMHamburger-inner:after {\n  content: '';\n  position: absolute;\n  width: 18px;\n  height: 2px;\n  background-color: #B0BAC5;\n  left: 24px;\n  transition: all 0.1s ease;\n  transition: transform 0.2s ease;\n}\n.APMHamburger-inner:before {\n  top: 22px;\n}\n.APMHamburger-inner:after {\n  bottom: 22px;\n}\n.APMHamburger-inner-open {\n  height: 0;\n  transition: none;\n}\n.APMHamburger-inner-open:before,\n.APMHamburger-inner-open:after {\n  top: 50%;\n}\n.APMHamburger-inner-open:before {\n  transform: translateY(-50%) rotate(-45deg);\n}\n.APMHamburger-inner-open:after {\n  transform: translateY(-50%) rotate(-135deg);\n}\n.APMHamburger:active,\n.APMHamburger:focus {\n  outline: none;\n}\n.APMHamburger:hover .APMDropdown-menu-trigger-inner {\n  background-color: #8091A5;\n}\n.APMHamburger:hover .APMDropdown-menu-trigger-inner:before,\n.APMHamburger:hover .APMDropdown-menu-trigger-inner:after {\n  background-color: #8091A5;\n}\n.APMHamburger:active .APMDropdown-menu-trigger-inner {\n  background-color: #45484d;\n}\n.APMHamburger:active .APMDropdown-menu-trigger-inner:before,\n.APMHamburger:active .APMDropdown-menu-trigger-inner:after {\n  background-color: #45484d;\n}\n");

function Hamburger(props) {
  var isOpen = props.isOpen;
  return React__default.createElement("button", {
    className: "APMHamburger"
  }, React__default.createElement("div", {
    className: cn("APMHamburger-inner", {
      "APMHamburger-inner-open": isOpen
    })
  }));
}

__$styleInject(".apm-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 10;\n}\n.apm-modal-content.apm-fullscreen {\n  margin-top: 0;\n  width: 100%;\n  height: 100%;\n}\n.apm-modal-content {\n  position: relative;\n  overflow: auto;\n  border-radius: 3px;\n  height: calc(100vh - 48px);\n  background: #fff;\n  width: calc(100vw - 48px);\n  padding: 15px;\n  margin: 24px;\n}\n.apm-modal-content .apm-modal-content-no-padding {\n  padding: 0;\n}\n.apm-modal-content .apm-modal-body {\n  clear: right;\n  width: 100%;\n  height: 100%;\n}\n.apm-modal-actions {\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  z-index: 10;\n  display: flex;\n}\n.apm-modal-actions-button:first-child {\n  margin-right: 8px;\n}\n");

/*
	The function returns an array with:
		1.) Props to create a modal trigger
		2.) All the props to pass to the modal
		3.) A dispatch function to update the state
*/

var useBasicModalSettings = function useBasicModalSettings() {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var triggerProps = {
    onClick: function onClick() {
      setIsOpen(true);
    }
  };
  var modalComponentProps = {
    display: isOpen,
    onClose: function onClose() {
      setIsOpen(false);
    }
  };
  return [triggerProps, modalComponentProps, setIsOpen];
};
/*
	Basic example
	const RandomModal = props => {

		const [ triggerProps, modalProps, setModalOpenState] = useBasicModalSettings();

		return (
			<div>
				<button
					{...triggerProps}
					className="btn"
				>
					Open a modal
				</button>
				<Modal {...modalProps}>
					<h1>Modal Content</h1>
					<button onClick={() => setModalOpenState(false)}>
						Close programatically.
					</button>
				</Modal>
			</div>
		)
	}
*/

var useFullScreen = function useFullScreen(wrapper) {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFullScreen = _useState2[0],
      setIsFullScreen = _useState2[1];

  var toggle = function toggle() {
    if (isFullScreen) {
      setIsFullScreen(false);
      fscreen.exitFullscreen(); // wrapper.current.style.width = null;
      // wrapper.current.style.height = null;
    } else {
      fscreen.requestFullscreen(wrapper.current);
      wrapper.current.style.width = '100%';
      wrapper.current.style.height = '100%';
      setIsFullScreen(true);
    }
  };

  return {
    isFullScreen: isFullScreen,
    toggle: toggle
  };
};

var Modal = function Modal(props) {
  var modalRef = React.useRef(null);
  var el = React.useMemo(function () {
    return document.createElement('div');
  }, []);

  var _useFullScreen = useFullScreen(modalRef),
      isFullScreen = _useFullScreen.isFullScreen,
      toggle = _useFullScreen.toggle;

  React.useEffect(function () {
    document.body.appendChild(el);
    document.body.style.setProperty('overflow', 'hidden');
    return function () {
      document.body.removeChild(el);
      document.body.style.removeProperty('overflow');
    };
  }, []);
  if (!props.display) return null;
  var overlayClassName = cn(props.overlayClassName, '--apm-modal-overlay--', {
    'apm-fullscreen': isFullScreen
  });
  var contentClassName = cn(props.contentClassName, {
    'apm-fullscreen': isFullScreen
  });
  var fullScreenButtonIcon = cn('fa', {
    'fa-compress-wide': isFullScreen
  }, {
    'fal fa-expand-wide fa-lg': !isFullScreen
  }, 'fa-lg');
  var contentStyle = lodash.defaults({
    width: props.width,
    height: props.height
  }, props.contentStyle);

  var handleClickOutside = function handleClickOutside(evt) {
    // we only want to respond to on click events directly on the overlay
    // not on any of it's child nodes
    if (!props.closeOnOutsideClick || !evt.target.classList.contains('--apm-modal-overlay--')) {
      return;
    }

    if (typeof props.onClose === 'function') {
      props.onClose(); // dont allow it to bubble up. if its a nested modal, both will close

      evt.stopPropagation();
    }
  };

  return reactDom.createPortal(React__default.createElement("div", {
    ref: modalRef,
    className: overlayClassName,
    style: props.overlayStyle,
    onClick: handleClickOutside,
    "data-testid": "modal-overlay"
  }, React__default.createElement("div", {
    className: contentClassName,
    style: contentStyle
  }, React__default.createElement("div", {
    className: "apm-modal-actions"
  }, props.fullScreenToggle && React__default.createElement(Button, {
    className: "apm-modal-actions-button",
    medium: true,
    isLight: true,
    onClick: toggle
  }, React__default.createElement("i", {
    className: fullScreenButtonIcon
  })), !props.hideCloseButton && React__default.createElement(Button, {
    className: "apm-modal-actions-button",
    medium: true,
    isLight: true,
    onClick: props.onClose
  }, React__default.createElement("i", {
    className: "fal fa-times fa-lg"
  }))), React__default.createElement("div", {
    className: "apm-modal-body"
  }, props.children))), el);
};
Modal.defaultProps = {
  closeOnOutsideClick: true,
  contentClassName: 'apm-modal-content',
  contentStyle: {},
  display: false,
  onClose: function onClose() {
    return true;
  },
  overlayClassName: 'apm-modal-overlay animated fadeIn',
  overlayStyle: {}
};
Modal.propTypes = {
  closeOnOutsideClick: PropTypes.bool,
  contentClassName: PropTypes.string,
  contentStyle: PropTypes.object,
  customButtons: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element)]),
  display: PropTypes.bool,
  height: PropTypes.number,
  hideCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.object,
  width: PropTypes.number
};

__$styleInject(".APMPanel {\n  background-color: #FFF;\n  height: 100%;\n  width: 100%;\n}\n.APMPanel-draggable .APMPanel-header:hover {\n  cursor: move;\n}\n.APMPanel-list {\n  padding: 0;\n  width: 100%;\n  list-style: none;\n  margin-top: 8px;\n  margin-bottom: 0;\n}\n.APMPanel-list-item {\n  width: 100%;\n  height: 48px;\n  border-bottom: 1px solid #DFE6EE;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.APMPanel-header {\n  color: #FFF;\n  background-color: #003852;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  line-height: 60px;\n  height: 65px;\n  padding: 0 30px;\n}\n.APMPanel-header .btn {\n  background: none;\n  font-size: 1.6rem;\n  box-shadow: none;\n  color: #fff;\n  border: 1px solid #8091A5;\n  border-radius: 4px;\n  margin-left: 6px;\n  margin-top: -4px;\n  transition: all 0.1s ease;\n}\n.APMPanel-header .btn:hover {\n  background: #2E667E;\n  color: #F4F7FA;\n  border-color: #F4F7FA;\n}\n.APMPanel-header .btn:active {\n  transition: none;\n  background: #00263f;\n  border-color: #2E667E;\n  color: #FFF;\n}\n.APMPanel-header-title {\n  margin: 0;\n  font-weight: 600;\n  font-size: 24px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 90%;\n}\n.APMPanel-header-title .btn {\n  margin-left: 0;\n  margin-right: 18px;\n  margin-top: -5px;\n}\n.APMPanel-buttons {\n  display: inline-block;\n}\n.APMPanel-buttons .btn {\n  background: none;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  margin-left: 30px;\n  color: #fff;\n  opacity: 0.8;\n  font-size: 1.75rem;\n}\n.APMPanel-buttons-active {\n  background-color: #2E667E !important;\n  color: #F4F7FA !important;\n  border-color: #F4F7FA !important;\n}\n.APMPanel-main {\n  padding: 30px;\n  float: left;\n  width: 75%;\n  height: calc(100% - 65px);\n  overflow-y: auto;\n}\n.APMPanel-main hr {\n  margin: 20px -30px;\n  border: 0;\n  border-top: 1px solid #b0bac5;\n}\n");

var PanelButton = function PanelButton(_ref) {
  var className = _ref.className,
      iconClass = _ref.iconClass,
      iconStyle = _ref.iconStyle,
      tip = _ref.tip,
      onClick = _ref.onClick,
      style = _ref.style,
      isActive = _ref.isActive,
      props = _objectWithoutProperties(_ref, ["className", "iconClass", "iconStyle", "tip", "onClick", "style", "isActive"]);

  return React__default.createElement("button", _extends({
    className: cn(className, {
      "APMPanel-buttons-active": isActive
    }, "btn"),
    "data-for": "apm-tooltip",
    "data-tip": tip,
    key: tip,
    onClick: onClick,
    style: style
  }, props), React__default.createElement("i", {
    className: iconClass,
    style: props.iconStyle
  }));
};
PanelButton.propTypes = {
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  tip: PropTypes.string.isRequired
};
var Panel = function Panel(_ref2) {
  var className = _ref2.className,
      isDraggable = _ref2.isDraggable,
      props = _objectWithoutProperties(_ref2, ["className", "isDraggable"]);

  var cc = composeClass('APMPanel', className);
  return React__default.createElement("div", {
    className: cn(cc(), {
      'APMPanel-draggable': isDraggable
    }),
    style: props.containerStyle
  }, React__default.createElement("div", {
    className: cc('header'),
    style: props.headerStyle
  }, React__default.createElement("div", {
    className: cc('header-title')
  }, props.title), React__default.createElement("div", {
    className: cc('header-buttons')
  }, props.customButtons)), props.children);
};
Panel.propTypes = {
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  customButtons: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};
Panel.defaultProps = {
  title: ''
};

__$styleInject(".APMPanelSeries {\n  border-radius: 4px;\n  overflow: hidden;\n}\n.APMPanelSeries-header {\n  padding: 0 18px;\n}\n.APMPanelSeries-container {\n  overflow: hidden;\n  border-radius: 4px;\n  box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.12), 1px 0 2px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);\n}\n.APMPanelSeries-main {\n  padding: 18px;\n  display: flex;\n  width: 100%;\n  height: calc(100% - 65px);\n  overflow-y: auto;\n  font-size: 16px;\n}\n.APMPanelSeries-main-flat {\n  border: 1px solid #DFE6EE;\n  border-top: none;\n  border-radius: 0 0 4px 4px;\n}\n");

var PanelSeries = function PanelSeries(props) {
  var className = props.className,
      children = props.children,
      isFlat = props.isFlat,
      rest = _objectWithoutProperties(props, ["className", "children", "isFlat"]);

  var cc = composeClass('APMPanelSeries', className);
  return React__default.createElement(Panel, _extends({
    className: cc()
  }, rest), React__default.createElement("div", {
    className: cn(cc('main'), _defineProperty({}, cc('main-flat'), isFlat))
  }, children));
};
PanelSeries.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

__$styleInject(".APMDropdown {\n  position: relative;\n}\n.APMDropdown-menu {\n  margin-right: 30px;\n  background-color: #FFF;\n  margin-top: 0;\n  border: medium none;\n  border-radius: 3px;\n  box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);\n  display: block;\n  float: left;\n  font-size: 12px;\n  left: 0;\n  list-style: none outside none;\n  padding: 0;\n  position: absolute;\n  text-shadow: none;\n  top: 100%;\n  z-index: 9;\n  -webkit-animation: DROPDOWN 0.1s;\n  /* Safari 4+ */\n  -moz-animation: DROPDOWN 0.1s;\n  /* Fx 5+ */\n  -o-animation: DROPDOWN 0.1s;\n  /* Opera 12+ */\n  animation: DROPDOWN 0.1s;\n  /* IE 10+, Fx 29+ */\n}\n.APMDropdown-menu-header {\n  color: #313531;\n  font-size: 14px;\n  font-weight: bold;\n  margin-top: 18px;\n  font-family: lato, sans-serif;\n}\n.APMDropdown-menu-trigger-container {\n  display: flex;\n  align-items: center;\n  height: 100%;\n}\n.APMDropdown-menu-item {\n  font-size: 14px;\n  font-family: 'Lato', sans-serif;\n  color: inherit;\n  padding: 9px 18px;\n  text-align: left;\n  font-weight: normal;\n  transition: all 0.1s ease;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  color: #313531 !important;\n  text-decoration: none !important;\n  height: 44px;\n  min-width: 220px;\n}\n.APMDropdown-menu-item-icon {\n  margin-right: 12px;\n  color: #313531;\n  width: 16px;\n  font-size: 16px;\n}\n.APMDropdown-menu-item-separator {\n  display: block;\n  height: 1px;\n  background-color: #DFE6EE;\n  margin: 9px 0;\n}\n.APMDropdown-menu-item:hover,\n.APMDropdown-menu-item:active {\n  background-color: #F4F7FA;\n  cursor: pointer;\n  color: #313531 !important;\n  text-decoration: none !important;\n}\n.APMDropdown-menu-item:active {\n  background-color: #DFE6EE;\n}\n@-webkit-keyframes DROPDOWN {\n  0% {\n    opacity: 0;\n    height: 0;\n  }\n  100% {\n    opacity: 1;\n    height: auto;\n  }\n}\n@-moz-keyframes DROPDOWN {\n  0% {\n    opacity: 0;\n    height: 0;\n  }\n  100% {\n    opacity: 1;\n    height: auto;\n  }\n}\n@-o-keyframes DROPDOWN {\n  0% {\n    opacity: 0;\n    height: 0;\n  }\n  100% {\n    opacity: 1;\n    height: auto;\n  }\n}\n@keyframes DROPDOWN {\n  0% {\n    opacity: 0;\n    height: 0;\n  }\n  100% {\n    opacity: 1;\n    height: auto;\n  }\n}\n");

var DropdownContext = React__default.createContext(null); // The container for the dropdown

var Dropdown = function Dropdown(props) {
  var state = React.useState(props.openOnMount);
  return React__default.createElement(DropdownContext.Provider, {
    value: state
  }, React__default.createElement("div", {
    className: "APMDropdown"
  }, props.children));
};
Dropdown.propTypes = {
  openOnMount: PropTypes.bool
};
Dropdown.defaultProps = {
  openOnMount: false
};
var DropdownTrigger = function DropdownTrigger(props) {
  var _useContext = React.useContext(DropdownContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      isOpen = _useContext2[0],
      setIsOpen = _useContext2[1];

  var handleOnClick = function handleOnClick(evt) {
    if (!isOpen) {
      evt.stopPropagation();
      setIsOpen(true);
    }
  };

  return React__default.createElement("div", {
    className: props.className,
    onClick: handleOnClick
  }, typeof props.render === 'function' ? props.render(isOpen) : props.children);
};
var DropdownMenu = function DropdownMenu(props) {
  var _useContext3 = React.useContext(DropdownContext),
      _useContext4 = _slicedToArray(_useContext3, 2),
      isOpen = _useContext4[0],
      setIsOpen = _useContext4[1];

  var ref = React.useRef(null);

  var onClickOutside = function onClickOutside() {
    setIsOpen(false);
  };

  React.useEffect(function () {
    window.addEventListener('click', onClickOutside);
    return function () {
      window.removeEventListener('click', onClickOutside);
    };
  }, []); // center the menu and/or make sure its completely visible on the viewport

  React.useEffect(function () {
    if (!isOpen) return; //const wrapper = ref.current.parentNode.getBoundingClientRect();

    var content = ref.current.getBoundingClientRect();
    var maxWidth = window.innerWidth;

    if (content.right > maxWidth) {
      ref.current.style.left = maxWidth - content.right - 18 + 'px';
    } else if (content.left < 0) {
      ref.current.style.left = '0px';
    }
  });
  if (!isOpen) return null;

  var handleOnClick = function handleOnClick(evt) {
    evt.stopPropagation();
  };

  return React__default.createElement("div", {
    className: "APMDropdown-menu",
    onClick: handleOnClick,
    ref: ref
  }, props.children);
};
var DropdownMenuItem = function DropdownMenuItem(props) {
  var className = props.className,
      children = props.children,
      iconClass = props.iconClass,
      rest = _objectWithoutProperties(props, ["className", "children", "iconClass"]);

  var cc = composeClass('APMDropdown', className);
  return React__default.createElement("a", _extends({
    className: cc('menu-item')
  }, rest), React__default.createElement("i", {
    className: cn(cc('menu-item-icon'), iconClass)
  }), children);
};

var Drawer$1 = Drawer;
var Button$1 = Button;
var ErrorBoundary = _default;
var ErrorPage$1 = ErrorPage;
var Loading$1 = Loading;
var NoResults$1 = NoResults;
var Spinner$1 = Spinner;
var Hamburger$1 = Hamburger;

exports.Button = Button$1;
exports.Drawer = Drawer$1;
exports.Dropdown = Dropdown;
exports.DropdownContext = DropdownContext;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownTrigger = DropdownTrigger;
exports.ErrorBoundary = ErrorBoundary;
exports.ErrorPage = ErrorPage$1;
exports.Hamburger = Hamburger$1;
exports.Loading = Loading$1;
exports.Modal = Modal;
exports.NoResults = NoResults$1;
exports.Panel = Panel;
exports.PanelButton = PanelButton;
exports.PanelSeries = PanelSeries;
exports.Spinner = Spinner$1;
exports.useBasicModalSettings = useBasicModalSettings;
