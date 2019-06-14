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
var classNames = _interopDefault(require('classnames'));
var reactDom = require('react-dom');
var mentorInputs = require('mentor-inputs');

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

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal(props) {
    var _this;

    _classCallCheck(this, Portal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portal).call(this, props));
    _this.el = document.createElement('div');
    document.body.appendChild(_this.el);
    return _this;
  }

  _createClass(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //hide the scrollbar
      document.body.style.setProperty('overflow', 'hidden');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //bring back scrollbar
      document.body.style.removeProperty('overflow');
      document.body.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      return reactDom.createPortal(this.props.children, this.el);
    }
  }]);

  return Portal;
}(React__default.Component);

function getCircleStatus(step, activeStep, index) {
  if (!!step.error) {
    return 'stepper-error';
  } else if (index <= activeStep) {
    return 'stepper-active';
  }

  return 'stepper-default';
}

var Step =
/*#__PURE__*/
function (_Component) {
  _inherits(Step, _Component);

  function Step() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Step)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.props.onClick(_this.props.index);
    });

    return _this;
  }

  _createClass(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeStep = _this$props.activeStep,
          hasNextStep = _this$props.hasNextStep,
          hasPrevStep = _this$props.hasPrevStep,
          index = _this$props.index,
          step = _this$props.step,
          width = _this$props.width;
      var circleStatus = getCircleStatus(step, activeStep, index);
      var leftBarClasses = classNames({
        'stepper-step-left-bar': true,
        'stepper-bar-active': index <= activeStep,
        'stepper-bar-default': index > activeStep
      });
      var rightBarClasses = classNames({
        'stepper-step-right-bar': true,
        'stepper-bar-active': index < activeStep,
        'stepper-bar-default': index >= activeStep
      });
      return React__default.createElement("div", {
        className: "stepper-step",
        style: {
          width: width
        }
      }, React__default.createElement("div", {
        className: "stepper-step-circle ".concat(circleStatus),
        onClick: this.onClick
      }, React__default.createElement("span", {
        className: "stepper-step-text"
      }, index < activeStep && !step.error ? React__default.createElement("i", {
        className: "fa fa-check"
      }) : index + 1)), React__default.createElement("div", {
        className: "stepper-step-title ".concat(circleStatus, "-title")
      }, step.title), hasPrevStep && React__default.createElement("div", {
        className: leftBarClasses
      }), hasNextStep && React__default.createElement("div", {
        className: rightBarClasses
      }));
    }
  }]);

  return Step;
}(React.Component);

_defineProperty(Step, "propTypes", {
  activeStep: PropTypes.number,
  hasNextStep: PropTypes.bool,
  hasPrevStep: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  step: PropTypes.object,
  width: PropTypes.string
});

_defineProperty(Step, "defaultProps", {
  step: {},
  width: '100%'
});

var Stepper = function Stepper(_ref) {
  var activeStep = _ref.activeStep,
      onClick = _ref.onClick,
      steps = _ref.steps;
  return React__default.createElement("div", {
    className: "stepper-container"
  }, React__default.createElement("div", {
    className: "stepper"
  }, steps.map(function (step, i) {
    return React__default.createElement(Step, {
      activeStep: activeStep,
      hasNextStep: i !== steps.length - 1,
      hasPrevStep: i !== 0,
      index: i,
      key: step.id,
      onClick: onClick,
      step: step,
      width: "".concat(100 / steps.length, "%")
    });
  })));
};
Stepper.propTypes = {
  activeStep: PropTypes.number,
  onClick: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.object)
};
Stepper.defaultProps = {
  activeStep: 0,
  steps: []
};

var SelectedOption =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectedOption, _Component);

  function SelectedOption() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectedOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectedOption)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "removeSelectedOption", function () {
      _this.props.onClick(_this.props.option);
    });

    return _this;
  }

  _createClass(SelectedOption, [{
    key: "render",
    value: function render() {
      var option = this.props.option;
      return React__default.createElement("h2", {
        className: "selected-option"
      }, _typeof(option) === 'object' ? option.name : option, React__default.createElement("i", {
        className: "fa fa-times",
        onClick: this.removeSelectedOption
      }));
    }
  }]);

  return SelectedOption;
}(React.Component);

