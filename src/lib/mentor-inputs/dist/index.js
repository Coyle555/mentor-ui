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
var cx = _interopDefault(require('classnames'));
var lodash = require('lodash');
var shortid = _interopDefault(require('shortid'));
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);
var onClickOutside = _interopDefault(require('react-onclickoutside'));
var moment = _interopDefault(require('moment'));
var blacklist = _interopDefault(require('blacklist'));
var Dropzone = _interopDefault(require('react-dropzone'));
var fuzzy = _interopDefault(require('fuzzy'));
var reactToastify = require('react-toastify');

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
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

/// define error messages

var getErrorMessage = function getErrorMessage(validityState) {
  var messages = {
    badInput: 'This field is invalid',
    patternMismatch: 'Invalid format',
    rangeOverflow: 'Value is too big.',
    rangeUnderflow: 'Value is too small.',
    stepMismatch: 'Invalid step',
    //idk...
    tooLong: 'Field too long',
    tooShort: 'Field too short',
    typeMismatch: 'Invalid field type',
    /// i
    valueMissing: 'This field is required'
  };

  for (var key in validityState) {
    if (validityState[key]) {
      return messages[key];
    }
  }

  return '';
};

function useInputValidation(customValidators) {
  var _useState = React.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      errorMessage = _useState2[0],
      setErrorMessage = _useState2[1];

  if (!Array.isArray(customValidators)) {
    customValidators = [customValidators];
  }

  var validator = function validator(inputRef) {
    var i = -1;
    var errorString = '';

    while (++i < customValidators.length && !errorString) {
      var fn = customValidators[i];

      if (typeof fn === 'function') {
        // validator fn should return a string if input is invalid, 
        // if it returns a falsey value assign an empty string
        errorString = fn(inputRef.value, inputRef) || ''; // display error message in the ui

        setErrorMessage(errorString); // invalidate the input to prevent a form from submitting if failed (and trigger :invalid styles on the input)
        // or remove custom error message if passed by passing in empty string
        //console.log({ errorString });

        inputRef.setCustomValidity(errorString);
      }
    }

    if (!errorString) {
      var _inputRef$validity = inputRef.validity,
          customError = _inputRef$validity.customError,
          validityState = _objectWithoutProperties(_inputRef$validity, ["customError"]); // clear out any previously applied custom error messages since all tests passed


      if (customError) {
        var browserError = getErrorMessage(validityState);
        inputRef.setCustomValidity(browserError);
        setErrorMessage(browserError);
      } else {
        // if no custom validation function was passed in, or the custom handlers all passed
        // use browsers built in validation based on various html attributes passed in (required, min, max, etc)
        // to generate an error message
        //console.log(inputRef.name, inputRef.validationMessage, inputRef.value, typeof inputRef.value, inputRef.checkValidity());
        setErrorMessage(inputRef.validationMessage);
      }
    }
  };

  return [errorMessage, validator];
}

/*
	wip.... 
	A hook for handling shared functionality among mentor inputs:
	onChange
	onBlur
	parsing value from props
	validation - String for error message / null for valid


*/

