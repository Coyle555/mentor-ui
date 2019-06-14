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

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var cx = _interopDefault(require('classnames'));
var ReactTooltip = _interopDefault(require('react-tooltip'));
var fuzzy = _interopDefault(require('fuzzy'));
var moment = _interopDefault(require('moment'));
var onClickOutside = _interopDefault(require('react-onclickoutside'));
var lodash = require('lodash');
var blacklist = _interopDefault(require('blacklist'));
var ReactDOM = _interopDefault(require('react-dom'));
var Tether = _interopDefault(require('react-tether'));
var reactIntl = require('react-intl');

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

// a list of all options

var TypeaheadOption = function TypeaheadOption(_ref) {
  var active = _ref.active,
      customClasses = _ref.customClasses,
      _onClick = _ref.onClick,
      option = _ref.option;
  var listItemClasses = cx(_defineProperty({
    'hover': active,
    'filter-tokenizer-list__item': true
  }, customClasses.listItem, !!customClasses.listItem));
  var linkClasses = cx(_defineProperty({
    'typeahead-option filter-tokenizer-list__item': true
  }, customClasses.listAnchor, !!customClasses.listAnchor));
  return React__default.createElement("li", {
    className: listItemClasses,
    onClick: function onClick() {
      return _onClick(option);
    }
  }, React__default.createElement("a", {
    className: linkClasses
  }, option));
};
TypeaheadOption.propTypes = {
  active: PropTypes.bool,
  customClasses: PropTypes.object,
  onClick: PropTypes.func,
  option: PropTypes.string
};
TypeaheadOption.defaultProps = {
  active: false,
  customClasses: {}
};

// of the current category and also holds all
// currently viewable options in category

var TypeaheadSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(TypeaheadSelector, _Component);

  function TypeaheadSelector() {
    _classCallCheck(this, TypeaheadSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(TypeaheadSelector).apply(this, arguments));
  }

  _createClass(TypeaheadSelector, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          options = _this$props.options,
          selectedOptionIndex = _this$props.selectedOptionIndex;
      if (options.length === 0 || selectedOptionIndex < 0) return;
      var listHeight = parseInt(window.getComputedStyle(this.listRef).height, 10);
      var children = this.listRef.children; // heights of each child can vary so need height of selected option

      var listItemHeight = parseInt(window.getComputedStyle(children[selectedOptionIndex]).height, 10); // user has gone above the viewable area so scroll up

      if (children[selectedOptionIndex].offsetTop - listItemHeight < this.listRef.scrollTop) {
        this.listRef.scrollTo(0, children[selectedOptionIndex].offsetTop - listItemHeight);
        return;
      } // the user has gone below the viewable area so scroll down


      if ((selectedOptionIndex + 1) * listItemHeight > listHeight + this.listRef.scrollTop) {
        // edge case when user goes to the top of the list and then hits
        // up again, we wrap the scroll back to the bottom
        if (selectedOptionIndex + 1 === options.length) {
          this.listRef.scrollTo(0, children[selectedOptionIndex].offsetTop - listItemHeight);
        } else {
          this.listRef.scrollTo(0, this.listRef.scrollTop + listItemHeight);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          customClasses = _this$props2.customClasses,
          header = _this$props2.header,
          onOptionSelected = _this$props2.onOptionSelected,
          options = _this$props2.options,
          selectedOptionIndex = _this$props2.selectedOptionIndex;
      var classList = cx(_defineProperty({
        'typeahead-selector': true
      }, customClasses.results, customClasses.results));
      return React__default.createElement("div", {
        className: classList
      }, React__default.createElement("div", {
        className: "header"
      }, header), React__default.createElement("ul", {
        ref: function ref(_ref) {
          return _this.listRef = _ref;
        }
      }, options.map(function (option, i) {
        return React__default.createElement(TypeaheadOption, {
          onClick: onOptionSelected,
          option: option,
          customClasses: customClasses,
          active: selectedOptionIndex === i,
          key: i
        });
      })));
    }
  }]);

  return TypeaheadSelector;
}(React.Component);

_defineProperty(TypeaheadSelector, "propTypes", {
  options: PropTypes.array,
  header: PropTypes.string,
  customClasses: PropTypes.object,
  onOptionSelected: PropTypes.func
});