_defineProperty(SelectedOption, "propTypes", {
  onClick: PropTypes.func,
  option: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
});

_defineProperty(SelectedOption, "defaultProps", {
  option: ''
});

var Label = function Label(_ref) {
  var label = _ref.label,
      required = _ref.required;
  return React__default.createElement("div", {
    className: "row"
  }, React__default.createElement("div", {
    className: "col-2"
  }), React__default.createElement("div", {
    className: "col-4"
  }, React__default.createElement("label", {
    className: "label"
  }, label)), React__default.createElement("div", {
    className: "col-4 text-right"
  }, !!required && React__default.createElement("label", {
    className: "required-input"
  }, "Required")));
};
Label.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool
};
Label.defaultProps = {
  label: ''
};

var Field = function Field(_ref) {
  var canGoLeft = _ref.canGoLeft,
      canGoRight = _ref.canGoRight,
      canSubmit = _ref.canSubmit,
      handleGoingLeft = _ref.handleGoingLeft,
      handleGoingRight = _ref.handleGoingRight,
      InputComponent = _ref.InputComponent,
      value = _ref.value,
      _onSubmit = _ref._onSubmit;

  if (_typeof(value) === 'object') {
    value = value.name;
  }

  return React__default.createElement("div", {
    className: "row"
  }, React__default.createElement("div", {
    className: "col-2 text-right"
  }, canGoLeft && React__default.createElement("button", {
    className: "nav-btn",
    onClick: handleGoingLeft
  }, React__default.createElement("i", {
    className: "far fa-chevron-left fa-2x"
  }), React__default.createElement("br", null), "Back")), React__default.createElement("div", {
    className: "col-8"
  }, !!InputComponent && React__default.cloneElement(InputComponent, {
    'data-testid': 'field-input',
    value: value
  })), React__default.createElement("div", {
    className: "col-2"
  }, canGoRight && React__default.createElement("button", {
    className: "nav-btn",
    onClick: handleGoingRight
  }, React__default.createElement("i", {
    className: "far fa-chevron-right fa-2x"
  }), React__default.createElement("br", null), "Next"), canSubmit && React__default.createElement("button", {
    className: "nav-btn nav-btn-submit",
    onClick: _onSubmit
  }, React__default.createElement("i", {
    className: "far fa-check fa-2x"
  }), React__default.createElement("br", null), "Submit")));
};
Field.propTypes = {
  canGoLeft: PropTypes.bool,
  canGoRight: PropTypes.bool,
  canSubmit: PropTypes.bool,
  handleGoingLeft: PropTypes.func,
  handleGoingRight: PropTypes.func,
  InputComponent: PropTypes.element,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  _onSubmit: PropTypes.func
};
Field.defaultProps = {
  canGoLeft: false,
  canGoRight: false,
  canSubmit: false,
  handleGoingLeft: null,
  handleGoingRight: null,
  InputComponent: null,
  value: '',
  _onSubmit: null
};

/**
 * PolyFills make me sad
 */
var KeyEvent = {};
KeyEvent.DOM_VK_BACK_SPACE = KeyEvent.DOM_VK_BACK_SPACE || 8;
KeyEvent.DOM_VK_TAB = KeyEvent.DOM_VK_TAB || 9;
KeyEvent.DOM_VK_RETURN = KeyEvent.DOM_VK_RETURN || 13;
KeyEvent.DOM_VK_ENTER = KeyEvent.DOM_VK_ENTER || 14;
KeyEvent.DOM_VK_ESCAPE = KeyEvent.DOM_VK_ESCAPE || 27;
KeyEvent.DOM_VK_SPACE = KeyEvent.DOM_VK_SPACE || 32;
KeyEvent.DOM_VK_PAGEUP = KeyEvent.DOM_VK_PAGEUP || 33;
KeyEvent.DOM_VK_PAGEDOWN = KeyEvent.DOM_VK_PAGEDOWN || 34;
KeyEvent.DOM_VK_END = KeyEvent.DOM_VK_END || 35;
KeyEvent.DOM_VK_HOME = KeyEvent.DOM_VK_HOME || 36;
KeyEvent.DOM_VK_LEFT = KeyEvent.DOM_VK_LEFT || 37;
KeyEvent.DOM_VK_UP = KeyEvent.DOM_VK_UP || 38;
KeyEvent.DOM_VK_RIGHT = KeyEvent.DOM_VK_RIGHT || 39;
KeyEvent.DOM_VK_DOWN = KeyEvent.DOM_VK_DOWN || 40;

