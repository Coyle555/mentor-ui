import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import classNames from 'classnames';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import DatePicker from 'react-datepicker';

import { TypeaheadSelector } from './Selector';
import { keyEvent } from 'utils';

const DATE_FORMATS = {
	datetime: 'MMM dd, yyyy, h:mm a',
	date: 'MMM dd, yyyy'
};

// Typeahead an auto-completion text input
//
// Renders a text input that shows options nearby that you can
// use the keyboard or mouse to select.
export class TypeaheadComponent extends Component {

	static propTypes = {
		addTokenForValue: PropTypes.func,
		customClasses: PropTypes.object,
		datatype: PropTypes.string,
		header: PropTypes.string,
		onKeyDown: PropTypes.func,
		operator: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.any),
	}

	static defaultProps = {
		addTokenForValue: null,
		customClasses: {},
		datatype: 'text',
		header: 'Field',
		onKeyDown: null,
		options: [],
	}

	constructor(props) {
		super(props);

		// @focused: form is focused by user
		// @visibleOptions: currently visible set of options
		// @selectedOptionIndex: index of the option the user
		// 	currently has selected
		// @value: current value used to filter options
		this.state = {
			focused: false,
			selectedOptionIndex: -1,
			visibleOptions: [],
			value: ''
		};
	}

	// since fetching options could require a network call, get the options
	// in component did mount lifecycle
	componentDidMount() {
		this.getOptions(this.props.options);
	}

	componentDidUpdate(prevProps) {
		if (!!this.props.options && this.props.options !== prevProps.options) {
			this.getOptions(this.props.options);
		}

		if (this.state.focused && this.inputRef) {
			this.inputRef.focus();
		}
	}

	getOptions = (options) => {
		if (!options || !Array.isArray(options)) return;

		let visibleOptions = this.props.options.slice();

		this.setState({ visibleOptions });
	}

	// Update the value when using a calendar popup
	updateDateValue = (newValue) => {
		this.setState({ value: newValue });
	}

	// When a user selects an option in the current list, we need 
	// to refocus the user to the input, update the value in the input,
	// and get the next list of options
	_onOptionSelected = (option) => {
		const { addTokenForValue } = this.props;
		// need to refocus on input box after selection
		this.inputRef.focus();

		this.setState({
			selectedOptionIndex: -1,
			value: '',
			visibleOptions: []
		});

		addTokenForValue(option);
	}

	// As the user enters keystrokes fuzzy match against current options
	_onTextEntryUpdated = (event) => {
		const { options } = this.props;
		let value = event.target.value;

		if (options.length > 0) {
			this.updateVisibleOptions(value);
		} else {
			this.setState({ value });
		}
	}

	updateVisibleOptions = (value) => {
		const { options } = this.props;

		const visibleOptions = fuzzy
			.filter(value, options)
			.map(res => res.string);

		this.setState({
			selectedOptionIndex: -1,
			value,
			visibleOptions
		});
	}

	// Event mappings for keystrokes
	eventMap = (event) => {
		switch (event.keyCode) {
			case keyEvent.DOM_VK_UP:
				return this.navUp;
			case keyEvent.DOM_VK_DOWN:
				return this.navDown;
			case keyEvent.DOM_VK_RETURN:
			case keyEvent.DOM_VK_ENTER:
				return this._onEnter;
			case keyEvent.DOM_VK_ESCAPE:
				return this._onEscape;
			case keyEvent.DOM_VK_TAB:
				return this._onTab;
			default:
				return null;
		}
	}

	// Handle a tab event for autofill
	_onTab(event) {
		event.preventDefault();

		this.setState({ focused: false });
		this.inputRef.blur();

		// pass the first visible option in the list for tab 
		// completion if no selected option
		/*let option = this.state.selectedOptionIndex >= 0
			? this.state.visibleOptions[this.state.selectedOptionIndex]
			: this.state.visibleOptions[0];
	
		this._onOptionSelected(option);*/
	}

	// Handle an escape event for deselecting an option using arrow keys and
	// losing focus on input
	_onEscape() {
		this.setState({
			focused: false,
			selectedOptionIndex: -1
 		});

		this.inputRef.blur();
 	}


	// Handle an enter event that wasn't caught in this.onKeyDown()
	// pass either a selected option from arrow keys or pass the first
	// visible option in the list
	_onEnter(event) {
		if (this.loadingOptions) return;

		const { selectedOptionIndex, visibleOptions } = this.state;

		if (selectedOptionIndex >= 0) {
			this._onOptionSelected(visibleOptions[selectedOptionIndex]);
		} else if (visibleOptions.length > 0) {
			this._onOptionSelected(visibleOptions[0]);
		}
	}

	// Handle key events as user enters input
	// @event: key pressed by user
	_onKeyDown = (event) => {
		const { addTokenForValue, datatype, onKeyDown } = this.props;
		const { visibleOptions } = this.state;

		let handler = this.eventMap(event);
		let value = this.state.value;

		// handle value completion if there were no options passed in
		if ((event.keyCode === keyEvent.DOM_VK_RETURN || event.keyCode === keyEvent.DOM_VK_ENTER)
			&& this.props.options.length === 0
			&& !!this.state.value) {
			
			// convert date/datetimes when user hits enter on value
			if (datatype === 'date' || datatype === 'datetime') {
				value = moment(value).toISOString()
			}

			addTokenForValue(value);
			this.setState({ value: '' });

			return;
		}

		// if there are no visible elements, don't perform selected
		// navigation or autocompletion
		if (!handler || visibleOptions.length === 0) {
			if (typeof onKeyDown === 'function') {
				onKeyDown(event, value);
			}

			return;
		}

		// handle any special keystrokes
		handler.call(this, event);
		// don't propagate keystrokes back to DOM/browser
		event.preventDefault();
	}


	// Move the selected option up or down depending on keystroke
	// @delta: direction in which to move
	_nav(delta) {
		const { visibleOptions } = this.state;
		// no visible options to move to
		if (visibleOptions.length === 0) {
			return;
		}

		let newIndex = this.state.selectedOptionIndex + delta;

		// wrap around to end or start if user goes past start 
		// or end of list
		if (newIndex < 0) {
			newIndex = visibleOptions.length - 1;
		} else if (newIndex >= visibleOptions.length) {
			newIndex -= visibleOptions.length;
		}

		let newSelection = visibleOptions[newIndex];
		this.setState({ selectedOptionIndex: newIndex });
	}

	// Go down the options
	navDown() {
		this._nav(1);
	}

	// Go up the options
	navUp() {
		this._nav(-1);
	}

	_focusTypeahead = () => {
		if (this.state.focused) return;

		this.setState({ focused: true });
	}

	handleClickOutside = (event) => {
		this.setState({
			focused: false,
			selectedOptionIndex: -1
		});
	}

	handleDatePickerChange = (date) => {
		this.setState({ value: !!date ? date : '' });
	}

	renderDatePicker = () => {
		const { datatype } = this.props;

		return (
			<DatePicker
				autoFocus={this.state.focused}
				dateFormat={DATE_FORMATS[datatype]}
				onBlur={this.handleClickOutside}
				onChange={this.handleDatePickerChange}
				onFocus={this._focusTypeahead}
				onKeyDown={this._onKeyDown}
				selected={this.state.value}
				shouldCloseOnSelect={false}
				showTimeSelect={datatype === 'datetime'}
				timeIntervals={15}
			/>
		);
	}

	renderNormalInput = () => {
		const { customClasses } = this.props;

		const inputClassList = classNames({
			[customClasses.input]: !!customClasses.input
		});

		return (
			<>
				<input
					className={inputClassList}
					data-testid="typeahead"
					onChange={this._onTextEntryUpdated}
					onFocus={this._focusTypeahead}
					onKeyDown={this._onKeyDown}
					ref={ref => this.inputRef = ref}
					type="text"
					value={this.state.value}
				/>
				{ this.state.focused && this.state.visibleOptions.length > 0
					? <TypeaheadSelector
						customClasses={this.props.customClasses}
						options={this.state.visibleOptions}
						header={this.props.header}
						onOptionSelected={this._onOptionSelected}
						selectedOptionIndex={this.state.selectedOptionIndex}
					/>
					: null
				}
			</>
		);
	}

	render() {
		const { label, operator } = this.props;

		return (
			<div className="filter-input-group">
				<div className="filter-category">
					{label}
				</div>
				<div className="filter-operator">
					{operator}
				</div>
				<div className="typeahead">
					{ this.props.datatype !== 'datetime' && this.props.datatype !== 'date'
						? this.renderNormalInput()
						: this.renderDatePicker()
					}
				</div>
			</div>
	       );
	}
}

export const Typeahead = onClickOutside(TypeaheadComponent);