var useInputState = function useInputState() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _onBlur = props.onBlur,
      _onChange = props.onChange,
      parse = props.parse,
      validate = props.validate,
      value = props.value,
      handleEvents = props.handleEvents,
      input = _objectWithoutProperties(props, ["onBlur", "onChange", "parse", "validate", "value", "handleEvents"]);

  var inputRef = React.useRef(null);
  var fakeNameToPreventAutocomplete = React.useRef(null);

  var _useState = React.useState(function () {
    return getDisplayValue(value, parse);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      currentValue = _useState2[0],
      setCurrentValue = _useState2[1];

  var _useInputValidation = useInputValidation(validate),
      _useInputValidation2 = _slicedToArray(_useInputValidation, 2),
      error = _useInputValidation2[0],
      checkErrors = _useInputValidation2[1]; /// value in state should be updated when value in props is changed


  React.useEffect(function () {
    var newVal = getDisplayValue(props.value, parse);

    if (!fakeNameToPreventAutocomplete.current && input.autoComplete !== 'true') {
      fakeNameToPreventAutocomplete.current = shortid.generate() + '-APM-' + (input.name || 'unnamed');
    }

    if (currentValue !== newVal) {
      /// update to the new value if its actually new
      setCurrentValue(newVal);

      if (inputRef.current) {
        /// check for errors on the new value
        /// as long as the inputRef points to a dom node
        checkErrors(inputRef.current, validate);
      }
    }
  }, [props.value]); /// as soon as the input ref is attached to the node
  /// check for errors on the value

  React.useEffect(function () {
    if (!inputRef.current || !inputRef.current.name) return;
    checkErrors(inputRef.current, validate);
  }, [inputRef.current]);
  return {
    onBlur: function onBlur(evt) {
      if (typeof _onBlur !== 'function') return;
      var lastVal = getDisplayValue(value, parse);

      if (handleEvents) {
        _onBlur(evt);
      } else if (String(currentValue).trim() !== String(lastVal).trim()) {
        var val = typeof parse === 'function' ? parse(currentValue) : currentValue;

        _onBlur(error, val, input.name);
      }
    },
    onChange: function onChange(evt) {
      var newValue = evt.target.value;
      checkErrors(evt.target, validate);
      setCurrentValue(newValue);

      if (typeof _onChange === 'function') {
        if (handleEvents) {
          _onChange(evt);
        } else {
          var val = typeof parse === 'function' ? parse(newValue) : newValue;

          _onChange(evt.target.validationMessage, val, input.name);
        }
      }
    },
    name: fakeNameToPreventAutocomplete.current || input.name,
    ref: inputRef,
    value: currentValue
  };
};
/*
	value - any datatype - the value that needs parsing
	parse - a string pointing to an object key or a getter function
*/

function getDisplayValue(value, parse) {
  if (!parse) {
    if (value && _typeof(value) === 'object') {
      //// instead of having an input render something like [object Object]
      //// pluck the name property of the object (theres a good chance there will be one)			
      return value.name;
    } else {
      return value;
    }
  } else if (typeof parse === 'string' && value && _typeof(value) === 'object') {
    return lodash.get(value, parse, value.name);
  } else if (typeof parse === 'function') {
    return parse(value);
  } else {
    return value;
  }
}

__$styleInject(".m-calendar {\n  display: inline-block;\n}\n.m-calendar table {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n}\n.m-calendar td {\n  padding: 8px 0;\n  text-align: center;\n  cursor: pointer;\n  color: #dfe0e4;\n  border: 1px solid #dfe0e4;\n}\n.m-calendar thead td {\n  color: #1385e5;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 12px;\n}\n.m-calendar tbody td {\n  color: #666666;\n}\n.m-calendar tbody td:hover {\n  background: #1385e5;\n  border-color: #1385e5;\n  color: #ffffff;\n}\n.m-calendar .current-day {\n  color: #1385e5;\n  font-weight: bold;\n}\n.m-calendar .disabled-day {\n  background-color: #dfe0e4;\n  color: #666666;\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n.m-calendar .disabled-day.current-day {\n  color: #1385e5;\n}\n.m-calendar .disabled-day.current-day:hover {\n  color: #1385e5;\n}\n.m-calendar .disabled-day:hover {\n  background-color: #dfe0e4;\n  border-color: #dfe0e4;\n  color: #666666;\n}\n.m-calendar .prev-month,\n.m-calendar .next-month {\n  color: #999999;\n}\n.m-calendar .prev-month-disabled,\n.m-calendar .next-month-disabled {\n  opacity: 0.4;\n}\n.m-calendar .toolbar {\n  line-height: 30px;\n  color: #1385e5;\n  text-align: center;\n  margin-bottom: 13px;\n}\n.m-calendar .toolbar button {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  color: #ffffff;\n  border: 1px solid #1385e5;\n  border-radius: 50%;\n  background: #1385e5;\n  font-size: 20px;\n  padding: 0;\n  text-align: center;\n  outline: 0;\n  z-index: 1;\n  cursor: pointer;\n}\n.m-calendar .toolbar:disabled {\n  cursor: not-allowed;\n}\n.m-calendar .toolbar .prev-month {\n  float: left;\n}\n.m-calendar .toolbar .next-month {\n  float: right;\n}\n.m-calendar .toolbar .current-date {\n  color: #1385e5;\n}\n.m-time {\n  color: #ffffff;\n  padding-top: 50px;\n}\n.m-time .showtime {\n  text-align: center;\n}\n.m-time .separater {\n  display: inline-block;\n  font-size: 32px;\n  font-weight: bold;\n  color: #1385e5;\n  width: 32px;\n  height: 65px;\n  line-height: 65px;\n  text-align: center;\n}\n.m-time .time-text {\n  position: relative;\n  left: -10px;\n  font-size: 15px;\n  color: #1385e5;\n  margin-top: 7px;\n  margin-bottom: 10px;\n}\n.m-time .sliders {\n  padding: 0 10px;\n}\n.m-time .time {\n  width: 65px;\n  height: 65px;\n  display: inline-block;\n  font-size: 38px;\n  line-height: 65px;\n  background-color: #1385e5;\n  border-radius: 3px;\n  text-align: center;\n}\n.u-slider-time {\n  position: relative;\n  display: inline-block;\n  background-color: #dfe0e4;\n  border-radius: 3px;\n  height: 4px;\n  width: 100%;\n  cursor: pointer;\n}\n.u-slider-time .value {\n  position: absolute;\n  background-color: #1385e5;\n  border-radius: 3px;\n  top: 0;\n  height: 100%;\n}\n.u-slider-time .handle {\n  position: absolute;\n  width: 4px;\n  height: 4px;\n}\n.u-slider-time .handle:after {\n  position: relative;\n  display: block;\n  content: '';\n  top: -10px;\n  left: -12px;\n  width: 24px;\n  height: 24px;\n  background-color: #fff;\n  border: 3px solid #1385e5;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.im-btn {\n  display: inline-block;\n  background-color: #ffffff;\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  line-height: 1;\n}\n.im-btn:before {\n  margin-right: 6px;\n}\n.m-input-moment {\n  display: inline-block;\n  width: 330px;\n  padding: 12px 15px;\n  border-radius: 3px;\n  border: 1px solid #dfe0e4;\n}\n.m-input-moment .options {\n  width: 100%;\n  display: inline-block;\n  margin-bottom: 4px;\n}\n.m-input-moment .options button {\n  float: left;\n  width: 50%;\n  color: #1385e5;\n  text-align: center;\n  font-size: 16px;\n  padding: 7px;\n  border: 1px solid #1385e5;\n  border-radius: 3px;\n}\n.m-input-moment .options button:first-child {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.m-input-moment .options button:last-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.m-input-moment .options button.is-active {\n  color: #ffffff;\n  background-color: #1385e5;\n}\n.m-input-moment .tab {\n  display: none;\n  height: auto;\n}\n.m-input-moment .tab.is-active {\n  display: block;\n}\n.m-input-moment .tabs {\n  margin-bottom: 11px;\n}\n.m-input-moment .btn-save {\n  display: block;\n  margin-top: 30px;\n  width: 100%;\n  background-color: #1385e5;\n  padding: 12px 0;\n  text-align: center;\n  color: #ffffff;\n  font-size: 16px;\n  border-radius: 3px;\n}\n.apm-mi-form-control {\n  background-color: #FFFFFF;\n  background-image: none;\n  border: 1px solid #003852;\n  border-radius: 1px;\n  color: #16181e;\n  display: block;\n  padding: 6px 12px;\n  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;\n  height: 100%;\n}\n.apm-mi-form-control:invalid {\n  border-color: #ed5565 !important;\n}\n.apm-mi-form-control:focus {\n  outline: none;\n  border-color: #8DC63F;\n}\n.apm-mi-form-control[disabled] {\n  background-color: #e4f1cf;\n  border-color: #e4f1cf;\n}\n.apm-mi-list-filter {\n  margin: 0;\n  padding-right: 30px;\n}\n.apm-mi-container {\n  position: relative;\n  margin: 0;\n  padding: 0;\n}\n.apm-mi-clear-input {\n  position: absolute;\n  right: 10px;\n  width: 10px;\n  color: #BE1717;\n  height: 13px;\n  cursor: pointer;\n  margin: 0;\n  top: 50%;\n  transform: translateY(-70%);\n  padding: 0;\n}\n.apm-datepicker-input-group {\n  width: 1px;\n  position: relative;\n  display: table;\n  border-collapse: separate;\n  border: 1px solid #003852;\n  width: 100%;\n  padding: 0;\n}\n.apm-datepicker-input-group-addon {\n  color: #003852;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1;\n  padding: 6px 12px;\n  text-align: center;\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n  display: table-cell;\n}\n.apm-datepicker-input-group-addon:first-child {\n  border-right: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.apm-textarea-resize-vert {\n  resize: vertical;\n}\n.apm-list-filter-menu-ul {\n  position: absolute;\n  color: inherit;\n  max-height: 250px;\n  min-width: 250px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-clip: padding-box;\n  background-color: #fff;\n  text-align: left;\n  margin: 1px 0;\n  z-index: 2;\n  text-shadow: none;\n  padding: 0;\n  list-style: none outside none;\n  font-size: 12px;\n  box-shadow: 0 0 3px rgba(86, 96, 117, 0.7);\n  border-radius: 3px;\n  border: medium none;\n}\n.apm-list-filter-menu-li {\n  color: inherit;\n  padding: 3px 20px;\n  clear: both;\n  white-space: nowrap;\n  border-radius: 3px;\n  line-height: 25px;\n  margin: 4px;\n  text-align: left;\n  font-weight: normal;\n  display: inline-block;\n  width: calc(100% - 4px);\n  cursor: pointer;\n}\n.apm-list-filter-menu-li-highlight {\n  color: #fff;\n  text-decoration: none;\n  background-color: #003852;\n  outline: 0;\n}\n.apm-list-filter-menu-li:hover,\n.apm-list-filter-menu-li:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #003852;\n  outline: 0;\n}\n.apm-datepicker-input {\n  position: absolute;\n  left: 0;\n  background-color: #fff;\n  z-index: 4;\n  max-width: 400px;\n  margin-top: 8px;\n  font-size: 12.6px;\n}\n.apm-error-border-color {\n  border-color: #ed5565 !important;\n}\n.apm-list-filter-loading {\n  margin: 5px;\n}\n.apm-mi-file-input {\n  width: 100%;\n  display: block;\n  border-width: 2px;\n  border-style: dashed;\n  border-color: #e3e3e3;\n  border-radius: 5px;\n  background-color: #f5f5f5;\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding: 5px 20px;\n}\n.apm-mi-file-input-active {\n  border-style: solid;\n}\n");

var SelectInput = function SelectInput(_ref) {
  var validation = _ref.validation,
      options = _ref.options,
      placeholder = _ref.placeholder,
      getOptionLabel = _ref.getOptionLabel,
      getOptionValue = _ref.getOptionValue,
      parse = _ref.parse,
      props = _objectWithoutProperties(_ref, ["validation", "options", "placeholder", "getOptionLabel", "getOptionValue", "parse"]);

  var parseValue = React.useMemo(function () {
    return function (value) {
      if (typeof parse === 'function') {
        return parse(value);
      } else if (value && _typeof(value) === 'object') {
        return getOptionValue(value);
      } else {
        return value;
      }
    };
  }, []);
  var inputState = useInputState(_objectSpread({
    validate: validation,
    parse: parseValue
  }, props));
  var formattedOptions = React.useMemo(function () {
    return options.map(function (option, i) {
      var label = getOptionLabel(option);
      var val = getOptionValue(option);
      return React__default.createElement("option", {
        key: _typeof(val) === 'object' ? i : val,
        value: val
      }, /// prevent potential crash cause by react trying to render JSON in the html
      typeof label === 'string' ? label : String(label) // this probably wont look pretty but its better than the alternative
      );
    });
  }, [options]);
  var inputClasses = cx(_defineProperty({
    'apm-mi-form-control': true
  }, props.className, !!props.className));
  return React__default.createElement("select", _extends({}, props, {
    className: inputClasses
  }, inputState, {
    name: props.name
  }), React__default.createElement("option", {
    disabled: props.required,
    value: ""
  }, placeholder), formattedOptions);
};

SelectInput.propTypes = {
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  options: PropTypes.array,
  parse: PropTypes.func,
  validation: PropTypes.func
};
SelectInput.defaultProps = {
  getOptionLabel: function getOptionLabel(val) {
    return val;
  },
  getOptionValue: function getOptionValue(val) {
    return val;
  },
  options: []
};

var OPTIONS = [{
  value: true,
  label: 'True'
}, {
  value: false,
  label: 'False'
}];
var BooleanInputComponent = function BooleanInputComponent(props) {
  return React__default.createElement(SelectInput, _extends({}, props, {
    getOptionLabel: getOptionLabel,
    getOptionValue: getOptionValue,
    options: OPTIONS,
    parse: parse
  }));
};

function getOptionLabel(opt) {
  return opt.label;
}

function getOptionValue(opt) {
  return opt.value;
}

function parse(value) {
  switch (value) {
    case true:
    case 'true':
      return true;

    case false:
    case 'false':
      return false;

    default:
      return '';
  }
}

function isDateAfterMaxDate(m, maxDate, offset, nextMonth) {
  var clone = m.clone();
  var currentDay = m.date();
  maxDate = moment(maxDate); // current month being processed

  if (!nextMonth) {
    clone.add(offset - currentDay, 'days'); // console.log(clone.format());
    // console.log(maxDate.format());

    return clone.isSameOrAfter(maxDate); // check ahead to next month
  } else {
    // if the max date is the same month-year as current date, disable
    // all days rendered in the next month
    if (m.isSame(maxDate, 'month') && m.isSame(maxDate, 'year')) {
      return true;
    } // checking next month
    // if the max date is in the rendered days of the next month, 
    // disable the corresponding days


    clone.endOf('month').add(offset, 'days');
    return clone.isSameOrAfter(maxDate);
  }
}
function isDateBeforeMinDate(m, minDate, offset, prevMonth) {
  var clone = m.clone();
  var currentDay = m.date();
  minDate = moment(minDate); // current month

  if (!prevMonth) {
    clone.date(offset);
    return clone.isSameOrBefore(minDate); // check behind to prev month
  } else {
    // if the min date is the same month-year as current date, disable
    // all days rendered in the prev month
    if (m.isSame(minDate, 'month') && m.isSame(minDate, 'year')) {
      return true;
    }

    var monthDay = moment(minDate);
    monthDay = monthDay.endOf('month').date(); // checking prev month
    // if min date is in the rendered days of prev month,
    // disable the corresponding days

    clone.startOf('month').subtract(monthDay - offset + 1, 'days');
    return clone.isSameOrBefore(minDate);
  }
} // checks if rendered days of the previous month are disabled

function isDayDisabled(m, minDate, maxDate, offset, prevMonth, nextMonth) {
  var disabled = false; // check after max date

  if (!prevMonth && maxDate) {
    disabled = isDateAfterMaxDate(m, maxDate, offset, nextMonth);
  } // check before min date


  if (!nextMonth && minDate) {
    disabled = isDateBeforeMinDate(m, minDate, offset, prevMonth);
  }

  return disabled;
}

var CalendarDay =
/*#__PURE__*/
function (_Component) {
  _inherits(CalendarDay, _Component);

  function CalendarDay() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CalendarDay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalendarDay)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "noOp", function () {
      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick(_this.props.i, _this.props.week);
    });

    return _this;
  }

  _createClass(CalendarDay, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          i = _this$props.i,
          week = _this$props.week,
          currentDate = _this$props.currentDate,
          currentMoment = _this$props.currentMoment;
      var prevMonth = week === 0 && i > 7;
      var nextMonth = week >= 4 && i <= 14;
      /*const currentMomentCopy = moment(currentMoment);
      	if (prevMonth) {
      	currentMomentCopy.subtract(1, 'month');
      }
      	if (nextMonth) {
      	currentMomentCopy.add(1, 'month');
      }*/

      var disabled = isDayDisabled(currentMoment, this.props.minDate, this.props.maxDate, i, prevMonth, nextMonth);
      var cls = cx({
        'prev-month': prevMonth,
        'next-month': nextMonth,
        'current-day': !prevMonth && !nextMonth && !disabled && i === currentDate,
        'disabled-day': disabled
      });

      if (disabled) {
        return React__default.createElement("td", {
          className: cls,
          onClick: this.noOp
        }, i);
      } else {
        return React__default.createElement("td", {
          className: cls,
          onClick: this.onClick
        }, i);
      }
    }
  }]);

  return CalendarDay;
}(React.Component);

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function prevMonthShouldBeDisabled(currentMoment, minDate) {
  if (!minDate || moment(minDate).isAfter(currentMoment)) {
    return false;
  }

  var currentMomentCopy = moment(currentMoment);
  currentMomentCopy.subtract(1, 'month');
  currentMomentCopy.endOf('month');
  return currentMomentCopy.isBefore(minDate);
}
function nextMonthShouldBeDisabled(currentMoment, maxDate) {
  if (!maxDate || moment(maxDate).isBefore(currentMoment)) {
    return false;
  }

  var currentMomentCopy = moment(currentMoment);
  currentMomentCopy.add(1, 'month');
  currentMomentCopy.startOf('month');
  return currentMomentCopy.isAfter(maxDate);
}

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "selectDate", function (i, w) {
      var prevMonth = w === 0 && i > 7;
      var nextMonth = w >= 4 && i <= 14;
      var m = _this.props.moment;
      if (prevMonth) m.subtract(1, 'month');
      if (nextMonth) m.add(1, 'month');
      m.date(i);

      _this.props.onChange(m);

      _this.updateDisabledMonths();
    });

    _defineProperty(_assertThisInitialized(_this), "updateDisabledMonths", function () {
      var _this$props = _this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;
      var currentTime = _this.state.currentTime;

      _this.setState({
        prevMonthShouldBeDisabled: prevMonthShouldBeDisabled(currentTime, minDate),
        nextMonthShouldBeDisabled: nextMonthShouldBeDisabled(currentTime, maxDate)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "prevMonth", function (e) {
      e.preventDefault();
      var momentCopy = _this.props.moment;
      var minDate = _this.props.minDate;
      momentCopy.subtract(1, 'month');

      if (momentCopy.isBefore(minDate, 'day')) {
        momentCopy.endOf('month');
      }

      _this.updateDisabledMonths();
    });

    _defineProperty(_assertThisInitialized(_this), "nextMonth", function (e) {
      e.preventDefault();
      var momentCopy = _this.props.moment;
      var maxDate = _this.props.maxDate;
      momentCopy.add(1, 'month');

      if (momentCopy.isAfter(maxDate, 'day')) {
        momentCopy.startOf('month');
      }

      _this.updateDisabledMonths();
    });

    _this.state = {
      currentTime: _this.props.moment,
      prevMonthShouldBeDisabled: false,
      nextMonthShouldBeDisabled: false
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateDisabledMonths();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          maxDate = _this$props2.maxDate,
          minDate = _this$props2.minDate;
      var _this$state = this.state,
          nextMonthShouldBeDisabled = _this$state.nextMonthShouldBeDisabled,
          prevMonthShouldBeDisabled = _this$state.prevMonthShouldBeDisabled;
      var m = this.props.moment;
      var currentDate = m.date();
      var d1 = m.clone().subtract(1, 'month').endOf('month').date();
      var d2 = m.clone().date(1).day();
      var d3 = m.clone().endOf('month').date();
      var days = [].concat(lodash.range(d1 - d2 + 1, d1 + 1), lodash.range(1, d3 + 1), lodash.range(1, 42 - d3 - d2 + 1));
      var prevMonthButtonClasses = cx({
        'prev-month': true,
        'prev-month-disabled': prevMonthShouldBeDisabled
      });
      var nextMonthButtonClasses = cx({
        'next-month': true,
        'next-month-disabled': nextMonthShouldBeDisabled
      });
      return React__default.createElement("div", {
        className: cx('m-calendar', this.props.className)
      }, React__default.createElement("div", {
        className: "toolbar"
      }, React__default.createElement("button", {
        type: "button",
        className: prevMonthButtonClasses,
        onClick: this.prevMonth,
        disabled: prevMonthShouldBeDisabled
      }, React__default.createElement("i", {
        className: "far fa-angle-left",
        style: {
          position: 'relative',
          bottom: '1px',
          right: '1px'
        }
      })), React__default.createElement("span", {
        className: "current-date"
      }, m.format('MMMM YYYY')), React__default.createElement("button", {
        type: "button",
        className: nextMonthButtonClasses,
        onClick: this.nextMonth,
        disabled: nextMonthShouldBeDisabled
      }, React__default.createElement("i", {
        className: "far fa-angle-right",
        style: {
          position: 'relative',
          bottom: '1px',
          left: '1px'
        }
      }))), React__default.createElement("table", null, React__default.createElement("thead", null, React__default.createElement("tr", null, DAYS.map(function (d) {
        return React__default.createElement("td", {
          key: d
        }, d);
      }))), React__default.createElement("tbody", null, lodash.chunk(days, 7).map(function (row, week) {
        return React__default.createElement("tr", {
          key: week
        }, row.map(function (i) {
          return React__default.createElement(CalendarDay, {
            key: i,
            i: i,
            currentDate: currentDate,
            week: week,
            onClick: _this2.selectDate,
            currentMoment: m,
            minDate: minDate,
            maxDate: maxDate
          });
        }));
      }))));
    }
  }]);

  return Calendar;
}(React.Component);