__$styleInject(".insert-popup-stepper {\n  padding: 0 15px;\n}\n.insert-popup-stepper .stepper-container {\n  width: 100%;\n  min-height: 0;\n  padding: 0;\n}\n.insert-popup-stepper .stepper-container .stepper {\n  display: table;\n  width: 100%;\n  margin: 0 auto;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step {\n  display: table-cell;\n  position: relative;\n  padding-top: 24px;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-step-circle {\n  width: 50px;\n  height: 50px;\n  margin: 0 auto;\n  border-radius: 50%;\n  text-align: center;\n  padding: 1px;\n  font-size: 16px;\n  color: #fff;\n  display: block;\n  border-width: 0;\n  position: relative;\n  z-index: 1;\n  cursor: pointer;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-step-circle .stepper-step-text {\n  user-select: none;\n  line-height: 50px;\n  color: #fff;\n  font-size: 22px;\n  font-weight: 700;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-error {\n  background-color: #BE1717;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-active {\n  background-color: #8DC63F;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-default {\n  background-color: #dfe6ee;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-step-title {\n  margin-top: 8px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n  display: block;\n  user-select: none;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-error-title {\n  color: #BE1717;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-active-title {\n  color: #313541;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-default-title {\n  color: #dfe6ee;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-step-left-bar {\n  position: absolute;\n  top: 50px;\n  height: 5px;\n  left: 0;\n  right: 50%;\n  margin-right: 20px;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-step-right-bar {\n  position: absolute;\n  top: 50px;\n  height: 5px;\n  right: 0;\n  left: 50%;\n  margin-left: 20px;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-bar-active {\n  border-top: 5px solid #8DC63F;\n}\n.insert-popup-stepper .stepper-container .stepper .stepper-step .stepper-bar-default {\n  border-top: 5px solid #dfe6ee;\n}\n.insert-popup-overlay {\n  background-color: rgba(0, 0, 0, 0.25);\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 10;\n}\n.insert-popup-overlay > .insert-popup-container {\n  border-radius: 9.3px;\n  border: solid 0.9px #979797;\n  background-color: #fff;\n  width: 95%;\n  height: 90%;\n  margin: 2.5%;\n  padding: 5px 15px 10px 15px;\n}\n.insert-popup-overlay > .insert-popup-container > .close-form {\n  text-align: right;\n  padding: 15px;\n  height: 60px;\n}\n.insert-popup-overlay > .insert-popup-container > .close-form i {\n  opacity: 0.6;\n}\n.insert-popup-overlay > .insert-popup-container > .close-form i:hover {\n  opacity: 1;\n}\n.insert-popup-overlay > .insert-popup-container > .selected-options {\n  margin: 0 auto;\n  width: 100%;\n  text-align: center;\n  overflow-y: auto;\n  padding: 0 30px 15px 30px;\n  height: 30%;\n}\n.insert-popup-overlay > .insert-popup-container > .selected-options:after {\n  content: '';\n}\n.insert-popup-overlay > .insert-popup-container > .selected-options > .selected-option {\n  display: inline-block;\n  border-radius: 24px;\n  margin: 0 5px 5px 0;\n  padding: 5px 15px;\n  background-color: #8DC63F;\n  color: #ffffff;\n  font-size: 24px;\n  font-weight: 100;\n  line-height: 1.1;\n  font-family: inherit;\n}\n.insert-popup-overlay > .insert-popup-container > .selected-options > .selected-option > i {\n  cursor: pointer;\n  margin-left: 5px;\n}\n.insert-popup-overlay > .insert-popup-container > .layout {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  height: calc(70% - 60px);\n  padding-bottom: 30px;\n}\n.insert-popup-overlay > .insert-popup-container > .layout > .form {\n  width: 100%;\n  margin: 0 auto;\n}\n.insert-popup-overlay > .insert-popup-container > .layout > .form select {\n  -webkit-appearance: none;\n}\n.insert-popup-overlay > .insert-popup-container > .layout > .form .label {\n  margin: 0 auto;\n  font-size: 50px;\n  font-weight: 400;\n  color: #313541;\n  font-family: \"open sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  padding: 0;\n}\n.insert-popup-overlay > .insert-popup-container > .layout > .form .required-input {\n  color: #be1717;\n  margin: 0;\n  position: relative;\n  top: 30px;\n}\n.insert-popup-overlay > .insert-popup-container > .layout > .form .form-input {\n  border-radius: 3.7px;\n  width: 100%;\n  height: 140px;\n  font-size: 38px;\n  font-weight: 400;\n  word-spacing: 1.5px;\n  font-family: \"open sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.insert-popup-overlay > .insert-popup-container > .layout .nav-btn {\n  padding: 40px 20px;\n  background: #fff;\n  border: solid 2px #8DC63F;\n  height: 140px;\n  font-size: 2em;\n  border-radius: 5px;\n  color: #8DC63F;\n  box-shadow: none;\n  padding: 6px 40px;\n  min-width: 200px;\n  outline: 0;\n  transition: background 0.5s ease-in-out 0s, color 0.5s ease-in-out 0s;\n}\n.insert-popup-overlay > .insert-popup-container > .layout .nav-btn:hover {\n  color: white;\n  background: #8DC63F;\n}\n.insert-popup-overlay > .insert-popup-container > .layout .nav-btn-submit {\n  padding: 40px 20px;\n  background: #fff;\n  border: solid 2px #8DC63F;\n  height: 140px;\n  font-size: 2em;\n  border-radius: 5px;\n  color: #8DC63F;\n  box-shadow: none;\n  padding: 6px 40px;\n  min-width: 200px;\n  outline: 0;\n  transition: background 0.5s ease-in-out 0s, color 0.5s ease-in-out 0s;\n  border: solid 2px #003852;\n  color: #003852;\n}\n.insert-popup-overlay > .insert-popup-container > .layout .nav-btn-submit:hover {\n  color: white;\n  background: #8DC63F;\n}\n.insert-popup-overlay > .insert-popup-container > .layout .nav-btn-submit:hover {\n  color: white;\n  background: #003852;\n}\n");

