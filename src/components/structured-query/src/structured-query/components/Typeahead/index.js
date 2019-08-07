import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import classNames from 'classnames';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';

import { TypeaheadSelector } from './Selector';
import { DatePicker } from './Datepicker';
import { keyEvent } from 'utils';

// Typeahead an auto-completion text input
//
// Renders a text input that shows options nearby that you can
// use the keyboard or mouse to select.
export class TypeaheadClass extends Component {

	static propTypes = {
		addTokenForValue: PropTypes.func,
		customClasses: PropTypes.object,
		datatype: PropTypes.string,
		disabled: PropTypes.bool,
		header: PropTypes.string,
		onKeyDown: PropTypes.func,
		options: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.func
		])
	}

	static defaultProps = {
		addTokenForValue: null,
		customClasses: {},
		datatype: 'text',
		disabled: false,
		header: 'Field',
		onKeyDown: null,
		options: []
	}

	constructor(props) {
		super(props);

		// @focused: form is focused by user
		// @visible: currently visible set of options
		// @selectedOptionIndex: index of the option the user
		// 	currently has selected
		// @value: current value used to filter options
		this.state = {
			focused: false,
			selectedOptionIndex: -1,
			visible: [],
			value: ''
		};
	}

	// since fetching options could require a network call, get the options
	// in component did mount lifecycle
	componentDidMount() {
		this.getOptions(this.props.options);
	}

	componentWillReceiveProps(nextProps) {
		if (!!nextProps.options && this.props.options !== nextProps.options) {
			this.getOptions(nextProps.options);
		}
	}

	getOptions = (options) => {
		if (!options || (!Array.isArray(options) && typeof options !== 'function')) {
			return;
		}

		new Promise((resolve, reject) => {
			if (typeof options === 'function') {
				resolve(options(''));
			} else {
				resolve(options);
			}
		}).then(visibleOptions => {
			this.setState({ visible: visibleOptions });
		});
	}

	// Update the value when using a calendar popup
	updateDateValue = (newValue) => {
		this.setState({ value: newValue });
	}

	// When a user selects an option in the current list, we need 
	// to refocus the user to the input, update the value in the input,
	// and get the next list of options
	_onOptionSelected = (option) => {
		// need to refocus on input box after selection
		this.inputRef.focus();

		// convert datetimes when user hits enter on value
		if (this.props.datatype === 'datetime') {
			option = moment(option).toISOString();
		}

		this.loadingOptions = false;

		this.setState({
			selectedOptionIndex: -1,
			value: '',
			visible: []
		});

		if (typeof this.props.addTokenForValue === 'function') {
			this.props.addTokenForValue(option);
		}
	}

	// As the user enters keystrokes fuzzy match against current options
	_onTextEntryUpdated = (event) => {
		let value = event.target.value;

		new Promise((resolve, reject) => {
			resolve(this.getOptionsForValue(value, this.props.options))
		}).then(options => {
			this.loadingOptions = false;

			this.setState({
				selectedOptionIndex: -1,
				value,
				visible: options
			});
		});
	}

	// Updates the available options as the user inputs keystrokes
	getOptionsForValue(value, options) {
		this.loadingOptions = true;

		return new Promise((resolve, reject) => {
			if (typeof this.props.options === 'function') {
				resolve(this.props.options(value));
			} else {
				resolve(fuzzy.filter(value, options).map(res => res.original));
			}
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
			//case keyEvent.DOM_VK_TAB:
				//return this._onTab;
			default:
				return null;
		}
	}

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

		const { selectedOptionIndex, visible } = this.state;

		if (selectedOptionIndex >= 0) {
			this._onOptionSelected(visible[selectedOptionIndex]);
		} else if (this.state.visible.length > 0) {
			this._onOptionSelected(visible[0]);
		}
	}

	// Handle key events as user enters input
	// @event: key pressed by user
	_onKeyDown = (event) => {
		const { onKeyDown } = this.props;
		const { value, visible } = this.state;

		let handler = this.eventMap(event);

		// handle value completion if there are no options
		if ((event.keyCode === keyEvent.DOM_VK_RETURN
			|| event.keyCode === keyEvent.DOM_VK_ENTER)
			&& this.props.options.length === 0
			&& !!this.state.value) {
			
			this._onOptionSelected(this.state.value);
			return;
		}

		// if there are no visible elements, don't perform selected
		// navigation or autocompletion
		if (!handler || visible.length === 0) {
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
		// no visible options to move to
		if (!this.state.visible.length) {
			return;
		}

		let newIndex = this.state.selectedOptionIndex + delta;

		// wrap around to end or start if user goes past start 
		// or end of list
		if (newIndex < 0) {
			newIndex = this.state.visible.length - 1;
		} else if (newIndex >= this.state.visible.length) {
			newIndex -= this.state.visible.length;
		}

		let newSelection = this.state.visible[newIndex];
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
		if (this.props.disabled) return;

		this.inputRef.focus();
		this.setState({ focused: true });
	}

	handleClickOutside = (event) => {
		this.setState({
			focused: false,
			selectedOptionIndex: -1
		});
	}

	handleDatepickerClose = (event) => {
		event.stopPropagation();
		this.setState({ focused: false });
	}

	clearDatepickerInput = () => {
		this.setState({ value: '' });
	}

	saveDatepickerValue = () => {
		this.props.addTokenForValue(this.state.value);
		this.setState({ value: '' });
	}

	// This will show the user the header of the category and the
	// options depending on the category of the search he is in and 
	// what he has entered
	_renderIncrementalSearchResults() {
		if (!this.state.focused) {
			return null;
		}

		// handle special case for date time querying
		if (this.props.datatype === 'datetime' || this.props.datatype === 'date') {
			return (
				<DatePicker
					clearInput={this.clearDatepickerInput}
					handleClose={this.handleDatepickerClose}
					onOptionSelected={this._onOptionSelected}
					saveDate={this.saveDatepickerValue}
					updateDateValue={this.updateDateValue}
				/>
		       );
		}

		// there are no typeahead/autocomplete suggestions, 
		// so render nothing
		if (!this.state.visible.length) {
			return null;
		}

		return (
			<TypeaheadSelector
				customClasses={this.props.customClasses}
				options={this.state.visible}
				header={this.props.header}
				onOptionSelected={this._onOptionSelected}
				selectedOptionIndex={this.state.selectedOptionIndex}
			/>
		);
	}

	render() {
		const { category, customClasses, disabled, operator } = this.props;

		let inputClassList = classNames({
			[customClasses.input]: !!customClasses.input
		});

		return (
			<div
				className="filter-input-group"
				onClick={this._focusTypeahead}
			>
				<div className="filter-category">
					{category}
				</div>
				<div className="filter-operator">
					{operator}
				</div>
				<div className="typeahead">
					<input
						className={inputClassList}
						disabled={disabled}
						onChange={this._onTextEntryUpdated}
						onKeyDown={this._onKeyDown}
						ref={ref => this.inputRef = ref}
						type="text"
						value={this.state.value}
					/>
					{this._renderIncrementalSearchResults()}
				</div>
			</div>
	       );
	}
}

export const Typeahead = onClickOutside(TypeaheadClass);