var InputSlider =
/*#__PURE__*/
function (_Component) {
  _inherits(InputSlider, _Component);

  function InputSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InputSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InputSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onSliderClick", function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "getClientPosition", function (e) {
      var touches = e.touches;

      if (touches && touches.length) {
        var finger = touches[0];
        return {
          x: finger.clientX,
          y: finger.clientY
        };
      }

      return {
        x: e.clientX,
        y: e.clientY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getPosition", function () {
      var top = (_this.props.y - _this.props.ymin) / (_this.props.ymax - _this.props.ymin) * 100;
      var left = (_this.props.x - _this.props.xmin) / (_this.props.xmax - _this.props.xmin) * 100;
      if (top > 100) top = 100;
      if (top < 0) top = 0;
      if (_this.props.axis === 'x') top = 0;
      top += '%';
      if (left > 100) left = 100;
      if (left < 0) left = 0;
      if (_this.props.axis === 'y') left = 0;
      left += '%';
      return {
        top: top,
        left: left
      };
    });

    _defineProperty(_assertThisInitialized(_this), "change", function (pos, dragEnd) {
      if (!_this.props.onChange) return;
      var rect = ReactDOM__default.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();
      var width = rect.width,
          height = rect.height;
      var _this$props = _this.props,
          axis = _this$props.axis,
          xstep = _this$props.xstep,
          ystep = _this$props.ystep,
          xmax = _this$props.xmax,
          xmin = _this$props.xmin,
          ymax = _this$props.ymax,
          ymin = _this$props.ymin;
      var top = pos.top,
          left = pos.left;
      var dx = 0;
      var dy = 0;
      if (left < 0) left = 0;
      if (left > width) left = width;
      if (top < 0) top = 0;
      if (top > height) top = height;

      if (axis === 'x' || axis === 'xy') {
        dx = left / width * (xmax - xmin);
      }

      if (axis === 'y' || axis === 'xy') {
        dy = top / height * (ymax - ymin);
      }

      dx = Math.round(dx);
      dy = Math.round(dy);
      var x = (dx !== 0 ? parseInt(dx / xstep, 10) * xstep : 0) + xmin;
      var y = (dy !== 0 ? parseInt(dy / ystep, 10) * ystep : 0) + ymin;

      _this.props.onChange({
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      e.preventDefault();
      var dom = _this.handleRef;

      var clientPos = _this.getClientPosition(e);

      _this.start = {
        x: dom.offsetLeft,
        y: dom.offsetTop
      };
      _this.offset = {
        x: clientPos.x,
        y: clientPos.y
      };
      document.addEventListener('mousemove', _this.handleDrag);
      document.addEventListener('mouseup', _this.handleDragEnd);
      document.addEventListener('touchmove', _this.handleDrag, {
        passive: false
      });
      document.addEventListener('touchend', _this.handleDragEnd);
      document.addEventListener('touchcancel', _this.handleDragEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "getPos", function (e) {
      var clientPos = _this.getClientPosition(e);

      var rect = ReactDOM__default.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();
      var posX = clientPos.x + _this.start.x - _this.offset.x;
      var posY = clientPos.y + _this.start.y - _this.offset.y;
      return {
        left: posX,
        top: posY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrag", function (e) {
      e.preventDefault();

      _this.change(_this.getPos(e));
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', _this.handleDrag);
      document.removeEventListener('mouseup', _this.handleDragEnd);
      document.removeEventListener('touchmove', _this.handleDrag, {
        passive: false
      });
      document.removeEventListener('touchend', _this.handleDragEnd);
      document.removeEventListener('touchcancel', _this.handleDragEnd);

      if (_this.props.onDragEnd) {
        _this.props.onDragEnd();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var clientPos = _this.getClientPosition(e);

      var rect = ReactDOM__default.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();

      _this.change({
        left: clientPos.x - rect.left,
        top: clientPos.y - rect.top
      }, true);
    });

    return _this;
  }

  _createClass(InputSlider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var axis = this.props.axis;
      var props = blacklist(this.props, 'axis', 'x', 'y', 'xmin', 'xmax', 'ymin', 'ymax', 'xstep', 'ystep', 'onChange', 'onDragEnd', 'className', 'onClick');
      var pos = this.getPosition();
      var valueStyle = {};
      if (axis === 'x') valueStyle.width = pos.left;
      if (axis === 'y') valueStyle.height = pos.top;
      props.className = cx('u-slider', "u-slider-".concat(axis), this.props.className);
      return React__default.createElement("div", _extends({}, props, {
        onClick: this.handleClick
      }), React__default.createElement("div", {
        className: "value",
        style: valueStyle
      }), React__default.createElement("div", {
        className: "handle",
        ref: function ref(_ref) {
          return _this2.handleRef = _ref;
        },
        onTouchStart: this.handleMouseDown,
        onMouseDown: this.handleMouseDown,
        onClick: this.onSliderClick,
        style: pos
      }));
    }
  }]);

  return InputSlider;
}(React.Component);

_defineProperty(InputSlider, "propTypes", {
  axis: PropTypes.string,
  x: PropTypes.number,
  xmax: PropTypes.number,
  xmin: PropTypes.number,
  y: PropTypes.number,
  ymax: PropTypes.number,
  ymin: PropTypes.number,
  xstep: PropTypes.number,
  ystep: PropTypes.number
});

_defineProperty(InputSlider, "defaultProps", {
  axis: 'x',
  xmin: 0,
  ymin: 0,
  xstep: 1,
  ystep: 1
});

var _default =
/*#__PURE__*/
function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "changeHours", function (pos) {
      var m = _this.props.moment;
      m.hours(pos.x);

      _this.props.onChange(m);
    });

    _defineProperty(_assertThisInitialized(_this), "changeMinutes", function (pos) {
      var m = _this.props.moment;
      m.minutes(pos.x);

      _this.props.onChange(m);
    });

    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var m = this.props.moment;
      return React__default.createElement("div", {
        className: cx('m-time', this.props.className)
      }, React__default.createElement("div", {
        className: "showtime"
      }, React__default.createElement("span", {
        className: "time"
      }, m.format('HH')), React__default.createElement("span", {
        className: "separater"
      }, ":"), React__default.createElement("span", {
        className: "time"
      }, m.format('mm'))), React__default.createElement("div", {
        className: "sliders"
      }, React__default.createElement("div", {
        className: "time-text"
      }, "Hours:"), React__default.createElement(InputSlider, {
        className: "u-slider-time",
        xmin: this.props.minHour,
        xmax: this.props.maxHour,
        x: m.hour(),
        onChange: this.changeHours
      }), React__default.createElement("div", {
        className: "time-text"
      }, "Minutes:"), React__default.createElement(InputSlider, {
        className: "u-slider-time",
        xmin: this.props.minMinute,
        xmax: this.props.maxMinute,
        x: m.minute(),
        onChange: this.changeMinutes
      })));
    }
  }]);

  return _default;
}(React.Component);

var tabDisabled = {
  cursor: 'default',
  width: '100%'
};