// question at a time based on the formFields inputted. Once an input is
// filled out, it jumps to the next input. It allows for navigation using the
// Enter, Tab, and arrow up and down keys.

var InsertForm =
/*#__PURE__*/
function (_Component) {
  _inherits(InsertForm, _Component);

  function InsertForm(props) {
    var _this;

    _classCallCheck(this, InsertForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InsertForm).call(this, props)); // insertion data taken from the form

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (event.keyCode === KeyEvent.DOM_VK_TAB) {
        event.preventDefault();
        event.stopPropagation();

        if (event.shiftKey) {
          _this.handleGoingLeft();
        } else {
          _this.handleGoingRight();
        }
      } else if (event.keyCode === KeyEvent.DOM_VK_ESCAPE) {
        _this.onDisable();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initializeInsertForm", function () {
      var formFields = _this.props.formFields;
      _this.insertData = {};
      var initInsertData = Object.assign({}, _this.props.initInsertData);
      var newFormModel = [];
      var newFieldsWithError = {};
      var newSteps = []; // grab only insertable fields for the form

      var formModel = formFields.filter(function (field) {
        return field.insertable !== false;
      });
      var InputComponent = null;
      var MentorInput = null;
      var mentorInputProps = {}; // initialize insert data

      formModel.forEach(function (field, i) {
        mentorInputProps = {
          autoFocus: true,
          className: 'form-input',
          key: field.id,
          name: field.id,
          onBlur: _this._handleInputBlur,
          onChange: _this._handleInputChange,
          onKeyDown: _this.onKeyDown,
          required: field.required,
          value: '',
          validation: _this.validateField
        };

        if (!!field.options) {
          InputComponent = React__default.createElement(mentorInputs.SelectInput, _extends({}, mentorInputProps, {
            options: field.options
          }));
        } else if (field.lookup) {
          InputComponent = React__default.createElement(mentorInputs.AsyncDropdown, _extends({}, mentorInputProps, field.lookup));
        } else if ((!!field.asyncFilter || field.type === 'listfilter') && !field.tableOnInsert) {
          delete mentorInputProps.onBlur;
          InputComponent = React__default.createElement(mentorInputs.ListFilter, _extends({}, mentorInputProps, {
            customFilter: mentorInputs.asyncFilter(field.asyncFilter),
            onMatch: _this._handleOptionMatch
          }));
        } else if (field.multiline) {
          InputComponent = React__default.createElement(mentorInputs.TextareaInput, mentorInputProps);
        } else if (!!field.tableOnInsert) {
          InputComponent = React__default.createElement("input", {
            disabled: true,
            value: "Under Construction"
          }); // InputComponent = (
          // 	<TableInput
          // 		{...mentorInputProps}
          // 		apiInfo={field.tableOnInsert}
          // 		onSelectData={this._handleOptionMatch}
          // 	/>
          // );
        } else {
          MentorInput = mentorInputs.getMentorInput(field.type);
          InputComponent = React__default.createElement(MentorInput, _extends({}, mentorInputProps, {
            onKeyUp: field.tokenize ? _this._handleTokenizeKeyUp : undefined
          }));
        }

        _this.insertData[field.id] = ''; // initialize insert data

        if (field.required) {
          newFieldsWithError[field.id] = true;
        } // initialize token fields


        if (field.collection || field.tokenize) {
          _this.insertData[field.id] = {
            options: [],
            value: ''
          }; // handle any initial data passed in for collections/tokens

          if (initInsertData[field.id]) {
            _this.insertData[field.id].value = initInsertData[field.id];
            delete initInsertData[field.id];
          }
        }

        newSteps.push({
          id: field.id,
          title: field.category,
          error: !!field.required
        });
        newFormModel.push(Object.assign({}, field, {
          InputComponent: InputComponent
        }));
      }); // initial data passed in to load into the form

      _this.insertData = Object.assign({}, _this.insertData, initInsertData);

      _this.setState({
        currentInputLabel: formModel[0] ? formModel[0].category : '',
        fieldIndex: 0,
        fieldsWithError: newFieldsWithError,
        formModel: newFormModel,
        steps: newSteps
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getField", function () {
      var _this$state = _this.state,
          fieldIndex = _this$state.fieldIndex,
          formModel = _this$state.formModel;
      return formModel[fieldIndex];
    });

    _defineProperty(_assertThisInitialized(_this), "isFieldTokenized", function () {
      return _this.getField().collection || _this.getField().tokenize;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputChange", function (error, newValue, fieldId) {
      var fieldError = false;
      console.log({
        error: error,
        newValue: newValue,
        fieldId: fieldId
      });
      _this.insertData[fieldId] = _this.insertData[fieldId] || {
        options: []
      };

      if (_this.isFieldTokenized()) {
        console.log('tokenized');
        _this.insertData[fieldId].value = newValue; // need to handle tokenized field error handling
        // differently than the other inputs

        if (_this.insertData[fieldId].options.length === 0 && _this.getField().required) {
          fieldError = true;
        }
      } else {
        _this.insertData[fieldId] = newValue;
        fieldError = error;
      }

      _this.handleFieldError(fieldError, fieldId);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleInputBlur", function (error, newValue, fieldId) {
      var fieldError = false;

      if (_this.isFieldTokenized()) {
        _this.insertData[fieldId] = _this.insertData[fieldId] || {};
        _this.insertData[fieldId].value = newValue; // need to handle tokenized field error handling
        // differently than the other inputs

        if (_this.insertData[fieldId].options.length === 0 && _this.getField().required) {
          fieldError = true;
        }
      } else {
        _this.insertData[fieldId] = newValue;
        fieldError = error;
      }

      _this.handleFieldError(fieldError, fieldId);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleTokenizeKeyUp", function (event) {
      if (event.keyCode === KeyEvent.DOM_VK_ENTER || event.keyCode === KeyEvent.DOM_VK_RETURN) {
        var fieldId = _this.getField().id;

        var value = event.target.value;

        var index = _this.insertData[fieldId].options.findIndex(function (option) {
          return option === value;
        }); // no value in input field or value exists in the options


        if (!value || index > -1) return;

        _this.insertData[fieldId].options.push(value);

        _this.insertData[fieldId].value = '';

        _this.handleFieldError(false, fieldId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleOptionMatch", function (option, fieldId) {
      // add to list of values if it is a collection field
      if (_this.getField().collection) {
        var currentInsertData = _this.insertData[fieldId].options;
        var index = currentInsertData.findIndex(function (element) {
          if (_typeof(element) === 'object') {
            return element.id === option.id;
          } else {
            return element === option;
          }
        }); // do nothing if value is already in list

        if (index !== -1) return;

        _this.insertData[fieldId].options.push(option);

        _this.insertData[fieldId].value = ''; // otherwise, it's just a singular value for that field
      } else {
        _this.insertData[fieldId] = option;
      }

      _this.handleFieldError(false, fieldId);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFieldError", function (error, fieldId) {
      var _this$state2 = _this.state,
          fieldIndex = _this$state2.fieldIndex,
          fieldsWithError = _this$state2.fieldsWithError,
          steps = _this$state2.steps;
      var newFieldsWithError = Object.assign({}, fieldsWithError);
      var newSteps = steps.slice();

      if (error) {
        newFieldsWithError[fieldId] = true;
        newSteps[fieldIndex].error = true; // if old error is no longer valid, delete it
      } else if (newFieldsWithError[fieldId]) {
        delete newFieldsWithError[fieldId];
        newSteps[fieldIndex].error = false;
      }

      _this.setState({
        fieldsWithError: newFieldsWithError,
        steps: newSteps
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeSelectedOption", function (selectedOption) {
      var fieldId = _this.getField().id;

      var options = _this.insertData[fieldId].options;
      var newOptions;

      if (_typeof(selectedOption) === 'object') {
        newOptions = options.filter(function (option) {
          return option.id !== selectedOption.id;
        });
      } else {
        newOptions = options.filter(function (option) {
          return option !== selectedOption;
        });
      }

      var error = _this.getField().required && newOptions.length === 0;
      _this.insertData[fieldId].options = newOptions;

      _this.handleFieldError(error, fieldId);
    });

    _defineProperty(_assertThisInitialized(_this), "_onSubmit", function () {
      if (Object.keys(_this.state.fieldsWithError).length > 0) {
        return;
      }

      if (typeof _this.props.onSubmit === 'function') {
        var data = Object.keys(_this.insertData).reduce(function (acc, val) {
          if (_typeof(_this.insertData[val]) === 'object' && _this.insertData[val].options) {
            acc[val] = _this.insertData[val].options;
          } else {
            acc[val] = _this.insertData[val];
          }

          return acc;
        }, {});

        _this.props.onSubmit(data);
      }

      if (_this.props.resetForm) {
        _this.resetForm();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleGoingRight", function () {
      var _this$state3 = _this.state,
          fieldIndex = _this$state3.fieldIndex,
          formModel = _this$state3.formModel; // reached end of form

      if (fieldIndex + 1 > formModel.length) return; // else move forward in form

      if (fieldIndex + 1 < formModel.length) {
        var newIndex = fieldIndex + 1;

        _this.setState({
          fieldIndex: newIndex,
          currentInputLabel: formModel[newIndex].category
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleGoingLeft", function () {
      var _this$state4 = _this.state,
          formModel = _this$state4.formModel,
          fieldIndex = _this$state4.fieldIndex;
      var newIndex = fieldIndex - 1;
      if (newIndex < 0) return;

      _this.setState({
        currentInputLabel: formModel[newIndex].category,
        fieldIndex: newIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDisable", function () {
      if (typeof _this.props.onDisable === 'function') {
        _this.props.onDisable();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onStepperClick", function (index) {
      var _this$state5 = _this.state,
          formModel = _this$state5.formModel,
          fieldIndex = _this$state5.fieldIndex;
      if (fieldIndex === index) return;

      _this.setState({
        currentInputLabel: formModel[index].category,
        fieldIndex: index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectedOptions", function () {
      // ignore if not a list of collected values
      if (!_this.isFieldTokenized()) return;

      var fieldId = _this.getField().id;

      var options = _this.insertData[fieldId].options || [];
      return options.map(function (option, i) {
        return React__default.createElement(SelectedOption, {
          key: i,
          onClick: _this.removeSelectedOption,
          option: option
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "validateField", function (value, name) {
      var fieldId = _this.getField().id;

      return _this.isFieldTokenized() && _this.insertData[fieldId].options.length === 0 && _this.getField().required;
    });

    _this.insertData = {}; // @currentInputLabel: the current input label viewable by the user
    // @fieldIndex: index of the current form field that is active
    // @fieldsWithError: keeps track of errors in each field,
    // 	true if there is an error; false otherwise
    // @formModel: describes how the form should display
    // @steps: list of objects where each object describes a step
    // 	in the stepper

    _this.state = {
      currentInputLabel: '',
      fieldIndex: 0,
      fieldsWithError: {},
      formModel: [],
      steps: []
    };
    return _this;
  }

  _createClass(InsertForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var formFields = this.props.formFields;

      if (Array.isArray(formFields) && formFields.length > 0) {
        this.initializeInsertForm();
      }

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "resetForm",
    // resets a form to original state
    value: function resetForm() {
      var _this2 = this;

      var formModel = this.state.formModel;
      var newIndex = 0;
      var initInsertData = Object.assign({}, this.props.initInsertData);
      this.insertData = {}; // handle any initial data passed in for collections/tokens

      formModel.forEach(function (field) {
        if ((field.collection || field.tokenize) && initInsertData[field.id]) {
          _this2.insertData[field.id] = {
            options: [],
            value: initInsertData[field.id]
          };
          delete initInsertData[field.id];
        }
      }); // initial data passed in to load into the form

      this.insertData = Object.assign({}, this.insertData, initInsertData);
      this.setState({
        fieldIndex: newIndex,
        currentInputLabel: this.state.formModel[newIndex].category
      });
    } // handles going right for fields to be inserted

  }, {
    key: "render",
    value: function render() {
      if (this.state.formModel.length === 0) {
        return null;
      }

      var _this$state6 = this.state,
          currentInputLabel = _this$state6.currentInputLabel,
          fieldIndex = _this$state6.fieldIndex,
          fieldsWithError = _this$state6.fieldsWithError,
          steps = _this$state6.steps;
      var canGoLeft = fieldIndex > 0;
      var canGoRight = fieldIndex + 1 < this.state.formModel.length;
      var fieldId = this.getField().id;
      var fieldValue = this.insertData[fieldId];

      if (this.isFieldTokenized()) {
        fieldValue = this.insertData[fieldId].value;
      }

      return React__default.createElement(Portal, null, React__default.createElement("div", {
        className: "insert-popup-overlay"
      }, React__default.createElement("div", {
        className: "insert-popup-container"
      }, React__default.createElement("div", {
        className: "close-form"
      }, React__default.createElement("i", {
        className: "fa fa-2x fa-times apm-cursor-p apm-color-red",
        "data-testid": "disable-form",
        onClick: this.onDisable
      })), React__default.createElement("div", {
        className: "selected-options"
      }, this.renderSelectedOptions()), React__default.createElement("div", {
        className: "layout"
      }, React__default.createElement("div", {
        className: "form"
      }, React__default.createElement(Label, {
        label: currentInputLabel,
        required: this.getField().required
      }), React__default.createElement(Field, {
        canGoLeft: canGoLeft,
        canGoRight: canGoRight,
        canSubmit: !canGoRight && Object.keys(fieldsWithError).length === 0,
        handleGoingLeft: this.handleGoingLeft,
        handleGoingRight: this.handleGoingRight,
        InputComponent: this.getField().InputComponent,
        value: fieldValue,
        _onSubmit: this._onSubmit
      })), React__default.createElement("div", {
        className: "insert-popup-stepper"
      }, React__default.createElement(Stepper, {
        activeStep: fieldIndex,
        onClick: this.onStepperClick,
        steps: steps
      }))))));
    }
  }]);

  return InsertForm;
}(React.Component);

_defineProperty(InsertForm, "propTypes", {
  formFields: PropTypes.arrayOf(PropTypes.shape({
    asyncFilter: PropTypes.string,
    category: PropTypes.string,
    collection: PropTypes.bool,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
    tokenize: PropTypes.bool,
    type: PropTypes.string
  })).isRequired,
  initInsertData: PropTypes.object,
  onDisable: PropTypes.func,
  onSubmit: PropTypes.func
});

_defineProperty(InsertForm, "defaultProps", {
  formFields: [],
  initInsertData: {},
  onDisable: null,
  onSubmit: null,
  resetForm: false
});

module.exports = InsertForm;
