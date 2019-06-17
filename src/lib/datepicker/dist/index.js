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

var moment = _interopDefault(require('moment'));
var React = require('react');
var React__default = _interopDefault(React);
var cn = _interopDefault(require('classnames'));
var lodash = require('lodash');
var PropTypes = _interopDefault(require('prop-types'));
var blacklist = _interopDefault(require('blacklist'));
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);
var onClickOutside = _interopDefault(require('react-onclickoutside'));

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

__$styleInject(".m-calendar {\n  display: inline-block;\n}\n.m-calendar table {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n}\n.m-calendar td {\n  padding: 8px 0;\n  text-align: center;\n  cursor: pointer;\n  color: gray;\n  border: 1px solid gray;\n}\n.m-calendar thead td {\n  color: blue;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 12px;\n}\n.m-calendar tbody td {\n  color: lightgray;\n}\n.m-calendar tbody td:hover {\n  background: blue;\n  border-color: blue;\n  color: white;\n}\n.m-calendar .current-day {\n  color: blue;\n  font-weight: bold;\n}\n.m-calendar .disabled-day {\n  background-color: gray;\n  color: lightgray;\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n.m-calendar .disabled-day.current-day {\n  color: blue;\n}\n.m-calendar .disabled-day.current-day:hover {\n  color: blue;\n}\n.m-calendar .disabled-day:hover {\n  background-color: gray;\n  border-color: gray;\n  color: lightgray;\n}\n.m-calendar .prev-month,\n.m-calendar .next-month {\n  color: darkGray;\n}\n.m-calendar .prev-month-disabled,\n.m-calendar .next-month-disabled {\n  opacity: 0.4;\n}\n.m-calendar .toolbar {\n  line-height: 30px;\n  color: blue;\n  text-align: center;\n  margin-bottom: 13px;\n}\n.m-calendar .toolbar button {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  color: #ffffff;\n  border: 1px solid blue;\n  border-radius: 50%;\n  background: blue;\n  font-size: 20px;\n  padding: 0;\n  text-align: center;\n  outline: 0;\n  z-index: 1000;\n  cursor: pointer;\n}\n.m-calendar .toolbar:disabled {\n  cursor: not-allowed;\n}\n.m-calendar .toolbar .prev-month {\n  float: left;\n}\n.m-calendar .toolbar .next-month {\n  float: right;\n}\n.m-calendar .toolbar .current-date {\n  color: blue;\n}\n");

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
      var cls = cn({
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

__$styleInject(".m-calendar {\n  display: inline-block;\n}\n.m-calendar table {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n}\n.m-calendar td {\n  padding: 8px 0;\n  text-align: center;\n  cursor: pointer;\n  color: gray;\n  border: 1px solid gray;\n}\n.m-calendar thead td {\n  color: blue;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 12px;\n}\n.m-calendar tbody td {\n  color: lightgray;\n}\n.m-calendar tbody td:hover {\n  background: blue;\n  border-color: blue;\n  color: white;\n}\n.m-calendar .current-day {\n  color: blue;\n  font-weight: bold;\n}\n.m-calendar .disabled-day {\n  background-color: gray;\n  color: lightgray;\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n.m-calendar .disabled-day.current-day {\n  color: blue;\n}\n.m-calendar .disabled-day.current-day:hover {\n  color: blue;\n}\n.m-calendar .disabled-day:hover {\n  background-color: gray;\n  border-color: gray;\n  color: lightgray;\n}\n.m-calendar .prev-month,\n.m-calendar .next-month {\n  color: darkgray;\n}\n.m-calendar .prev-month-disabled,\n.m-calendar .next-month-disabled {\n  opacity: 0.4;\n}\n.m-calendar .toolbar {\n  line-height: 30px;\n  color: blue;\n  text-align: center;\n  margin-bottom: 13px;\n}\n.m-calendar .toolbar button {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  color: #ffffff;\n  border: 1px solid blue;\n  border-radius: 50%;\n  background: blue;\n  font-size: 20px;\n  padding: 0;\n  text-align: center;\n  outline: 0;\n  z-index: 1000;\n  cursor: pointer;\n}\n.m-calendar .toolbar:disabled {\n  cursor: not-allowed;\n}\n.m-calendar .toolbar .prev-month {\n  float: left;\n}\n.m-calendar .toolbar .next-month {\n  float: right;\n}\n.m-calendar .toolbar .current-date {\n  color: blue;\n}\n");

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
      var prevMonthButtonClasses = cn({
        'prev-month': true,
        'prev-month-disabled': prevMonthShouldBeDisabled
      });
      var nextMonthButtonClasses = cn({
        'next-month': true,
        'next-month-disabled': nextMonthShouldBeDisabled
      });
      return React__default.createElement("div", {
        className: cn('m-calendar', this.props.className)
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

__$styleInject(".u-slider {\n  position: relative;\n  display: inline-block;\n  background-color: #dddddd;\n  border-radius: 3px;\n}\n.u-slider .value {\n  position: absolute;\n  background-color: #2e8ece;\n  border-radius: 3px;\n}\n.u-slider .handle {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n}\n.u-slider .handle:after {\n  position: relative;\n  display: block;\n  content: '';\n}\n.u-slider-x .handle:after,\n.u-slider-y .handle:after {\n  width: 24px;\n  height: 24px;\n  background-color: #fff;\n  border: 3px solid #2e8ece;\n  border-radius: 50%;\n}\n.u-slider-x {\n  height: 20px;\n}\n.u-slider-x .handle {\n  height: 100%;\n}\n.u-slider-x .handle:after {\n  top: -2px;\n  left: -12px;\n}\n.u-slider-x .value {\n  top: 0;\n  height: 100%;\n}\n.u-slider-y {\n  width: 20px;\n}\n.u-slider-y .handle {\n  width: 100%;\n}\n.u-slider-y .handle:after {\n  top: -12px;\n  left: -2px;\n}\n.u-slider-y .value {\n  left: 0;\n  width: 100%;\n}\n.u-slider-xy {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: #2e8ece;\n  border-radius: 0;\n}\n.u-slider-xy .handle {\n  position: absolute;\n}\n.u-slider-xy .handle:after {\n  position: relative;\n  display: block;\n  top: -10px;\n  left: -10px;\n  width: 20px;\n  height: 20px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 2px solid #fff;\n  border-radius: 50%;\n  content: '';\n}\n");

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
      props.className = cn('u-slider', "u-slider-".concat(axis), this.props.className);
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

var composeClass$1 = composeClass;

__$styleInject("/*@import 'variables';*/\n.APMTime {\n  color: #fff;\n  padding-top: 50px;\n}\n.APMTime-showtime {\n  text-align: center;\n}\n.APMTime-display {\n  display: block;\n}\n.APMTime-separater {\n  display: inline-block;\n  font-size: 32px;\n  font-weight: bold;\n  color: #0000ff;\n  width: 32px;\n  height: 65px;\n  line-height: 65px;\n  text-align: center;\n}\n.APMTime-sliders {\n  padding: 0 10px;\n}\n.APMTime-time {\n  width: 65px;\n  height: 65px;\n  display: inline-block;\n  font-size: 38px;\n  line-height: 65px;\n  background-color: #0000ff;\n  border-radius: 3px;\n  text-align: center;\n}\n.APMTime-time-text {\n  position: relative;\n  left: -10px;\n  font-size: 15px;\n  color: #0000ff;\n  margin-top: 7px;\n  margin-bottom: 10px;\n}\n");

var Time = function Time(props) {
  var className = props.className,
      moment = props.moment,
      minHour = props.minHour,
      maxHour = props.maxHour,
      display = props.display,
      onChange = props.onChange;

  var changeHours = function changeHours(pos) {
    moment.hours(pos.x);
    onChange(moment);
  };

  var changeMinutes = function changeMinutes(pos) {
    moment.minutes(pos.x);
    onChange(moment);
  };

  var cc = composeClass$1('APMTime', className);
  return React__default.createElement("div", {
    className: cn(cc(), className, _defineProperty({}, cc('display'), display))
  }, React__default.createElement("div", {
    className: cc('showtime')
  }, React__default.createElement("span", {
    className: cc('time')
  }, moment.format('HH')), React__default.createElement("span", {
    className: cc('separater')
  }, ":"), React__default.createElement("span", {
    className: cc('time')
  }, moment.format('mm'))), React__default.createElement("div", {
    className: cc('sliders')
  }, React__default.createElement("div", {
    className: cc('time-text')
  }, "Hours:"), React__default.createElement(InputSlider, {
    className: "u-slider-time",
    xmin: minHour,
    xmax: maxHour,
    x: moment.hour(),
    onChange: changeHours
  }), React__default.createElement("div", {
    className: cc("time-text")
  }, "Minutes:"), React__default.createElement(InputSlider, {
    className: "u-slider-time",
    xmin: minHour,
    xmax: maxHour,
    x: moment.minute(),
    onChange: changeMinutes
  })));
};
Time.propTypes = {
  className: PropTypes.string,
  moment: PropTypes.object.isRequired,
  minHour: PropTypes.number,
  maxHour: PropTypes.number,
  display: PropTypes["boolean"],
  onChange: PropTypes.func
};

__$styleInject(".APMOptionalControl {\n  border: 1px solid blue;\n  border-radius: 3px;\n  margin-right: 12px;\n  transition: all 0.1s ease;\n}\n.APMOptionalControl-icon-rm {\n  margin-right: 6px;\n}\n.APMOptionalControl:focus {\n  outline: none;\n}\n.APMOptionalControl:hover {\n  color: blue;\n}\n");

function OptionalControl(props) {
  var onClick = props.onClick,
      iconClass = props.iconClass,
      children = props.children,
      className = props.className;
  var cc = composeClass$1('APMOptionalControl', className);
  return React__default.createElement("button", {
    className: cc(),
    onClick: onClick
  }, React__default.createElement("i", {
    className: cn(cc('icon'), _defineProperty({}, cc('icon-rm'), !!children), iconClass)
  }), children);
}
OptionalControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconClass: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string
};

__$styleInject(".im-btn {\n  display: inline-block;\n  background-color: #ffffff;\n  border: 0;\n  outline: 0;\n  cursor: pointer;\n  line-height: 1;\n}\n.im-btn:before {\n  margin-right: 6px;\n}\n.APMDatePicker {\n  display: inline-block;\n  width: 330px;\n  padding: 18px;\n  border-radius: 3px;\n  border: 1px solid gray;\n}\n.APMDatePicker-optional-controls {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.APMDatePicker-optional-controls-orphan {\n  margin-right: 0;\n}\n.APMDatePicker-options {\n  width: 100%;\n  display: inline-block;\n  margin-bottom: 24px;\n}\n.APMDatePicker-options button {\n  float: left;\n  width: 50%;\n  color: blue;\n  text-align: center;\n  font-size: 16px;\n  padding: 7px;\n  border: 1px solid blue;\n  border-radius: 3px;\n}\n.APMDatePicker-options button:first-child {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.APMDatePicker-options button:last-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.APMDatePicker-options button.is-active {\n  color: #ffffff;\n  background-color: blue;\n}\n.APMDatePicker .tab {\n  display: none;\n  height: auto;\n}\n.APMDatePicker .tab.is-active {\n  display: block;\n}\n.APMDatePicker .tabs {\n  margin-bottom: 11px;\n}\n.APMDatePicker .btn-save {\n  display: block;\n  margin-top: 30px;\n  width: 100%;\n  background-color: blue;\n  padding: 12px 0;\n  text-align: center;\n  color: #ffffff;\n  font-size: 16px;\n  border-radius: 3px;\n}\n");

var isCallbackValid = function isCallbackValid(callback) {
  return typeof callback === 'function';
};

var tabDisabled = {
  cursor: 'default',
  width: '100%'
};
var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DatePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  _createClass(DatePicker, [{
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
      var cc = composeClass$1('APMDatePicker', className);
      return React__default.createElement("div", {
        className: cc()
      }, React__default.createElement("i", null), React__default.createElement("div", {
        className: cc('optional-controls')
      }, React__default.createElement("div", {
        className: cc('optional-controls-main')
      }, isCallbackValid(saveDate) || React__default.createElement(OptionalControl, {
        onClick: saveDate,
        iconClass: "fal fa-save"
      }, "Save"), isCallbackValid(clearInput) && React__default.createElement(OptionalControl, {
        onClick: clearInput,
        iconClass: "fal fa-empty-set"
      }, "Clear")), isCallbackValid(handleClose) && React__default.createElement(OptionalControl, {
        onClick: saveDate,
        iconClass: "fal fa-times",
        className: cc('optional-controls-orphan')
      })), React__default.createElement("div", {
        className: cc('options')
      }, !dateDisabled && React__default.createElement("button", {
        className: cn('im-btn', {
          'is-active': tab === 'date'
        }),
        name: "date",
        onClick: this.handleClickTab,
        style: timeDisabled ? tabDisabled : {},
        type: "button"
      }, React__default.createElement("i", {
        className: "fal fa-calendar-alt fa-sm m-r-xs"
      }), "Date"), !timeDisabled && React__default.createElement("button", {
        className: cn('im-btn', {
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
        className: cn('tab', {
          'is-active': tab === 'date'
        }),
        maxDate: maxDate,
        minDate: minDate,
        moment: m,
        onChange: this.props.onChange
      }), !timeDisabled && React__default.createElement(Time, {
        display: tab === 'time',
        minHour: minHour,
        maxHour: maxHour,
        minMinute: minMinute,
        maxMinute: maxMinute,
        moment: m,
        onChange: this.props.onChange
      })));
    }
  }]);

  return DatePicker;
}(React.Component);
DatePicker.propTypes = {
  clearInput: PropTypes.func,
  dateDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  minHour: PropTypes.number,
  maxHour: PropTypes.number,
  minMinute: PropTypes.number,
  maxMinute: PropTypes.number,
  saveDate: PropTypes.func,
  timeDisabled: PropTypes.bool
};
DatePicker.defaultProps = {
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
};

__$styleInject(".APMDatePickerComposed {\n  width: 100%;\n}\n.APMDatePickerComposed-input-group {\n  width: 1px;\n  position: relative;\n  display: flex;\n  border-collapse: separate;\n  border: 1px solid blue;\n  width: 100%;\n  padding: 0;\n}\n.APMDatePickerComposed-input-group-has-error {\n  border-color: #be1717;\n}\n.APMDatePickerComposed-input-group-button {\n  color: blue;\n  border-right: 1px solid blue;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1;\n  padding: 6px 12px;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.APMDatePickerComposed-input-group-button-is-on {\n  color: white;\n  background-color: blue;\n  border-color: blue;\n}\n.APMDatePickerComposed-input-group-button-has-error {\n  color: #be1717;\n  border-color: #be1717;\n}\n.APMDatePickerComposed-input-group-button:hover {\n  cursor: pointer;\n}\n.APMDatePickerComposed-input-group-button:focus {\n  outline: none;\n}\n.APMDatePickerComposed-input-field {\n  width: 100%;\n  background-color: #FFFFFF;\n  background-image: none;\n  border: none;\n  color: #16181e;\n  padding: 6px 12px;\n  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;\n  height: 100%;\n}\n.APMDatePickerComposed-input-field:invalid {\n  border-color: #ed5565 !important;\n}\n.APMDatePickerComposed-input-field:focus {\n  outline: none;\n  border-color: green;\n}\n.APMDatePickerComposed-input-field[disabled] {\n  background-color: #e4f1cf;\n  border-color: #e4f1cf;\n}\n.APMDatePickerComposed-datepicker-container {\n  position: absolute;\n  left: 38px;\n  top: 30px;\n  background-color: #fff;\n  z-index: 1000;\n  max-width: 400px;\n  font-size: 12.6px;\n}\n");

var DEFAULT_FORMAT_MASKS = {
  datetime: 'YYYY-MM-DD HH:mm',
  date: 'YYYY-MM-DD',
  time: 'HH:mm'
};
var DatePickerContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePickerContainer, _Component);

  function DatePickerContainer(props) {
    var _this;

    _classCallCheck(this, DatePickerContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePickerContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isPickerEnabled", function () {
      if (!_this.pickerRef) return false;

      var pickerBound = _this.pickerRef.getBoundingClientRect();

      var windowHeight = window.innerHeight;

      if (pickerBound.bottom > windowHeight) {
        _this.setState({
          pickerEnabled: false
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
      if (!_this.state.showPicker) return;

      _this.setState({
        showPicker: false
      }, function () {
        if (typeof onBlur === 'function' && _this.lastVal !== value) {
          onBlur(hasError, value, name);
          _this.lastVal = value;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.setState({
        showPicker: true
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
        pickerEnabled: !value.length > 0,
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

    _defineProperty(_assertThisInitialized(_this), "handleIconClick", function (evt) {
      _this.setState(function (prevState) {
        return {
          showPicker: !prevState.showPicker
        };
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
        showPicker: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPicker", function (cc) {
      var _this$props5 = _this.props,
          pickerStyle = _this$props5.pickerStyle,
          portalRef = _this$props5.portalRef;
      var picker = React__default.createElement("div", {
        className: cn(cc('datepicker-container'), 'ignore-react-onclickoutside'),
        ref: function ref(_ref) {
          return _this.pickerRef = _ref;
        },
        style: pickerStyle.container
      }, React__default.createElement(DatePicker, {
        handleClose: _this.handleClose,
        onChange: _this.handleDateTimeChange,
        clearInput: _this.clearInput,
        dateDisabled: _this.props.type === 'time',
        timeDisabled: _this.props.type === 'date',
        maxDate: _this.props.maxDate,
        minDate: _this.props.minDate,
        maxHour: _this.props.maxHour,
        minHour: _this.props.minHour,
        maxMinute: _this.props.maxMinute,
        minMinute: _this.props.minMinute,
        moment: _this.moment,
        nextMonthIcon: "fa fa-angle-right",
        prevMonthIcon: "fa fa-angle-left"
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

    _this.lastVal = val; // @showPicker(bool) - if the date picker popup is open
    // @hasError(bool) - if there is an error with the users
    // 	selected date
    // @pickerEnabled - enabled if the datepicker can fit in the viewport;
    // 	otherwise the user enters the date directly
    // @value(string) - current value in the input field

    _this.state = {
      showPicker: _this.props.autoFocus,
      hasError: !!_required & !val,
      pickerEnabled: true,
      value: val
    };
    return _this;
  }

  _createClass(DatePickerContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isPickerEnabled(); //window.addEventListener('resize', this.isPickerEnabled);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      console.log(prevProps, prevState);
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
    value: function componentWillUnmount() {} //window.removeEventListener('resize', this.isPickerEnabled);
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          hasError = _this$state2.hasError,
          pickerEnabled = _this$state2.pickerEnabled,
          showPicker = _this$state2.showPicker,
          value = _this$state2.value;
      var _this$props7 = this.props,
          disabled = _this$props7.disabled,
          error = _this$props7.error,
          name = _this$props7.name,
          type = _this$props7.type,
          className = _this$props7.className;
      var cc = composeClass$1('APMDatePickerComposed', className);
      var isClock = type === 'time';
      return React__default.createElement("div", {
        className: cc()
      }, React__default.createElement("div", {
        className: cn(cc('input-group'), _defineProperty({}, cc('input-group-has-error'), hasError))
      }, React__default.createElement("button", {
        className: cn(cc('input-group-button'), _defineProperty({}, cc('input-group-button-has-error'), hasError), _defineProperty({}, cc('input-group-button-is-on'), showPicker)),
        onClick: this.handleIconClick
      }, React__default.createElement("i", {
        className: cn('fal', {
          'fa-calendar-alt': !isClock
        }, {
          'fa-clock': isClock
        })
      })), React__default.createElement("input", {
        "data-testid": 'datepicker-input-' + name,
        className: cc('input-field'),
        disabled: disabled,
        onChange: this.handleInputChange,
        onClick: this.onClick,
        placeholder: this.getDateFormat(),
        type: "text",
        value: value
      }), pickerEnabled && showPicker && this.renderPicker(cc)));
    }
  }]);

  return DatePickerContainer;
}(React.Component);
DatePickerContainer.propTypes = {
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
};
DatePickerContainer.defaultProps = {
  className: '',
  disabled: false,
  error: null,
  maxDate: null,
  minDate: null,
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  pickerStyle: {
    container: {}
  },
  name: '',
  onBlur: null,
  onChange: null,
  required: false,
  type: 'datetime',
  value: ''
};
var DatePickerComposed = onClickOutside(DatePickerContainer);

var Calendar$1 = Calendar;
var CalendarDay$1 = CalendarDay;
var DatePicker$1 = DatePicker;
var DatePickerComposed$1 = DatePickerComposed;
var InputSlider$1 = InputSlider;
var Time$1 = Time;

exports.Calendar = Calendar$1;
exports.CalendarDay = CalendarDay$1;
exports.DatePicker = DatePicker$1;
exports.DatePickerComposed = DatePickerComposed$1;
exports.InputSlider = InputSlider$1;
exports.Time = Time$1;