var InputMoment =
/*#__PURE__*/
function (_Component) {
  _inherits(InputMoment, _Component);

  function InputMoment() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InputMoment);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InputMoment)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      tab: 'date'
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickTab", function (e, tab) {
      e.preventDefault();

      _this.setState({
        tab: e.target.name
      });
    });

    return _this;
  }

  _createClass(InputMoment, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.dateDisabled) {
        this.setState({
          tab: 'time'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var tab = this.state.tab;
      var _this$props = this.props,
          m = _this$props.moment,
          className = _this$props.className,
          clearInput = _this$props.clearInput,
          dateDisabled = _this$props.dateDisabled,
          handleClose = _this$props.handleClose,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          minHour = _this$props.minHour,
          maxHour = _this$props.maxHour,
          minMinute = _this$props.minMinute,
          maxMinute = _this$props.maxMinute,
          saveDate = _this$props.saveDate,
          timeDisabled = _this$props.timeDisabled;
      var cls = cx('m-input-moment', className);
      return React__default.createElement("div", {
        className: cls
      }, React__default.createElement("div", {
        className: "m-b-xs"
      }, typeof saveDate === 'function' && React__default.createElement("span", {
        className: "apm-cursor-p m-r-sm",
        onClick: saveDate
      }, React__default.createElement("i", {
        className: "fal fa-save m-r-xs",
        style: {
          marginRight: '3px'
        }
      }), "Save"), typeof clearInput === 'function' && React__default.createElement("span", {
        className: "apm-cursor-p",
        onClick: clearInput
      }, React__default.createElement("i", {
        className: "fal fa-empty-set",
        style: {
          marginRight: '3px'
        }
      }), "Clear"), typeof handleClose === 'function' && React__default.createElement("span", {
        className: "apm-cursor-p apm-color-red pull-right",
        onClick: handleClose
      }, React__default.createElement("i", {
        className: "fal fa-times",
        style: {
          marginRight: '3px'
        }
      }))), React__default.createElement("div", {
        className: "options"
      }, !dateDisabled && React__default.createElement("button", {
        className: cx('im-btn', {
          'is-active': tab === 'date'
        }),
        name: "date",
        onClick: this.handleClickTab,
        style: timeDisabled ? tabDisabled : {},
        type: "button"
      }, React__default.createElement("i", {
        className: "fal fa-calendar-alt fa-sm m-r-xs"
      }), "Date"), !timeDisabled && React__default.createElement("button", {
        className: cx('im-btn', {
          'is-active': tab === 'time'
        }),
        name: "time",
        onClick: this.handleClickTab,
        style: dateDisabled ? tabDisabled : {},
        type: "button"
      }, React__default.createElement("i", {
        className: "fal fa-clock fa-sm m-r-xs"
      }), "Time")), React__default.createElement("div", {
        className: "tabs"
      }, !dateDisabled && React__default.createElement(Calendar, {
        className: cx('tab', {
          'is-active': tab === 'date'
        }),
        maxDate: maxDate,
        minDate: minDate,
        moment: m,
        onChange: this.props.onChange
      }), !timeDisabled && React__default.createElement(_default, {
        className: cx('tab', {
          'is-active': tab === 'time'
        }),
        minHour: minHour,
        maxHour: maxHour,
        minMinute: minMinute,
        maxMinute: maxMinute,
        moment: m,
        onChange: this.props.onChange
      })));
    }
  }]);

  return InputMoment;
}(React.Component);

_defineProperty(InputMoment, "propTypes", {
  clearInput: PropTypes.func,
  dateDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  minHour: PropTypes.number,
  maxHour: PropTypes.number,
  minMinute: PropTypes.number,
  maxMinute: PropTypes.number,
  saveDate: PropTypes.func,
  timeDisabled: PropTypes.bool
});

_defineProperty(InputMoment, "defaultProps", {
  clearInput: null,
  dateDisabled: false,
  handleClose: null,
  minDate: null,
  maxDate: null,
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  saveDate: null,
  timeDisabled: false
});