_defineProperty(TypeaheadSelector, "defaultProps", {
  customClasses: {},
  header: '',
  options: []
});

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
      var rect = ReactDOM.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();
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

      var rect = ReactDOM.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();
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

      var rect = ReactDOM.findDOMNode(_assertThisInitialized(_this)).getBoundingClientRect();

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

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (newDatetime) {
      _this.setState({
        datetime: newDatetime
      });

      _this.props.updateDateValue(newDatetime.format('YYYY-MM-DD HH:mm'));
    });

    _this.state = {
      datetime: moment()
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var datetime = this.state.datetime;
      this.props.updateDateValue(datetime.format('YYYY-MM-DD HH:mm'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clearInput = _this$props.clearInput,
          handleClose = _this$props.handleClose,
          saveDate = _this$props.saveDate;
      var datetime = this.state.datetime;
      return React__default.createElement("div", {
        className: "datepicker"
      }, React__default.createElement(InputMoment, {
        clearInput: clearInput,
        handleClose: handleClose,
        moment: datetime,
        onChange: this.handleChange,
        saveDate: saveDate
      }));
    }
  }]);

  return DatePicker;
}(React.Component);

/**
 * PolyFills make me sad
 */
var KeyEvent = {
  DOM_VK_BACK_SPACE: 8,
  DOM_VK_TAB: 9,
  DOM_VK_RETURN: 13,
  DOM_VK_ENTER: 14,
  DOM_VK_ESCAPE: 27,
  DOM_VK_UP: 38,
  DOM_VK_DOWN: 40
};

//
// Renders a text input that shows options nearby that you can
// use the keyboard or mouse to select.