var DEFAULT_FORMAT_MASKS = {
  datetime: 'YYYY-MM-DD HH:mm',
  date: 'YYYY-MM-DD',
  time: 'HH:mm'
};
var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isPickerMode", function () {
      if (!_this.pickerRef) return false;

      var pickerBound = _this.pickerRef.getBoundingClientRect();

      var windowHeight = window.innerHeight;

      if (pickerBound.bottom > windowHeight) {
        _this.setState({
          pickerMode: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDateFormat", function () {
      return DEFAULT_FORMAT_MASKS[_this.props.type];
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      var _this$props = _this.props,
          name = _this$props.name,
          onBlur = _this$props.onBlur;
      var _this$state = _this.state,
          hasError = _this$state.hasError,
          value = _this$state.value;
      if (!_this.state.focused) return;

      _this.setState({
        focused: false
      }, function () {
        if (typeof onBlur === 'function' && _this.lastVal !== value) {
          onBlur(hasError, value, name);
          _this.lastVal = value;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (evt) {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          onChange = _this$props2.onChange,
          required = _this$props2.required;

      var mask = _this.getDateFormat();

      var value = evt.target.value;
      var hasError = value.length > 0 ? !_this.validDate(value) : !!required;

      _this.setState({
        inputMode: !_this.state.pickerMode || value.length > 0,
        hasError: hasError,
        value: value
      }, function () {
        if (typeof onChange === 'function') {
          onChange(hasError, value, name);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateTimeChange", function (newVal) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          onChange = _this$props3.onChange,
          required = _this$props3.required,
          type = _this$props3.type;

      var mask = _this.getDateFormat();

      var value = newVal.format(mask);

      _this.setState({
        hasError: !!required && !value,
        value: value
      }, function () {
        if (typeof onChange === 'function') {
          onChange(false, value, name);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearInput", function () {
      var _this$props4 = _this.props,
          name = _this$props4.name,
          onChange = _this$props4.onChange;
      var value = '';
      var hasError = !!_this.props.required;

      _this.setState({
        hasError: hasError,
        value: value
      }, function () {
        if (typeof onChange === 'function') {
          onChange(hasError, value, name);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPicker", function () {
      if (!_this.state.focused) {
        return null;
      }

      var _this$props5 = _this.props,
          pickerStyle = _this$props5.pickerStyle,
          portalRef = _this$props5.portalRef;
      var picker = React__default.createElement("div", {
        className: "apm-datepicker-input ignore-react-onclickoutside",
        ref: function ref(_ref) {
          return _this.pickerRef = _ref;
        },
        style: pickerStyle.container
      }, React__default.createElement(InputMoment, {
        clearInput: _this.clearInput,
        dateDisabled: _this.props.type === 'time',
        handleClose: _this.handleClose,
        nextMonthIcon: "fa fa-angle-right",
        maxDate: _this.props.maxDate,
        minDate: _this.props.minDate,
        maxHour: _this.props.maxHour,
        minHour: _this.props.minHour,
        maxMinute: _this.props.maxMinute,
        minMinute: _this.props.minMinute,
        moment: _this.moment,
        onChange: _this.handleDateTimeChange,
        prevMonthIcon: "fa fa-angle-left",
        timeDisabled: _this.props.type === 'date'
      }));

      if (!!portalRef) {
        return ReactDOM.createPortal(picker, portalRef);
      }

      return picker;
    });

    var _this$props6 = _this.props,
        _required = _this$props6.required,
        _value = _this$props6.value;
    var val = '';

    var _mask = _this.getDateFormat();

    if (!moment(_value).isValid()) {
      _this.moment = new moment(new Date(), _mask);
    } else {
      _this.moment = new moment(_value, _mask);
      val = _this.moment.format(_mask);
    }

    _this.lastVal = val; // @focused(bool) - if the date picker popup is open
    // @hasError(bool) - if there is an error with the users 
    // 	selected date
    // @inputMode - true if there is not enough space to render the
    // 	datepicker in the viewport; false otherwise
    // @pickerMode - enabled if the datepicker can fit in the viewport;
    // 	otherwise the user enters the date directly
    // @value(string) - current value in the input field

    _this.state = {
      focused: _this.props.autoFocus,
      hasError: !!_required & !val,
      inputMode: false,
      pickerMode: true,
      value: val
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isPickerMode(); //window.addEventListener('resize', this.isPickerMode);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.value.toString() !== nextProps.value.toString()) {
        var val = '';

        if (!!nextProps.value) {
          val = nextProps.value;
        }

        this.setState({
          hasError: !!this.props.required && !nextProps.value,
          value: val
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {} //window.removeEventListener('resize', this.isPickerMode);
    // checks if the datepicker is in picker mode depending if the date picker 
    // can render inside the viewport; if it can't the date will be entered
    // directly by the user

  }, {
    key: "validDate",
    value: function validDate(value) {
      var type = this.props.type;
      var mask = this.getDateFormat();
      var valid;

      if (value.length !== mask.length) {
        return false;
      }

      if (type === 'datetime') {
        valid = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/.test(value);
      } else if (type === 'date') {
        valid = /\d{4}-\d{2}-\d{2}/.test(value);
      } else if (type === 'time') {
        valid = /\d{2}:\d{2}/.test(value);
      }

      return valid ? new moment(value, mask).isValid() : false;
    } // when user selects a date or time on the datetime picker

  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props7 = this.props,
          disabled = _this$props7.disabled,
          error = _this$props7.error,
          maxDate = _this$props7.maxDate,
          minDate = _this$props7.minDate,
          name = _this$props7.name,
          onBlur = _this$props7.onBlur,
          maxHour = _this$props7.maxHour,
          minHour = _this$props7.minHour,
          maxMinute = _this$props7.maxMinute,
          minMinute = _this$props7.minMinute,
          pickerStyle = _this$props7.pickerStyle,
          portalRef = _this$props7.portalRef,
          required = _this$props7.required,
          type = _this$props7.type,
          validation = _this$props7.validation,
          disableOnClickOutside = _this$props7.disableOnClickOutside,
          enableOnClickOutside = _this$props7.enableOnClickOutside,
          eventTypes = _this$props7.eventTypes,
          outsideClickIgnoreClass = _this$props7.outsideClickIgnoreClass,
          preventDefault = _this$props7.preventDefault,
          stopPropagation = _this$props7.stopPropagation,
          props = _objectWithoutProperties(_this$props7, ["disabled", "error", "maxDate", "minDate", "name", "onBlur", "maxHour", "minHour", "maxMinute", "minMinute", "pickerStyle", "portalRef", "required", "type", "validation", "disableOnClickOutside", "enableOnClickOutside", "eventTypes", "outsideClickIgnoreClass", "preventDefault", "stopPropagation"]);

      var _this$state2 = this.state,
          hasError = _this$state2.hasError,
          inputMode = _this$state2.inputMode,
          pickerMode = _this$state2.pickerMode,
          value = _this$state2.value;
      var iconClasses = cx({
        'fal': true,
        'fa-calendar-alt': type !== 'time',
        'fa-clock': type === 'time'
      });
      var inputClasses = cx((_classNames = {
        'apm-datepicker-input-group': true
      }, _defineProperty(_classNames, this.props.className, !!this.props.className), _defineProperty(_classNames, 'apm-error-border-color', error !== null ? error : hasError), _classNames));
      return React__default.createElement("div", {
        className: "apm-mi-container"
      }, React__default.createElement("div", {
        className: inputClasses
      }, React__default.createElement("span", {
        className: "apm-datepicker-input-group-addon",
        style: {
          color: hasError ? '#be1717' : '#16181e'
        }
      }, React__default.createElement("i", {
        className: iconClasses
      })), React__default.createElement("input", _extends({}, props, {
        "data-testid": 'datepicker-input-' + this.props.name,
        className: "apm-mi-form-control apm-width-100p",
        disabled: disabled,
        onChange: this.handleInputChange // everything is handled through date picker
        ,
        onClick: this.onClick,
        placeholder: this.getDateFormat(),
        style: {
          border: 0,
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: hasError ? '#be1717' : '#16181e'
        },
        type: "text",
        value: value
      })), pickerMode && !inputMode && this.renderPicker()));
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "propTypes", {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxHour: PropTypes.number,
  minHour: PropTypes.number,
  minMinute: PropTypes.number,
  maxMinute: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  pickerStyle: PropTypes.shape({
    container: PropTypes.object
  }),
  required: PropTypes.bool,
  type: PropTypes.oneOf(['date', 'datetime', 'time']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
});

_defineProperty(DatePicker, "defaultProps", {
  className: '',
  disabled: false,
  error: null,
  maxDate: null,
  minDate: null,
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  pickerStyle: {},
  name: '',
  onBlur: null,
  onChange: null,
  required: false,
  type: 'datetime',
  value: ''
});

var DatePickerComponent = onClickOutside(DatePicker);

var TextInput = function TextInput(_ref) {
  var validation = _ref.validation,
      props = _objectWithoutProperties(_ref, ["validation"]);

  var validate = [noEmptyStrings, validation];
  var inputState = useInputState(_objectSpread({
    validate: validate,
    parse: parse$1
  }, props));
  var inputClasses = cx('apm-mi-form-control', props.className);
  return React__default.createElement("input", _extends({
    autoComplete: "false",
    type: "text"
  }, props, {
    className: inputClasses
  }, inputState));
};

function noEmptyStrings(value, input) {
  if (input.required && !value.trim().length) {
    return 'This field is required.';
  }
}

function parse$1(value) {
  /// non string values could get passed in initially as a prop
  if (typeof value === 'string') {
    return value.trim();
  } else if (!isNaN(value) && value !== null) {
    // apparently isNaN(null) is false...
    return value.toString();
  } else if (!value) {
    return '';
  }
}

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var EmailInput = function EmailInput(_ref) {
  var validation = _ref.validation,
      props = _objectWithoutProperties(_ref, ["validation"]);

  // return a better error message than what some browsers provide ('Match the requested format')
  // but use have the browser determine if theres an error
  /// (Im doing the regex test as well because the testing environment returns an empyt object for input.validity)
  function isEmail(value, input) {
    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
    if (input.validity.patternMismatch || !EMAIL_REGEX.test(value)) {
      return 'Not a valid email address.';
    } else if (typeof validation === 'function') {
      var customError = validation(value, input);
      return customError;
    }
  }

  return React__default.createElement(TextInput, _extends({}, props, {
    type: "email",
    validation: isEmail
  }));
};

var FileInput =
/*#__PURE__*/
function (_Component) {
  _inherits(FileInput, _Component);

  function FileInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FileInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FileInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (acceptedFiles, rejectedFiles) {
      var name = _this.props.name;

      _this.props.onDrop(acceptedFiles, rejectedFiles, name);
    });

    return _this;
  }

  _createClass(FileInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          name = _this$props.name,
          props = _objectWithoutProperties(_this$props, ["children", "name"]);

      return React__default.createElement(Dropzone, _extends({
        activeClassName: "apm-mi-file-input-active",
        className: "apm-mi-file-input"
      }, props, {
        name: name,
        onDrop: this.onDrop
      }), children);
    }
  }]);

  return FileInput;
}(React.Component);

_defineProperty(FileInput, "propTypes", {
  name: PropTypes.string,
  onDrop: PropTypes.func.isRequired
});

var FloatInput = function FloatInput(_ref) {
  var validation = _ref.validation,
      precision = _ref.precision,
      props = _objectWithoutProperties(_ref, ["validation", "precision"]);

  var validate = [validation];
  var inputState = useInputState(_objectSpread({
    validate: validate,
    parse: parse
  }, props));
  var inputClasses = cx('apm-mi-form-control', props.className);

  function parse(value) {
    if (isNaN(value)) {
      //avoid passing NaN into input 
      return '';
    } else if (!isNaN(precision)) {
      return Number(parseFloat(value).toFixed(precision));
    } else {
      return parseFloat(value);
    }
  }

  return React__default.createElement("input", _extends({}, props, inputState, {
    className: inputClasses,
    type: "number"
  }));
};

var IntegerInput = function IntegerInput(_ref) {
  var validation = _ref.validation,
      props = _objectWithoutProperties(_ref, ["validation"]);

  var validate = [noDecimals, validation];
  var inputState = useInputState(_objectSpread({
    validate: validate,
    parse: parse$2
  }, props));
  var inputClasses = cx('apm-mi-form-control', props.className);
  return React__default.createElement("input", _extends({}, props, inputState, {
    className: inputClasses,
    type: "number"
  }));
};

function parse$2(value) {
  if (isNaN(value)) return ''; //avoid passing NaN into input

  return parseInt(value);
} /// check if value is a float (1.000 wont throw an error in an input by default)


function noDecimals(num) {
  if (String(num).indexOf('.') > -1) {
    return 'No decimal values.';
  }
}

var Spinner = function Spinner(_ref) {
  var className = _ref.className;
  return React__default.createElement("i", {
    className: "fa fa-spinner apm-spinner ".concat(className)
  });
};

Spinner.propTypes = {
  className: PropTypes.string
};
Spinner.defaultProps = {
  className: ''
};

var ListFilterItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ListFilterItem, _Component);

  function ListFilterItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListFilterItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListFilterItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      event.stopPropagation();

      _this.props.onClick(_this.props.option);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      _this.props.onMouseOver(_this.props.index);
    });

    return _this;
  }

  _createClass(ListFilterItem, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          CustomListItem = _this$props.CustomListItem,
          listClasses = _this$props.listClasses,
          option = _this$props.option,
          selected = _this$props.selected,
          style = _this$props.style;
      var liClasses = cx('apm-list-filter-menu-li', (_classNames = {}, _defineProperty(_classNames, listClasses.item, !!listClasses.item), _defineProperty(_classNames, 'apm-list-filter-menu-li-highlight', selected), _classNames));
      return React__default.createElement("li", {
        className: liClasses,
        onClick: this.onClick,
        onMouseOver: this.onMouseOver,
        style: style
      }, typeof CustomListItem === 'function' && React__default.isValidElement(React__default.createElement(CustomListItem, null)) ? React__default.createElement(CustomListItem, {
        option: option
      }) : !!option && _typeof(option) === 'object' ? option.name : option);
    }
  }]);

  return ListFilterItem;
}(React.Component);

_defineProperty(ListFilterItem, "propTypes", {
  CustomListItem: PropTypes.func,
  listClasses: PropTypes.object,
  onClick: PropTypes.func,
  option: PropTypes.string,
  selected: PropTypes.bool
});

_defineProperty(ListFilterItem, "defaultProps", {
  CustomListItem: null,
  listClasses: {},
  selected: false
});

/**
 * PolyFills make me sad
 */
var KeyEvent = {};
KeyEvent.DOM_VK_TAB = KeyEvent.DOM_VK_TAB || 9;
KeyEvent.DOM_VK_RETURN = KeyEvent.DOM_VK_RETURN || 13;
KeyEvent.DOM_VK_ENTER = KeyEvent.DOM_VK_ENTER || 14;
KeyEvent.DOM_VK_UP = KeyEvent.DOM_VK_UP || 38;
KeyEvent.DOM_VK_DOWN = KeyEvent.DOM_VK_DOWN || 40;
KeyEvent.DOM_VK_ESCAPE = KeyEvent.DOM_VK_ESCAPE || 27;

var _AUTOCOMPLETE_KEYS, _NAVIGATION_KEYS;

var AUTOCOMPLETE_KEYS = (_AUTOCOMPLETE_KEYS = {}, _defineProperty(_AUTOCOMPLETE_KEYS, KeyEvent.DOM_VK_RETURN, true), _defineProperty(_AUTOCOMPLETE_KEYS, KeyEvent.DOM_VK_ENTER, true), _AUTOCOMPLETE_KEYS); // keycodes for going up and down the list

var NAVIGATION_KEYS = (_NAVIGATION_KEYS = {}, _defineProperty(_NAVIGATION_KEYS, KeyEvent.DOM_VK_UP, true), _defineProperty(_NAVIGATION_KEYS, KeyEvent.DOM_VK_DOWN, true), _NAVIGATION_KEYS); // list filter takes a list of options and filters on them as the user types

var ListFilter =
/*#__PURE__*/
function (_Component) {
  _inherits(ListFilter, _Component);

  function ListFilter(props) {
    var _this;

    _classCallCheck(this, ListFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListFilter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "checkForError", function (value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var required = arguments.length > 2 ? arguments[2] : undefined;
      var _this$props = _this.props,
          name = _this$props.name,
          matchOnEmpty = _this$props.matchOnEmpty,
          validation = _this$props.validation;
      var hasError = !value && !!required;
      var validInput = options.find(function (option) {
        return option === value;
      });

      if (!hasError && !!value && !validInput) {
        hasError = true;
      } else if (!hasError && typeof validation === 'function') {
        hasError = validation(value, name, options);
      }

      return hasError;
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      if (typeof _this.props.customFilter === 'function') {
        _this.customFilterMatches(_this.state.value);
      }

      _this.setState({
        focused: true
      }, function () {
        if (typeof _this.props.onFocus === 'function') {
          _this.props.onFocus(event);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.setState({
        focused: false,
        selectedOptionIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterMatches", function (value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var newOptions = fuzzy.filter(value, options);
      return newOptions.map(function (option) {
        return option.original;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "customFilterMatches", function (value) {
      _this.setState({
        loadingFilter: true,
        value: value
      }, function () {
        new Promise(function (resolve, reject) {
          resolve(_this.props.customFilter(value));
        }).then(function (newOptions) {
          _this.loadCustomFilterOptions(value, newOptions);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadCustomFilterOptions", function (value, newOptions) {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          matchOnEmpty = _this$props2.matchOnEmpty,
          onChange = _this$props2.onChange,
          onMatch = _this$props2.onMatch,
          required = _this$props2.required;

      _this.setState({
        hasError: _this.checkForError(value, newOptions, required),
        loadingFilter: false,
        options: newOptions,
        selectedOptionIndex: -1,
        value: value
      }, function () {
        // fire onMatch if the value matches an option in the list
        if (!!value && typeof onMatch === 'function' && !_this.state.hasError && value !== _this.lastMatchedVal) {
          onMatch(value, name);
          _this.lastMatchedVal = value;
        } else if (!value && matchOnEmpty && !_this.state.hasError && _this.lastMatchedVal !== '') {
          onMatch('', name);
          _this.lastMatchedVal = '';
        } else if (typeof onChange === 'function') {
          onChange(_this.state.hasError, value, name);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (!_this.state.focused) {
        return;
      } // autofill from first option in the list if its available


      if (AUTOCOMPLETE_KEYS[event.keyCode]) {
        event.preventDefault();
        event.stopPropagation();

        _this.autoCompleteKeyDown(); // navigate highlighted option up or down

      } else if (NAVIGATION_KEYS[event.keyCode]) {
        event.stopPropagation();

        _this.navigationKeyDown(event.keyCode); // escape closes options

      } else if (_this.state.focused && (event.keyCode === KeyEvent.DOM_VK_ESCAPE || event.keyCode == KeyEvent.DOM_VK_TAB)) {
        _this.setState({
          focused: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if (AUTOCOMPLETE_KEYS[event.keyCode] || NAVIGATION_KEYS[event.keyCode]) {
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "autoCompleteKeyDown", function () {
      var _this$props3 = _this.props,
          customFilter = _this$props3.customFilter,
          onChange = _this$props3.onChange,
          onMatch = _this$props3.onMatch,
          name = _this$props3.name;
      var _this$state = _this.state,
          options = _this$state.options,
          selectedOptionIndex = _this$state.selectedOptionIndex;
      var option; // grab appropriate option from the list if it exists

      if (selectedOptionIndex > -1) {
        option = options[selectedOptionIndex];
      } else if (options.length > 0) {
        option = options[0];
      } else {
        // do nothing
        return;
      }

      if (typeof customFilter === 'function') {
        _this.setState({
          value: option
        }, function () {
          _this.customFilterMatches(option);
        });

        return;
      }

      var newOptions = _this.filterMatches(option, _this.props.options);

      _this.setState({
        focused: false,
        hasError: false,
        options: newOptions,
        selectedOptionIndex: -1,
        value: option
      }, function () {
        if (typeof onMatch === 'function' && _this.lastMatchedVal !== option) {
          onMatch(option, name);
          _this.lastMatchedVal = option;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "navigationKeyDown", function (keyCode) {
      var _this$state2 = _this.state,
          options = _this$state2.options,
          selectedOptionIndex = _this$state2.selectedOptionIndex;
      var newIndex;

      if (keyCode === KeyEvent.DOM_VK_DOWN) {
        newIndex = (selectedOptionIndex + 1) % options.length;
      } else {
        newIndex = selectedOptionIndex < 0 ? (options.length + selectedOptionIndex) % options.length : (options.length + selectedOptionIndex - 1) % options.length;
      }

      _this.setState({
        selectedOptionIndex: newIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props4 = _this.props,
          customFilter = _this$props4.customFilter,
          matchOnEmpty = _this$props4.matchOnEmpty,
          name = _this$props4.name,
          onChange = _this$props4.onChange,
          onMatch = _this$props4.onMatch,
          options = _this$props4.options,
          required = _this$props4.required;
      var value = event.target.value;

      if (typeof customFilter === 'function') {
        _this.setState({
          value: value
        }, function () {
          _this.customFilterMatches(value);
        });

        return;
      }

      var newOptions = !value ? options : _this.filterMatches(value, options);

      _this.setState({
        hasError: _this.checkForError(value, newOptions, required),
        options: newOptions,
        selectedOptionIndex: -1,
        value: value
      }, function () {
        // fire onMatch if the value matches an option in the list or
        // if there is no value and its not required
        if (typeof onMatch === 'function' && !_this.state.hasError && _this.lastMatchedVal !== value) {
          onMatch(value, name);
          _this.lastMatchedVal = value; // if input is empty and matches are triggered on empty matches
        } else if (!value && matchOnEmpty && !_this.state.hasError && _this.lastMatchedVal !== '') {
          onMatch('', name);
          _this.lastMatchedVal = ''; // otherwise it was just a change event w/ no match
        } else if (typeof onChange === 'function') {
          onChange(_this.state.hasError, value, name);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearInput", function () {
      _this.onChange({
        target: {
          value: ''
        }
      });

      _this.inputRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onListItemClick", function (selectedOption) {
      var _this$props5 = _this.props,
          customFilter = _this$props5.customFilter,
          name = _this$props5.name,
          onMatch = _this$props5.onMatch,
          options = _this$props5.options;

      if (typeof customFilter === 'function') {
        _this.setState({
          value: selectedOption
        }, function () {
          _this.customFilterMatches(selectedOption);
        });

        return;
      }

      _this.setState({
        hasError: false,
        options: _this.filterMatches(selectedOption, options),
        selectedOptionIndex: -1,
        value: selectedOption
      }, function () {
        if (typeof onMatch === 'function' && _this.lastMatchedVal !== selectedOption) {
          onMatch(selectedOption, name);
          _this.lastMatchedVal = selectedOption;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onListItemMouseOver", function (index) {
      _this.setState({
        selectedOptionIndex: index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderIncrementalSearchResults", function () {
      if (!_this.state.focused) {
        return null;
      }

      var _this$props6 = _this.props,
          listClasses = _this$props6.listClasses,
          listStyle = _this$props6.listStyle,
          portalRef = _this$props6.portalRef;
      var _this$state3 = _this.state,
          options = _this$state3.options,
          selectedOptionIndex = _this$state3.selectedOptionIndex;
      var listContainerClasses = cx('apm-list-filter-menu-ul', _defineProperty({}, listClasses.container, !!listClasses.container), 'ignore-react-onclickoutside');
      var listContainer = React__default.createElement("ul", {
        className: listContainerClasses,
        style: listStyle.container
      }, Array.isArray(options) && options.length > 0 ? options.map(function (option, i) {
        return React__default.createElement(ListFilterItem, {
          CustomListItem: _this.props.CustomListItem,
          index: i,
          key: i,
          listClasses: listClasses,
          onClick: _this.onListItemClick,
          onMouseOver: _this.onListItemMouseOver,
          option: option,
          selected: selectedOptionIndex === i,
          style: listStyle.item
        });
      }) : null);

      if (!!portalRef) {
        return ReactDOM.createPortal(listContainer, portalRef);
      }

      return listContainer;
    });

    var _this$props7 = _this.props,
        _required = _this$props7.required,
        _value = _this$props7.value;
    _this.lastMatchedVal = _value; // @focused: true when the input box is focused; false otherwise
    // @hasError: true when the list filter has an error due to a 
    // 	mismatch or no value and it is required
    // @loadingFilter: true when loading in new options from a 
    // 	custom filter; false otherwise
    // @options: list of current options displayed to the user
    // @selectedOptionIndex: current option selected by the user
    // 	using the arrow keys
    // @value: current value in the input box

    _this.state = {
      focused: !!_this.props.autoFocus,
      hasError: false,
      loadingFilter: false,
      options: _this.props.options,
      selectedOptionIndex: -1,
      value: _value
    };
    return _this;
  }

  _createClass(ListFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props8 = this.props,
          customFilter = _this$props8.customFilter,
          name = _this$props8.name,
          onMatch = _this$props8.onMatch,
          options = _this$props8.options,
          required = _this$props8.required;
      var value = this.state.value;
      var newOptions = options;

      if (typeof customFilter === 'function') {
        this.customFilterMatches(value);
        return;
      } // initialize options list if given an initial value


      if (!!value) {
        newOptions = this.filterMatches(value, options);
      }

      this.setState({
        hasError: this.checkForError(value, newOptions, required),
        options: newOptions,
        value: value
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // if new value passed in, refilter list and check for error
      if (!!nextProps.value && this.state.value !== nextProps.value) {
        var _this$props9 = this.props,
            customFilter = _this$props9.customFilter,
            name = _this$props9.name,
            required = _this$props9.required;
        var options = this.props.options;
        var value = nextProps.value;

        if (typeof customFilter === 'function') {
          this.setState({
            value: value
          }, function () {
            _this2.customFilterMatches(value);
          });
          return;
        } // new list of options passed in with value


        if (!!nextProps.options && this.props.options !== nextProps.options && !customFilter) {
          options = nextProps.options;
        }

        if (!!value) {
          options = this.filterMatches(value, options);
        }

        var hasError = this.checkForError(value, options, required);

        if (!hasError) {
          this.lastMatchedVal = value;
        }

        this.setState({
          hasError: hasError,
          options: options,
          value: value
        }); // new list of options were passed in
      } else if (this.props.options !== nextProps.options && !this.props.customFilter) {
        var _required2 = this.props.required;
        var _value2 = this.state.value;
        var newOptions = this.filterMatches(_value2, nextProps.options);
        this.setState({
          hasError: this.checkForError(_value2, newOptions, _required2),
          options: newOptions
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames2,
          _this3 = this;

      var _this$props10 = this.props,
          customFilter = _this$props10.customFilter,
          CustomListItem = _this$props10.CustomListItem,
          disabled = _this$props10.disabled,
          disableOnClickOutside = _this$props10.disableOnClickOutside,
          enableOnClickOutside = _this$props10.enableOnClickOutside,
          eventTypes = _this$props10.eventTypes,
          listClasses = _this$props10.listClasses,
          listStyle = _this$props10.listStyle,
          matchOnEmpty = _this$props10.matchOnEmpty,
          name = _this$props10.name,
          onMatch = _this$props10.onMatch,
          options = _this$props10.options,
          outsideClickIgnoreClass = _this$props10.outsideClickIgnoreClass,
          portalRef = _this$props10.portalRef,
          preventDefault = _this$props10.preventDefault,
          required = _this$props10.required,
          stopPropagation = _this$props10.stopPropagation,
          validation = _this$props10.validation,
          props = _objectWithoutProperties(_this$props10, ["customFilter", "CustomListItem", "disabled", "disableOnClickOutside", "enableOnClickOutside", "eventTypes", "listClasses", "listStyle", "matchOnEmpty", "name", "onMatch", "options", "outsideClickIgnoreClass", "portalRef", "preventDefault", "required", "stopPropagation", "validation"]);

      var _this$state4 = this.state,
          hasError = _this$state4.hasError,
          loadingFilter = _this$state4.loadingFilter,
          value = _this$state4.value;
      var inputClasses = cx((_classNames2 = {
        'apm-mi-form-control apm-mi-list-filter': true
      }, _defineProperty(_classNames2, this.props.className, !!this.props.className), _defineProperty(_classNames2, 'apm-error-border-color', hasError), _classNames2));
      return React__default.createElement("div", {
        className: "apm-mi-container"
      }, React__default.createElement("input", _extends({}, props, {
        autoComplete: "off",
        className: inputClasses,
        disabled: disabled //name={name} 
        ,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        ref: function ref(_ref) {
          return _this3.inputRef = _ref;
        },
        type: "text",
        value: value
      })), this.renderIncrementalSearchResults(), loadingFilter && React__default.createElement("span", {
        className: "apm-mi-clear-input"
      }, React__default.createElement(Spinner, {
        className: "apm-color-black"
      })), !!value && !loadingFilter && !disabled && React__default.createElement("span", {
        className: "apm-mi-clear-input",
        onClick: this.clearInput
      }, React__default.createElement("i", {
        className: "fa fa-times"
      })));
    }
  }]);

  return ListFilter;
}(React.Component);

_defineProperty(ListFilter, "propTypes", {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  customFilter: PropTypes.func,
  CustomListItem: PropTypes.func,
  disabled: PropTypes.bool,
  listClasses: PropTypes.shape({
    container: PropTypes.string,
    item: PropTypes.string
  }),
  listStyle: PropTypes.shape({
    container: PropTypes.object,
    item: PropTypes.object
  }),
  matchOnEmpty: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onMatch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  validation: PropTypes.func,
  value: PropTypes.string
});

_defineProperty(ListFilter, "defaultProps", {
  autoFocus: false,
  className: '',
  customFilter: null,
  CustomListItem: null,
  disabled: false,
  listClasses: {},
  listStyle: {
    container: {},
    item: {}
  },
  matchOnEmpty: false,
  name: '',
  onChange: null,
  onMatch: null,
  options: [],
  required: false,
  validation: null,
  value: ''
});

var ListFilter$1 = onClickOutside(ListFilter);

var ListFilterLayer =
/*#__PURE__*/
function (_Component) {
  _inherits(ListFilterLayer, _Component);

  function ListFilterLayer(props) {
    var _this;

    _classCallCheck(this, ListFilterLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListFilterLayer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onMatch", function (option, inputName) {
      var onMatch = _this.props.onMatch;

      if (!!_this.optionsMap[option]) {
        option = _this.optionsMap[option];
      }

      if (typeof onMatch === 'function') {
        onMatch(option, inputName);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prepOptionsList", function (options) {
      var map = {};
      options.forEach(function (opt, i) {
        if (opt && _typeof(opt) === 'object') {
          map[opt.name] = opt;
        } else {
          map[opt] = opt;
        }
      });
      return map;
    });

    _defineProperty(_assertThisInitialized(_this), "prepCustomFilter", function (origCustomFilter) {
      return function (value) {
        return new Promise(function (resolve, reject) {
          resolve(origCustomFilter(value));
        }).then(function (options) {
          _this.mapNewOptions(options);

          return Object.keys(_this.optionsMap);
        })["catch"](function (err) {
          return console.log(err, err.stack);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "mapNewOptions", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      _this.optionsMap = {};
      options.forEach(function (option, i) {
        if (_typeof(option) === 'object') {
          _this.optionsMap[option.name] = Object.assign({}, option);
        } else {
          _this.optionsMap[option] = option;
        }
      });
    });

    var customFilter = null;
    var _map = {};

    if (typeof _this.props.customFilter === 'function') {
      customFilter = _this.prepCustomFilter(_this.props.customFilter);
    } else {
      _map = _this.prepOptionsList(_this.props.options);
    }

    _this.optionsMap = _map;
    _this.state = {
      customFilter: customFilter,
      options: Object.keys(_map)
    };
    return _this;
  }

  _createClass(ListFilterLayer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.options !== nextProps.options && !this.props.customFilter) {
        var map = this.prepOptionsList(nextProps.options);
        this.optionsMap = map;
        this.setState({
          options: Object.keys(map)
        });
      }
    } // convert token values back to their proper option values before sending 
    // them along

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          customFilter = _this$state.customFilter,
          options = _this$state.options;
      return React__default.createElement(ListFilter$1, _extends({}, this.props, {
        customFilter: customFilter,
        options: options,
        onMatch: this.onMatch
      }));
    }
  }]);

  return ListFilterLayer;
}(React.Component);

_defineProperty(ListFilterLayer, "propTypes", {
  customFilter: PropTypes.func,
  onMatch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })]))
});

_defineProperty(ListFilterLayer, "defaultProps", {
  customFilter: null,
  onMatch: null,
  options: []
});

var TextareaInput = function TextareaInput(_ref) {
  var validation = _ref.validation,
      props = _objectWithoutProperties(_ref, ["validation"]);

  var validate = [noEmptyStrings$1, validation];
  var inputState = useInputState(_objectSpread({
    validate: validate,
    parse: parse$3
  }, props));
  var textareaClasses = cx(_defineProperty({
    'apm-textarea-resize-vert': true,
    'apm-mi-form-control': true
  }, props.className, !!props.className));
  return React__default.createElement("textarea", _extends({
    autoComplete: "false",
    cols: 15,
    rows: 5
  }, props, {
    className: textareaClasses
  }, inputState));
};

function noEmptyStrings$1(value, input) {
  if (input.required && !value.trim().length) {
    return 'This field is required.';
  }
}

function parse$3(value) {
  /// non string values could get passed in initially as a prop
  if (typeof value === 'string') {
    return value.trim();
  } else if (!isNaN(value) && value !== null) {
    // apparently isNaN(null) is false...
    return value.toString();
  } else if (!value) {
    return '';
  }
}

var Token =
/*#__PURE__*/
function (_Component) {
  _inherits(Token, _Component);

  function Token() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Token);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Token)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function (evt) {
      _this.props.onDeleteClick(_this.props.token);
    });

    return _this;
  }

  _createClass(Token, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          readOnly = _this$props.readOnly;
      return React__default.createElement("span", {
        className: "table-token"
      }, name, !readOnly && React__default.createElement("i", {
        className: "fa fa-times token-delete",
        onClick: this.onDeleteClick
      }));
    }
  }]);

  return Token;
}(React.Component);

_defineProperty(Token, "propTypes", {
  name: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func,
  readOnly: PropTypes.bool
});

_defineProperty(Token, "defaultProps", {
  onDeleteClick: null,
  readOnly: true
});

var TokenInput =
/*#__PURE__*/
function (_Component) {
  _inherits(TokenInput, _Component);

  function TokenInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TokenInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TokenInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function (token) {
      if (typeof _this.props.onDeleteClick === 'function') {
        _this.props.onDeleteClick(token, _this.props.name);
      }
    });

    return _this;
  }

  _createClass(TokenInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onDeleteClick = _this$props.onDeleteClick,
          readOnly = _this$props.readOnly,
          tokens = _this$props.tokens,
          rest = _objectWithoutProperties(_this$props, ["onDeleteClick", "readOnly", "tokens"]);

      return React__default.createElement(React.Fragment, null, tokens.map(function (token) {
        return React__default.createElement(Token, {
          key: token.name + Math.random(),
          name: token.name,
          onDeleteClick: _this2.onDeleteClick,
          token: token,
          readOnly: readOnly || typeof onDeleteClick !== 'function'
        });
      }), !readOnly && React__default.createElement(ListFilterLayer, rest));
    }
  }]);

  return TokenInput;
}(React.Component);
TokenInput.propTypes = {
  onDeleteClick: PropTypes.func,
  readOnly: PropTypes.bool,
  tokens: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
};
TokenInput.defaultProps = {
  onDeleteClick: null,
  readOnly: true,
  tokens: []
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

__$styleInject(".APMDropzone {\n  position: relative;\n  transition: all 0.1s ease;\n  height: 60px;\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-color: #DFE6EE;\n  border: 1px dashed #8091A5;\n  border-radius: 3px;\n}\n.APMDropzone-container {\n  border-radius: 3px;\n  background: #F4F7FA;\n  opacity: 0.8;\n  height: 60px;\n  width: 100%;\n}\n.APMDropzone-fetching {\n  opacity: 1 !important;\n}\n.APMDropzone-icon {\n  font-size: 28px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  padding-top: 1px;\n  color: #313531;\n}\n.APMDropzone-icon-rotate {\n  animation: rotate360 1s linear 0s normal infinite;\n}\n.APMDropzone-enter {\n  border-color: #313531;\n  color: #313531;\n  background-image: none !important;\n}\n.APMDropzone-enter .APMDropzone-icon {\n  animation: upload 1.2s linear 0s normal infinite;\n}\n.APMDropzone:hover.APMDropzone:not(.APMDropzone-fetching) {\n  cursor: pointer;\n  border-color: #313531;\n  background-image: none !important;\n  opacity: 1 !important;\n}\n.APMDropzone:hover.APMDropzone:not(.APMDropzone-fetching) .APMDropzone-icon {\n  color: #313531;\n  animation: hover 0.5s linear 0s alternate infinite;\n}\n@keyframes hover {\n  0% {\n    top: 48%;\n  }\n  100% {\n    top: 53%;\n  }\n}\n@keyframes upload {\n  0% {\n    transform: translate(-50%, -50%) scale(1.2);\n    background-color: #DFE6EE;\n    top: 60%;\n    opacity: 1;\n  }\n  40% {\n    transform: translate(-50%, -50%) scale(0.7);\n    top: 52%;\n    background-color: #DFE6EE;\n  }\n  50% {\n    transform: translate(-50%, -50%) scale(0.3);\n    top: 45%;\n    opacity: 0.9;\n    background-color: #DFE6EE;\n  }\n  65% {\n    transform: translate(-50%, -50%) scale(0.2);\n    top: 30%;\n    opacity: 0.5;\n    background-color: #DFE6EE;\n  }\n  80% {\n    transform: translate(-50%, -50%) scale(0.1);\n    background-color: #313531;\n    top: 23%;\n    opacity: 0.2;\n  }\n  100% {\n    transform: translate(-50%, -50%) scale(0);\n    background-color: #313531;\n    opacity: 0.1;\n    top: 20%;\n  }\n}\n@keyframes rotate360 {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n");

var APMDropzone = function APMDropzone(_ref) {
  var className = _ref.className,
      iconClass = _ref.iconClass,
      isDefaultStyle = _ref.isDefaultStyle,
      onDragLeaveHandler = _ref.onDragLeaveHandler,
      onDragEnterHandler = _ref.onDragEnterHandler,
      onDropRejectedHandler = _ref.onDropRejectedHandler,
      onDropHandler = _ref.onDropHandler,
      isEnabled = _ref.isEnabled,
      src = _ref.src,
      props = _objectWithoutProperties(_ref, ["className", "iconClass", "isDefaultStyle", "onDragLeaveHandler", "onDragEnterHandler", "onDropRejectedHandler", "onDropHandler", "isEnabled", "src"]);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      dropEntered = _useState2[0],
      setDropEntered = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFetching = _useState4[0],
      setIsFetching = _useState4[1];

  function onDrop(acceptedFiles, rejectedFiles) {
    setDropEntered(false);
    setIsFetching(true);
    onDropHandler(acceptedFiles, rejectedFiles, setIsFetching);
  }

  function onDragEnter(event) {
    setDropEntered(true);
    if (onDragEnterHandler) onDragEnterHandler(event);
  }

  function onDragLeave(event) {
    setDropEntered(false);
    if (onDragLeaveHandler) onDragLeaveHandler(event);
  }

  function onDropRejected(event) {
    setIsFetching(false);
    if (onDropRejectedHandler) onDropRejectedHandler(event);
  }

  var cc = React.useMemo(function () {
    return composeClass('APMDropzone', className);
  }, []);
  var defaultIconClass = iconClass ? iconClass : 'fal fa-cloud-upload';
  return React__default.createElement("div", {
    className: cc('container')
  }, React__default.createElement(Dropzone, _extends({
    onDragLeave: onDragLeave,
    onDragEnter: onDragEnter,
    onDropRejected: onDropRejected,
    onDrop: onDrop,
    className: cx(cc(), _defineProperty({}, cc('default'), isDefaultStyle), _defineProperty({}, cc('enter'), dropEntered), _defineProperty({}, cc('fetching'), isFetching)),
    style: _objectSpread({
      backgroundImage: !isFetching && src ? "url(".concat(src, ")") : 'none'
    }, props.style)
  }, props), React__default.createElement("i", {
    className: cx(cc('icon'), _defineProperty({}, defaultIconClass, !isFetching || dropEntered), _defineProperty({}, "".concat(cc('icon-rotate'), " fal fa-circle-notch"), isFetching && !dropEntered))
  })));
};

APMDropzone.propTypes = {
  onDragLeaveHandler: PropTypes.func,
  onDragEnterHandler: PropTypes.func,
  onDropRejectedHandler: PropTypes.func,
  onDropHandler: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  src: PropTypes.string
};

var MoneyInput = function MoneyInput(_ref) {
  var currency = _ref.currency,
      inputProps = _objectWithoutProperties(_ref, ["currency"]);

  return React__default.createElement("div", {
    className: "input-group"
  }, React__default.createElement("div", {
    className: "input-group-addon",
    style: {
      backgroundColor: 'transparent',
      border: 'none'
    }
  }, React__default.createElement("i", {
    className: "far fa-dollar-sign"
  })), React__default.createElement(FloatInput, _extends({}, inputProps, {
    precision: 2
  })));
};

MoneyInput.propTypes = {
  currency: PropTypes.string.isRequired
};
MoneyInput.defaultProps = {
  currency: 'USD'
};

var URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

var UrlInput = function UrlInput(_ref) {
  var validation = _ref.validation,
      props = _objectWithoutProperties(_ref, ["validation"]);

  // return a better error message than what some browsers provide ('Match the requested format')
  // but use have the browser determine if theres an error
  /// (Im doing the regex test as well because the testing environment returns an empyt object for input.validity)
  function isUrl(value, input) {
    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
    if (input.validity.patternMismatch || !URL_REGEX.test(value)) {
      return 'Not a valid URL.';
    } else if (typeof validation === 'function') {
      var customError = validation(value, input);
      return customError;
    }
  }

  return React__default.createElement(TextInput, _extends({}, props, {
    type: "url",
    validation: isUrl
  }));
};

var AsyncDropdown = function AsyncDropdown(_ref) {
  var route = _ref.route,
      selectProps = _objectWithoutProperties(_ref, ["route"]);

  // const { error, getDisplayValue, onChange, onBlur, value } = useInputState(props);
  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  React.useEffect(function () {
    if (!route) return;
    setLoading(true);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', route);

    xhr.onload = function () {
      if (!xhr.response || xhr.status !== 200) {
        return console.log('ERROR', xhr);
      }

      setLoading(false);
      setOptions(JSON.parse(xhr.response).Value);
    };

    xhr.onerror = function () {
      console.log('error', xhr);
    };

    xhr.send();
  }, [route]);

  if (loading) {
    return React__default.createElement("i", {
      className: "fas fa-spinner fa-spin"
    });
  }

  return React__default.createElement(SelectInput, _extends({}, selectProps, {
    options: options
  }));
};
AsyncDropdown.propTypes = {
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  options: PropTypes.array,
  parse: PropTypes.func,
  route: PropTypes.string,
  validation: PropTypes.func
};
AsyncDropdown.defaultProps = {
  getOptionValue: function getOptionValue(opt) {
    return opt && _typeof(opt) === 'object' ? opt.id : opt;
  }
};

// @type(string): type of mentor input to get
// @return(func): a react component function of the mentor input

function getMentorInput() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  switch (type) {
    case 'async-dropdown':
      return AsyncDropdown;

    case 'listfilter':
      return ListFilterLayer;

    case 'boolean':
      return BooleanInputComponent;

    case 'integer':
      return IntegerInput;

    case 'file':
      return FileInput;

    case 'float':
      return FloatInput;

    case 'date':
    case 'time':
    case 'datetime':
      return DatePickerComponent;

    case 'email':
      return EmailInput;

    case 'select':
      return SelectInput;

    case 'textarea':
    case 'multiline':
      return TextareaInput;

    case 'money':
      return MoneyInput;
    //case 'maskedinput':
    //return MaskedInput;
    // case 'table':
    // 	return TableInput;

    case 'url':
      return UrlInput;

    case 'string':
    case 'text':
    default:
      return TextInput;
  }
}

/*
	let params = getParams() //--> { id: 123, foreignKey: { id: 125 }};
	
	Works with routes following below format:

	injectRouteWithParams('/user/:id', getParams);
		'/user/123';

	injectRouteWithParams('/user?id=:id', getParams) 
		'/user?id=123';

	injectRouteWithParams('/role/:foreignKey.id')
		'/role/125'

	injectRouteWithParams('/userroles?role=:foreignKey.id&userId=:id', getParams) 
		'/userroles?role=125&userId=123';
	
	Otherwise the original route is returned
*/

var injectRouteWithParams = function injectRouteWithParams(route, getParams) {
  var original = route;
  var regex = /(\=|\/)(\:(\w*\.{0,1}\w*))/;
  var params = typeof getParams === 'function' ? getParams() : getParams;

  if (!params || !regex.test(route)) {
    return route;
  }

  if (!params || _typeof(params) !== 'object') {
    console.warn('asyncFilter < injectRouteWithParams : invalid params');
    return route;
  } // counter for sanity check


  var i = 0;
  var regexResults = regex.exec(route);

  while (regexResults) {
    i += 1;

    if (i >= 20) {
      console.warn('asyncFilter < injectRouteWithParams :', 'an infinite loop was just prevented');
      console.info({
        params: params,
        route: route,
        originalRoute: original
      });
      return original;
    } // if the string doesnt point to a valid path on the params object
    // the data model doesnt match so break the loop, log a warning, and return 
    // the original route


    if (!lodash.hasIn(params, regexResults[3])) {
      console.warn('asyncFilter < injectRouteWithParams :', 'Invalid route ', original, '. ', regexResults[3], ' is not a path on data model: ');
      console.log(params);
      return original;
    }

    var actualValue = lodash.get(params, regexResults[3], null);

    if (actualValue && _typeof(actualValue) === 'object' && actualValue.id) {
      actualValue = actualValue.id;
    }

    route = route.replace(regex, "$1" + actualValue, "$2");
    regexResults = regex.exec(route);
  }

  return route;
};

// the filter will search the name field on the backend using a general wildcard
// of {value}% to find any names that start with value and having any characters
// after it; once it gets the result it will pluck the id and name from the 
// results, if the original result is needed; see the 2nd argument
//
// @route(string): the api route to hit on the backend
// @getParams(func): an optional getter function that returns an object
//		This is similar to using req.allParams() on the backend.
//		except we're injecting params into a route, not extracting them. If a 
//		route has a char : then the route argument will be injected with the returned params 
//
// @return([object]): a list of options with the option id, name, and, 
// 	optionally, the original option result returned

function asyncFilter() {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var getParams = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof route !== 'string') {
    console.log({
      BAD_ROUTE: route
    });
    return;
  }

  if (route.charAt(0) !== '/') {
    route = '/' + route;
  }

  var xhr = new XMLHttpRequest();
  return function (value) {
    if (!value || typeof value !== 'string') {
      value = '';
    }

    var newRoute = injectRouteWithParams(route, getParams);

    if (value && _typeof(value) === 'object') {
      value = value.name;
    }

    newRoute += (route.indexOf('?') > -1 ? '&' : '?') + "name={\"contains\":\"".concat(value.toString(), "\"}&select=id,name&sort=name ASC");
    return new Promise(function (resolve, reject) {
      xhr.open('GET', newRoute);

      xhr.onload = function () {
        if (!xhr.response) return [];
        var response = JSON.parse(xhr.response);

        if (response.Status === 200) {
          var optionsCount = {}; // keep track of duplicate names

          var id;
          var name;
          var options = [];
          response.Value.forEach(function (val) {
            id = val.id;
            name = val.name; // a reference in the name will be plucked out; 
            // dont blame me this is dees fault

            if (_typeof(name) === 'object') {
              id = val.name.id;
              name = val.name.name;
            }

            if (optionsCount[name]) {
              optionsCount[name] += 1; //return { id: val.id, name: `${name} (${optionsCount[name]})` };

              reactToastify.toast("Hitting ".concat(route, " found duplicated name in the data set. ").concat(name, " with ").concat(val.id, " is being removed from the list of options in the filter. Please fix this data."), {
                type: 'error',
                autoClose: false
              });
            } else {
              optionsCount[name] = 1;
              options.push({
                id: id,
                name: name
              });
            }
          });
          resolve(options);
        } else {
          var message = response.Message || response.message;
          reactToastify.toast.error(message);
          resolve([]);
        }
      };

      xhr.onerror = function () {
        var message = resData.Message || resData.message;
        reactToastify.toast.error(messag);
        resolve([]);
      };

      xhr.send();
    });
  };
}

//import './styles.less';

var MuiInput = function MuiInput(props) {
  var label = props.label,
      customValidator = props.customValidator,
      onChange = props.onChange,
      className = props.className,
      inputProps = _objectWithoutProperties(props, ["label", "customValidator", "onChange", "className"]);

  var _useInputValidation = useInputValidation(customValidator),
      _useInputValidation2 = _slicedToArray(_useInputValidation, 2),
      errorMessage = _useInputValidation2[0],
      checkForErrors = _useInputValidation2[1];

  var _useState = React.useState(inputProps.value),
      _useState2 = _slicedToArray(_useState, 2),
      isEmpty = _useState2[0],
      setIsEmpty = _useState2[1];

  function handleOnChange(evt) {
    var inputRef = evt.target; // check if input is empty

    setIsEmpty(inputRef.value.length > 0);
    checkForErrors(inputRef);

    if (typeof onChange === 'function') {
      onChange(evt);
    }
  }

  var inputClass = cx(className, {
    'not-empty': isEmpty,
    'error': !!errorMessage,
    'required': inputProps.required
  });
  return React__default.createElement("div", {
    className: "apm-mui-input-group m-b"
  }, React__default.createElement("input", _extends({}, inputProps, {
    "data-testid": inputProps.name + '-input',
    className: inputClass,
    onChange: handleOnChange
  })), React__default.createElement("span", {
    className: "apm-mui-highlight"
  }), React__default.createElement("span", {
    className: "apm-mui-bar"
  }), React__default.createElement("label", null, label), React__default.createElement("span", {
    className: "text-danger text-center"
  }, React__default.createElement("strong", {
    "data-testid": inputProps.name + '-error'
  }, errorMessage)));
};

var BooleanInput = BooleanInputComponent;
var DatePicker$1 = DatePickerComponent;
var EmailInput$1 = EmailInput;
var FileInput$1 = FileInput;
var FloatInput$1 = FloatInput;
var IntegerInput$1 = IntegerInput;
var ListFilter$2 = ListFilterLayer; //export const MaskedInput = MaskedInputComponent;

var SelectInput$1 = SelectInput; //export const TableInput = TableInputComponent;

var TextInput$1 = TextInput;
var TextareaInput$1 = TextareaInput;
var TokenInput$1 = TokenInput;
var APMDropzone$1 = APMDropzone; //export * from './score-input';
var asyncFilter$1 = asyncFilter;
var getMentorInput$1 = getMentorInput;

exports.APMDropzone = APMDropzone$1;
exports.AsyncDropdown = AsyncDropdown;
exports.BooleanInput = BooleanInput;
exports.DatePicker = DatePicker$1;
exports.EmailInput = EmailInput$1;
exports.FileInput = FileInput$1;
exports.FloatInput = FloatInput$1;
exports.IntegerInput = IntegerInput$1;
exports.ListFilter = ListFilter$2;
exports.MuiInput = MuiInput;
exports.SelectInput = SelectInput$1;
exports.TextInput = TextInput$1;
exports.TextareaInput = TextareaInput$1;
exports.TokenInput = TokenInput$1;
exports.asyncFilter = asyncFilter$1;
exports.getDisplayValue = getDisplayValue;
exports.getMentorInput = getMentorInput$1;
exports.useInputState = useInputState;
exports.useInputValidation = useInputValidation;