var TypeaheadClass =
/*#__PURE__*/
function (_Component) {
  _inherits(TypeaheadClass, _Component);

  function TypeaheadClass(props) {
    var _this;

    _classCallCheck(this, TypeaheadClass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TypeaheadClass).call(this, props)); // @focused: form is focused by user
    // @visible: currently visible set of options
    // @selectedOptionIndex: index of the option the user
    // 	currently has selected
    // @value: current value used to filter options

    _defineProperty(_assertThisInitialized(_this), "getOptions", function (options) {
      if (!options || !Array.isArray(options) && typeof options !== 'function') {
        return;
      }

      new Promise(function (resolve, reject) {
        if (typeof options === 'function') {
          resolve(options(''));
        } else {
          resolve(options);
        }
      }).then(function (visibleOptions) {
        _this.setState({
          visible: visibleOptions
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateDateValue", function (newValue) {
      _this.setState({
        value: newValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onOptionSelected", function (option) {
      // need to refocus on input box after selection
      _this.inputRef.focus(); // convert datetimes when user hits enter on value


      if (_this.props.datatype === 'datetime') {
        option = moment(option).toISOString();
      }

      _this.loadingOptions = false;

      _this.setState({
        selectedOptionIndex: -1,
        value: '',
        visible: []
      });

      if (typeof _this.props.addTokenForValue === 'function') {
        _this.props.addTokenForValue(option);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onTextEntryUpdated", function (event) {
      var value = event.target.value;
      new Promise(function (resolve, reject) {
        resolve(_this.getOptionsForValue(value, _this.props.options));
      }).then(function (options) {
        _this.loadingOptions = false;

        _this.setState({
          selectedOptionIndex: -1,
          value: value,
          visible: options
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "eventMap", function (event) {
      switch (event.keyCode) {
        case KeyEvent.DOM_VK_UP:
          return _this.navUp;

        case KeyEvent.DOM_VK_DOWN:
          return _this.navDown;

        case KeyEvent.DOM_VK_RETURN:
        case KeyEvent.DOM_VK_ENTER:
          return _this._onEnter;

        case KeyEvent.DOM_VK_ESCAPE:
          return _this._onEscape;
        //case KeyEvent.DOM_VK_TAB:
        //return this._onTab;

        default:
          return null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (event) {
      var onKeyDown = _this.props.onKeyDown;
      var _this$state = _this.state,
          value = _this$state.value,
          visible = _this$state.visible;

      var handler = _this.eventMap(event); // handle value completion if there are no options


      if ((event.keyCode === KeyEvent.DOM_VK_RETURN || event.keyCode === KeyEvent.DOM_VK_ENTER) && _this.props.options.length === 0 && !!_this.state.value) {
        _this._onOptionSelected(_this.state.value);
      } // if there are no visible elements, don't perform selected
      // navigation or autocompletion


      if (!handler || visible.length === 0) {
        if (typeof onKeyDown === 'function') {
          onKeyDown(event, value);
        }

        return;
      } // handle any special keystrokes


      handler.call(_assertThisInitialized(_this), event); // don't propagate keystrokes back to DOM/browser

      event.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "_focusTypeahead", function () {
      if (_this.props.disabled) return;

      _this.inputRef.focus();

      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.setState({
        focused: false,
        selectedOptionIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDatepickerClose", function (event) {
      event.stopPropagation();

      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearDatepickerInput", function () {
      _this.setState({
        value: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveDatepickerValue", function () {
      _this.props.addTokenForValue(_this.state.value);

      _this.setState({
        value: ''
      });
    });

    _this.state = {
      focused: false,
      selectedOptionIndex: -1,
      visible: [],
      value: ''
    };
    return _this;
  } // since fetching options could require a network call, get the options
  // in component did mount lifecycle


  _createClass(TypeaheadClass, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getOptions(this.props.options);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!!nextProps.options && this.props.options !== nextProps.options) {
        this.getOptions(nextProps.options);
      }
    }
  }, {
    key: "getOptionsForValue",
    // Updates the available options as the user inputs keystrokes
    value: function getOptionsForValue(value, options) {
      var _this2 = this;

      this.loadingOptions = true;
      return new Promise(function (resolve, reject) {
        if (typeof _this2.props.options === 'function') {
          resolve(_this2.props.options(value));
        } else {
          resolve(fuzzy.filter(value, options).map(function (res) {
            return res.original;
          }));
        }
      });
    } // Event mappings for keystrokes

  }, {
    key: "_onEscape",
    // Handle a tab event for autofill

    /*_onTab(event) {
    	event.preventDefault();
    		// pass the first visible option in the list for tab 
    	// completion if no selected option
    	let option = this.state.selectedOptionIndex >= 0
    		? this.state.visible[this.state.selectedOptionIndex]
    		: this.state.visible[0];
    
    	this._onOptionSelected(option);
    }*/
    // Handle an escape event for deselecting an option using arrow keys and
    // losing focus on input
    value: function _onEscape() {
      this.setState({
        focused: false,
        selectedOptionIndex: -1
      });
      this.inputRef.blur();
    } // Handle an enter event that wasn't caught in this.onKeyDown()
    // pass either a selected option from arrow keys or pass the first
    // visible option in the list

  }, {
    key: "_onEnter",
    value: function _onEnter(event) {
      if (this.loadingOptions) return;
      var _this$state2 = this.state,
          selectedOptionIndex = _this$state2.selectedOptionIndex,
          visible = _this$state2.visible;

      if (selectedOptionIndex >= 0) {
        this._onOptionSelected(visible[selectedOptionIndex]);
      } else if (this.state.visible.length > 0) {
        this._onOptionSelected(visible[0]);
      }
    } // Handle key events as user enters input
    // @event: key pressed by user

  }, {
    key: "_nav",
    // Move the selected option up or down depending on keystroke
    // @delta: direction in which to move
    value: function _nav(delta) {
      // no visible options to move to
      if (!this.state.visible.length) {
        return;
      }

      var newIndex = this.state.selectedOptionIndex + delta; // wrap around to end or start if user goes past start 
      // or end of list

      if (newIndex < 0) {
        newIndex = this.state.visible.length - 1;
      } else if (newIndex >= this.state.visible.length) {
        newIndex -= this.state.visible.length;
      }

      var newSelection = this.state.visible[newIndex];
      this.setState({
        selectedOptionIndex: newIndex
      });
    } // Go down the options

  }, {
    key: "navDown",
    value: function navDown() {
      this._nav(1);
    } // Go up the options

  }, {
    key: "navUp",
    value: function navUp() {
      this._nav(-1);
    }
  }, {
    key: "_renderIncrementalSearchResults",
    // This will show the user the header of the category and the
    // options depending on the category of the search he is in and 
    // what he has entered
    value: function _renderIncrementalSearchResults() {
      if (!this.state.focused) {
        return null;
      } // handle special case for date time querying


      if (this.props.datatype === 'datetime') {
        return React__default.createElement(DatePicker, {
          clearInput: this.clearDatepickerInput,
          handleClose: this.handleDatepickerClose,
          onOptionSelected: this._onOptionSelected,
          saveDate: this.saveDatepickerValue,
          updateDateValue: this.updateDateValue
        });
      } // there are no typeahead/autocomplete suggestions, 
      // so render nothing


      if (!this.state.visible.length) {
        return null;
      }

      return React__default.createElement(TypeaheadSelector, {
        customClasses: this.props.customClasses,
        options: this.state.visible,
        header: this.props.header,
        onOptionSelected: this._onOptionSelected,
        selectedOptionIndex: this.state.selectedOptionIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          category = _this$props.category,
          customClasses = _this$props.customClasses,
          disabled = _this$props.disabled,
          operator = _this$props.operator;
      var inputClassList = cx(_defineProperty({
        'filter-tokenizer-text-input': true
      }, customClasses.input, !!customClasses.input));
      return React__default.createElement("div", {
        className: "token-collection",
        onClick: this._focusTypeahead
      }, React__default.createElement("div", {
        className: "filter-input-group"
      }, React__default.createElement("div", {
        className: "filter-category"
      }, category), React__default.createElement("div", {
        className: "filter-operator"
      }, operator), React__default.createElement("div", {
        className: "typeahead"
      }, React__default.createElement("input", {
        className: inputClassList,
        disabled: disabled,
        onChange: this._onTextEntryUpdated,
        onKeyDown: this._onKeyDown,
        ref: function ref(_ref) {
          return _this3.inputRef = _ref;
        },
        type: "text",
        value: this.state.value
      }), this._renderIncrementalSearchResults())));
    }
  }]);

  return TypeaheadClass;
}(React.Component);

_defineProperty(TypeaheadClass, "propTypes", {
  addTokenForValue: PropTypes.func,
  customClasses: PropTypes.object,
  datatype: PropTypes.string,
  disabled: PropTypes.bool,
  header: PropTypes.string,
  onKeyDown: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func])
});

_defineProperty(TypeaheadClass, "defaultProps", {
  addTokenForValue: null,
  customClasses: {},
  datatype: 'text',
  disabled: false,
  header: 'Field',
  onKeyDown: null,
  options: []
});

var Typeahead = onClickOutside(TypeaheadClass);

var FilterItem =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterItem, _Component);

  function FilterItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onRemove", function () {
      _this.props.onRemove(_this.props.children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderValue", function (val) {
      if (_this.props.type === 'datetime') {
        var date = Date.parse(new Date(val));
        return React__default.createElement(React.Fragment, null, React__default.createElement(reactIntl.FormattedDate, {
          value: date,
          year: "numeric",
          month: "long",
          day: "numeric"
        }), ' - ', React__default.createElement(reactIntl.FormattedTime, {
          value: date,
          hour: "numeric",
          minute: "numeric"
        }));
      } else if (_this.props.type === 'date') {
        var _date = new Date(val);

        return React__default.createElement(reactIntl.FormattedDate, {
          value: _date,
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }

      return val;
    });

    return _this;
  }

  _createClass(FilterItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          disabled = _this$props.disabled;
      return React__default.createElement("tr", null, React__default.createElement("td", null, children.category), React__default.createElement("td", null, children.operator), React__default.createElement("td", {
        className: "filter-value"
      }, this.renderValue(children.value)), React__default.createElement("td", null, !disabled && React__default.createElement("button", {
        className: "clear-filter",
        onClick: this.onRemove,
        type: "button"
      }, "Clear")));
    }
  }]);

  return FilterItem;
}(React.Component);

_defineProperty(FilterItem, "propTypes", {
  children: PropTypes.shape({
    category: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string
  }),
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  type: PropTypes.oneOf(['date', 'datetime'])
});

_defineProperty(FilterItem, "defaultProps", {
  children: {}
});

var ActiveFiltersClass =
/*#__PURE__*/
function (_Component) {
  _inherits(ActiveFiltersClass, _Component);

  function ActiveFiltersClass(props) {
    var _this;

    _classCallCheck(this, ActiveFiltersClass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveFiltersClass).call(this, props)); // @filtersActive: true when the user has opened the list of
    // 	all applied filters; false otherwise

    _defineProperty(_assertThisInitialized(_this), "toggleFilterList", function () {
      _this.setState({
        filtersActive: !_this.state.filtersActive
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.setState({
        filtersActive: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilters", function () {
      var _this$props = _this.props,
          clearSearch = _this$props.clearSearch,
          disabled = _this$props.disabled,
          onRemove = _this$props.onRemove,
          searchTokens = _this$props.searchTokens;

      if (searchTokens.length === 0) {
        return null;
      }

      return React__default.createElement("table", {
        className: "active-filters-list ignore-react-onclickoutside"
      }, React__default.createElement("thead", null, React__default.createElement("tr", null, React__default.createElement("td", null, "Field"), React__default.createElement("td", null, "Operator"), React__default.createElement("td", null, "Value"), React__default.createElement("td", null, !disabled && React__default.createElement("button", {
        className: "clear-all-filters",
        onClick: clearSearch,
        type: "button"
      }, "Clear All")))), React__default.createElement("tbody", null, searchTokens.map(function (token) {
        return React__default.createElement(FilterItem, {
          disabled: disabled,
          key: token.id + token.operator + token.value,
          onRemove: onRemove,
          type: token.type
        }, token);
      })));
    });

    _this.state = {
      filtersActive: false
    };
    return _this;
  }

  _createClass(ActiveFiltersClass, [{
    key: "render",
    value: function render() {
      var searchTokens = this.props.searchTokens;
      var filtersActive = this.state.filtersActive;
      return React__default.createElement(Tether, {
        attachment: "top left",
        targetAttachment: "bottom left",
        constraints: [{
          to: 'scrollParent'
        }],
        style: {
          zIndex: 4
        }
      }, React__default.createElement("span", {
        className: "input-group-addon left-addon",
        "data-for": "structured-query-tooltip",
        "data-tip": "View Filters",
        onClick: this.toggleFilterList,
        style: {
          background: searchTokens.length === 0 ? 'lightgrey' : 'white',
          borderRadius: 0,
          position: 'relative',
          cursor: searchTokens.length === 0 ? 'not-allowed' : 'pointer'
        }
      }, React__default.createElement("i", {
        className: "far fa-list"
      }), React__default.createElement("span", {
        className: "active-filter-count"
      }, searchTokens.length)), filtersActive && this.renderFilters());
    }
  }]);

  return ActiveFiltersClass;
}(React.Component);

_defineProperty(ActiveFiltersClass, "propTypes", {
  clearSearch: PropTypes.func,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  searchTokens: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string
  }))
});

_defineProperty(ActiveFiltersClass, "defaultProps", {
  searchTokens: []
});
var ActiveFilters = onClickOutside(ActiveFiltersClass);

var EQUALS = 'equals';
var DOES_NOT_EQUAL = 'does not equal';
var CONTAINS = 'contains';
var DOES_NOT_CONTAIN = 'does not contain';
var LESS_THAN = 'less than';
var LESS_THAN_OR_EQUAL_TO = 'less than or equal to';
var GREATER_THAN = 'greater than';
var GREATER_THAN_OR_EQUAL_TO = 'greater than or equal to';
var IS_EMPTY = 'is empty';
var IS_NOT_EMPTY = 'is not empty'; // mapping used to check validity of initial tokens

var ALL_OPERATIONS = {
  EQUALS: EQUALS,
  DOES_NOT_EQUAL: DOES_NOT_EQUAL,
  CONTAINS: CONTAINS,
  DOES_NOT_CONTAIN: DOES_NOT_CONTAIN,
  LESS_THAN: LESS_THAN,
  LESS_THAN_OR_EQUAL_TO: LESS_THAN_OR_EQUAL_TO,
  GREATER_THAN: GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO: GREATER_THAN_OR_EQUAL_TO,
  IS_EMPTY: IS_EMPTY,
  IS_NOT_EMPTY: IS_NOT_EMPTY
}; // operations for strings

var STRING_OPERATIONS = [EQUALS, DOES_NOT_EQUAL, CONTAINS, DOES_NOT_CONTAIN, IS_EMPTY, IS_NOT_EMPTY]; // operations for integers and dates

var NUM_DATE_OPERATIONS = [EQUALS, DOES_NOT_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL_TO, GREATER_THAN, GREATER_THAN_OR_EQUAL_TO, IS_EMPTY, IS_NOT_EMPTY]; // operations for enumerable options

var ENUM_OPERATIONS = [EQUALS, DOES_NOT_EQUAL, IS_EMPTY, IS_NOT_EMPTY];
var ASYNC_OPERATIONS = [CONTAINS, DOES_NOT_CONTAIN, IS_EMPTY, IS_NOT_EMPTY];

function validateToken(token) {
  if (_typeof(token) !== 'object' || !token.id || !token.category || !token.operator) {
    return false;
  } // no valid value when operation isnt a empty check


  if (!token.value && token.operator !== ALL_OPERATIONS.IS_EMPTY && token.operator !== ALL_OPERATIONS.IS_NOT_EMPTY) {
    return false;
  } // operation does not exist in list of approved operations


  if (!ALL_OPERATIONS[token.operator.toUpperCase().replace(/ /g, '_')]) {
    return false;
  }

  return true;
} // Get the options available based on where the user is in the query

function _getOptionsForTypeahead() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!token.category) {
    return options.map(function (option) {
      return option.category;
    });
  } else if (!token.operator) {
    var categoryType = _getCategoryDataType(options, token.id);

    switch (categoryType) {
      case 'string':
      case 'text':
      case 'email':
        return STRING_OPERATIONS;

      case 'enumoptions':
      case 'boolean':
        return ENUM_OPERATIONS;

      case 'integer':
      case 'float':
      case 'datetime':
        return NUM_DATE_OPERATIONS;

      case 'async':
        return ASYNC_OPERATIONS;

      default:
        return [];
    }
  } else {
    return _getCategoryOptions(options, token.id);
  }
} // Get the data type of a category
// defaults to string if an error occurs

function _getCategoryDataType(options, id) {
  var category = options.find(function (option) {
    return option.id === id;
  });

  if (!category) {
    return 'string';
  }

  if (!!category.options) {
    return 'enumoptions';
  } else if (!!category.asyncFilter) {
    return 'async';
  } else {
    return category.type || 'string';
  }
} // Get the available options(enum) if any were passed in with the 
// options object

function _getCategoryOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var id = arguments.length > 1 ? arguments[1] : undefined;
  var category = options.find(function (option) {
    return option.id === id;
  });

  if (!category) {
    return [];
  } // default case for boolean data types


  if (category.type === 'boolean' && !category.options) {
    return ['True', 'False'];
  }

  return category.options;
} // gets the next header to display over the selectable list of options

function _getHeader() {
  var nextToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (nextToken.category === '') {
    return 'Field';
  } else if (nextToken.operator === '') {
    return 'Operator';
  } else {
    return 'Value';
  }
} // Get the input data type after a user selects a category and operation
// Used to render possible operations on that data
// Renders to string if category and operator have been selected

function _getInputDatatype(token, options) {
  if (!!token.category && !!token.operator) {
    return _getCategoryDataType(options, token.id);
  }

  return 'string';
} // Check a token against the current list of tokens for duplicates

function _isDuplicateToken(tokens, newToken) {
  return tokens.some(function (token) {
    return token.category === newToken.category && token.operator === newToken.operator && token.value === newToken.value;
  }, this);
}

// A typeahead that, when an option is selected replaces the text entry
// widget with a renderable 'token' that can be deleted by pressing
// backspace on the beginning of the line

var Tokenizer =
/*#__PURE__*/
function (_Component) {
  _inherits(Tokenizer, _Component);

  function Tokenizer(props) {
    var _this;

    _classCallCheck(this, Tokenizer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tokenizer).call(this, props)); // @searchTokens - holds all user generated tokens to search with
    // 	Ex: [{category: 'id', operator: '=', value: '123'}, ...]
    // @nextToken - holds the next token to be added to the search 
    // 		tokens which are used for filtering -- 
    // 		contains:
    // 			@id - id for back end retrieval
    // 			@category - which field to search in
    //	 		@operator - the operator to apply to the field
    //	 		@value - the value to search for

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (event, value) {
      // only care about backspaces for removing token parts
      if (event.keyCode !== KeyEvent.DOM_VK_BACK_SPACE || value) {
        return;
      }

      event.preventDefault(); // remove part of a new token

      if (!!_this.state.nextToken.operator) {
        _this.setState({
          nextToken: Object.assign({}, _this.state.nextToken, {
            operator: '',
            value: ''
          })
        });
      } else if (!!_this.state.nextToken.category) {
        _this.setState({
          nextToken: {
            id: '',
            category: '',
            operator: '',
            type: '',
            value: ''
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_addTokenForValue", function (value) {
      var _this$state = _this.state,
          nextToken = _this$state.nextToken,
          searchTokens = _this$state.searchTokens; // Handle attaching a category to input

      if (_this.state.nextToken.category === '') {
        _this._addCategoryToNewToken(value);

        return;
      } // Handle attaching an operator


      if (_this.state.nextToken.operator === '') {
        _this._addOperatorToNewToken(value);

        return;
      } // Else, we are attaching a value so we need to add the 
      // next token to the list of all tokens
      // We check first to make sure there are no duplicates


      if (!_isDuplicateToken(searchTokens, Object.assign({}, nextToken, {
        value: value
      }))) {
        _this._addValueToNewToken(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_removeTokenForValue", function (value) {
      var onTokenRemove = _this.props.onTokenRemove; // dont allow removal of tokens if querying is disabled

      if (_this.props.disabled) {
        return;
      }

      var index = _this.state.searchTokens.indexOf(value); // return nothing if object not found


      if (index === -1) return;

      var searchTokens = _this.state.searchTokens.filter(function (token, i) {
        return index !== i;
      });

      _this.setState({
        searchTokens: searchTokens
      }, function () {
        if (typeof onTokenRemove === 'function') {
          onTokenRemove(_this.state.searchTokens.map(function (tkn) {
            return Object.assign({}, tkn);
          }));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exportSearch", function () {
      if (typeof _this.props.exportSearch === 'function') {
        _this.props.exportSearch(_this.state.searchTokens);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearSearch", function () {
      var onTokenRemove = _this.props.onTokenRemove;

      _this.setState({
        searchTokens: []
      }, function () {
        if (typeof onTokenRemove === 'function') {
          onTokenRemove(_this.state.searchTokens.map(function (tkn) {
            return Object.assign({}, tkn);
          }));
        }
      });
    });

    _this.state = {
      searchTokens: _this.props.initTokens.filter(validateToken),
      nextToken: {
        id: '',
        category: '',
        operator: '',
        type: '',
        value: ''
      }
    };
    return _this;
  }

  _createClass(Tokenizer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.initTokens !== nextProps.initTokens) {
        this.setState({
          searchTokens: nextProps.initTokens.filter(validateToken)
        });
      }
    } // Handle removing a token from the input box when user hits backspace

  }, {
    key: "_addCategoryToNewToken",
    // Add a category to the new token
    value: function _addCategoryToNewToken(value) {
      var option = this.props.options.find(function (option) {
        return option.category === value;
      });
      var newToken = Object.assign({}, this.state.nextToken, {
        category: value,
        id: option.id,
        type: option.type
      });
      this.setState({
        nextToken: newToken
      });
    } // Add an operator to the new token

  }, {
    key: "_addOperatorToNewToken",
    value: function _addOperatorToNewToken(value) {
      var _this2 = this;

      var nextToken = this.state.nextToken; // if the operation is to search for empty/non-empty values,
      // then skip adding a value to a new token

      if (value === ALL_OPERATIONS.IS_EMPTY || value === ALL_OPERATIONS.IS_NOT_EMPTY) {
        var onTokenAdd = this.props.onTokenAdd;
        var addSearchToken = Object.assign({}, this.state.nextToken, {
          operator: value
        });
        this.setState({
          nextToken: {
            id: '',
            category: '',
            operator: '',
            type: '',
            value: ''
          },
          searchTokens: this.state.searchTokens.concat(addSearchToken)
        }, function () {
          if (typeof onTokenAdd === 'function') {
            // clone tokens so they cant be mutated
            onTokenAdd(_this2.state.searchTokens.map(function (tkn) {
              return _objectSpread({}, tkn);
            }));
          }
        });
      } else {
        var newToken = Object.assign({}, nextToken, {
          operator: value
        });
        this.setState({
          nextToken: newToken
        });
      }
    } // Add a new value to the new token and add to
    // all search tokens

  }, {
    key: "_addValueToNewToken",
    value: function _addValueToNewToken(value) {
      var _this3 = this;

      var onTokenAdd = this.props.onTokenAdd;
      var addSearchToken = Object.assign({}, this.state.nextToken, {
        value: value
      });
      this.setState({
        nextToken: {
          id: '',
          category: '',
          operator: '',
          type: '',
          value: ''
        },
        searchTokens: this.state.searchTokens.concat(addSearchToken)
      }, function () {
        if (typeof onTokenAdd === 'function') {
          onTokenAdd(_this3.state.searchTokens.map(function (tkn) {
            return Object.assign({}, tkn);
          }));
        }
      });
    } // Remove a token from the search tokens

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          customClasses = _this$props.customClasses,
          disabled = _this$props.disabled,
          exportSearch = _this$props.exportSearch,
          options = _this$props.options;
      var _this$state2 = this.state,
          nextToken = _this$state2.nextToken,
          searchTokens = _this$state2.searchTokens;
      var filterClasses = cx(_defineProperty({
        'filter-tokenizer': true,
        'filter-disabled': disabled
      }, customClasses.container, !!customClasses.container));
      var searchWrapperClasses = cx('input-group-addon left-addon', {
        'cursor-pointer': typeof exportSearch === 'function'
      });
      return React__default.createElement("div", {
        className: filterClasses
      }, React__default.createElement("span", {
        className: searchWrapperClasses,
        "data-for": "structured-query-tooltip",
        "data-tip": "Save Search",
        onClick: this.exportSearch,
        style: {
          background: typeof exportSearch !== 'function' ? 'lightgrey' : 'white',
          cursor: typeof exportSearch !== 'function' ? 'not-allowed' : 'pointer'
        }
      }, React__default.createElement("i", {
        className: "fal fa-save"
      })), React__default.createElement(ActiveFilters, {
        clearSearch: this.clearSearch,
        disabled: disabled,
        onRemove: this._removeTokenForValue,
        searchTokens: searchTokens
      }), React__default.createElement(Typeahead, {
        addTokenForValue: this._addTokenForValue,
        category: nextToken.category,
        customClasses: customClasses,
        datatype: _getInputDatatype(nextToken, options),
        disabled: disabled,
        header: _getHeader(nextToken),
        onKeyDown: this._onKeyDown,
        operator: nextToken.operator,
        options: _getOptionsForTypeahead(options, nextToken)
      }), React__default.createElement(ReactTooltip, {
        id: "structured-query-tooltip",
        place: "top",
        type: "dark",
        effect: "solid",
        multiline: false
      }));
    }
  }]);

  return Tokenizer;
}(React.Component);

_defineProperty(Tokenizer, "defaultProps", {
  // options is an array of objects with fields of
  // id, category, type
  options: [],
  customClasses: {},
  initTokens: [],
  disabled: false,
  exportSearch: null
});

_defineProperty(Tokenizer, "propTypes", {
  disabled: PropTypes.bool,
  exportSearch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string
  })),
  customClasses: PropTypes.object,
  onTokenAdd: PropTypes.func,
  onTokenRemove: PropTypes.func,
  initTokens: PropTypes.arrayOf(PropTypes.object)
});

var StructuredFilter =
/*#__PURE__*/
function (_Component) {
  _inherits(StructuredFilter, _Component);

  function StructuredFilter(props) {
    var _this;

    _classCallCheck(this, StructuredFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StructuredFilter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTokenAdd", function (searchTokens) {
      var _this$props = _this.props,
          onTokenAdd = _this$props.onTokenAdd,
          options = _this$props.options;
      _this.searchTokens = searchTokens;
      searchTokens = searchTokens.map(function (token) {
        if (!!token.value && !!_this.optionsMap[token.value]) {
          token.value = _this.optionsMap[token.value];
          return token;
        }

        return token;
      });

      if (typeof onTokenAdd === 'function') {
        onTokenAdd(searchTokens);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTokenRemove", function (searchTokens) {
      var _this$props2 = _this.props,
          onTokenRemove = _this$props2.onTokenRemove,
          options = _this$props2.options;
      _this.searchTokens = searchTokens;
      searchTokens = searchTokens.map(function (token) {
        if (!!token.value && !!_this.optionsMap[token.value]) {
          token.value = _this.optionsMap[token.value];
          return token;
        }

        return token;
      });

      if (typeof onTokenRemove === 'function') {
        onTokenRemove(searchTokens);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "prepOptions", function (options) {
      var map = {};
      options.forEach(function (option) {
        if (option.asyncFilter) {
          option.asyncFilter = _this.asyncFilter(option.asyncFilter);
        } else if (option.options) {
          option.options.forEach(function (opt, i) {
            if (!opt) return;

            if (_typeof(opt) === 'object') {
              map[opt.name] = opt;
              option.options[i] = opt.name;
            } else {
              map[opt] = opt;
            }
          });
        }
      });
      return map;
    });

    _defineProperty(_assertThisInitialized(_this), "asyncFilter", function (origAsyncFilter) {
      return function (value, tokens) {
        return new Promise(function (resolve, reject) {
          resolve(origAsyncFilter(value));
        }).then(function (options) {
          _this.mapNewOptions(options, tokens);

          return options;
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "mapNewOptions", function (options) {
      var oldOptions = {}; // resetting the selected options requires us to save the old
      // token values before assigning the new ones

      _this.searchTokens.forEach(function (tkn) {
        if (_typeof(tkn.value) === 'object' && !!_this.optionsMap[tkn.value.name]) {
          oldOptions[tkn.value.name] = _this.optionsMap[tkn.value.name];
        } else if (!!_this.optionsMap[tkn.value]) {
          oldOptions[tkn.value] = _this.optionsMap[tkn.value];
        }
      });

      _this.optionsMap = Object.assign({}, oldOptions);
      options.forEach(function (option, i) {
        if (_typeof(option) === 'object') {
          _this.optionsMap[option.name] = option;
          options[i] = option.name;
        } else {
          _this.optionsMap[option] = option;
        }
      });
    });

    _this.optionsMap = _this.prepOptions(_this.props.options);
    _this.searchTokens = [];
    return _this;
  }

  _createClass(StructuredFilter, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.options !== nextProps.options) {
        this.optionsMap = this.prepOptions(nextProps.options);
      }
    } // convert token values back to their proper option values before sending 
    // them along

  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(Tokenizer, _extends({}, this.props, {
        onTokenAdd: this.onTokenAdd,
        onTokenRemove: this.onTokenRemove
      }));
    }
  }]);

  return StructuredFilter;
}(React.Component);

_defineProperty(StructuredFilter, "propTypes", {
  onTokenAdd: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })]))
});

_defineProperty(StructuredFilter, "defaultProps", {
  onTokenAdd: null,
  options: []
});

module.exports = StructuredFilter;
