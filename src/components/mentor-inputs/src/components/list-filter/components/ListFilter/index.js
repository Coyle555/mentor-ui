import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import fuzzy from 'fuzzy';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';

import { Spinner } from '../Spinner';
import { ListFilterItem } from '../ListFilterItem';
import KeyEvent from './keyEvents';

// keycodes to handle for matching against the list
const AUTOCOMPLETE_KEYS = {
	//[KeyEvent.DOM_VK_TAB]: true,
	[KeyEvent.DOM_VK_RETURN]: true,
	[KeyEvent.DOM_VK_ENTER]: true
};

// keycodes for going up and down the list
const NAVIGATION_KEYS = {
	[KeyEvent.DOM_VK_UP]: true,
	[KeyEvent.DOM_VK_DOWN] : true
};

// list filter takes a list of options and filters them as the user types
export class ListFilterComponent extends Component {

	static propTypes = {
		autoFocus: PropTypes.bool,
		className: PropTypes.string,
		CustomListItem: PropTypes.func,
		disabled: PropTypes.bool,
		filter: PropTypes.func,
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
	}

	static defaultProps = {
		autoFocus: false,
		className: '',
		CustomListItem: null,
		disabled: false,
		filter: null,
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
	}

	constructor(props) {
		super(props);

		const { required, value } = this.props;

		this.lastMatchedVal = '';

		// @focused: true when the input box is focused; false otherwise
		// @hasError: true when the list filter has an error due to a 
		// 	mismatch or no value and it is required
		// @loadingFilter: true when loading in new options from a 
		// 	custom filter; false otherwise
		// @options: list of current options displayed to the user
		// @selectedOptionIndex: current option selected by the user
		// 	using the arrow keys
		// @value: current value in the input box
		this.state = {
			focused: !!this.props.autoFocus,
			hasError: false,
			loadingFilter: false,
			options: this.props.options,
			selectedOptionIndex: -1,
			value
		};
	}

	componentDidMount() {
		const { filter, name, onMatch, options, required } = this.props;

		let value = this.state.value;
		let newOptions = options;

		if (typeof filter === 'function') {
			this.customFilterMatches(value);
			return;
		}

		// initialize options list if given an initial value
		if (!!value) {
			newOptions = this.filterMatches(value, options);
		}

		const hasError = this.checkForError(value, options, required);

		if (!hasError) {
			this.lastMatchedVal = value;
		}

		this.setState({
			hasError: this.checkForError(value, newOptions, required),
			options: newOptions,
			value
		});
	}

	componentWillReceiveProps(nextProps) {
		// if new value passed in, refilter list and check for error
		if (!!nextProps.value && this.state.value !== nextProps.value) {
			const { filter, name, required } = this.props;

			let options = this.props.options;
			let value = nextProps.value;
			
			if (typeof filter === 'function') {
				this.setState({ value }, () => {
					this.customFilterMatches(value);
				});

				return;
			}

			// new list of options passed in with value
			if (nextProps.options.length > 0 && this.props.options !== nextProps.options) {
				options = nextProps.options
			}

			if (!!value) {
				options = this.filterMatches(value, options);
			}

			const hasError = this.checkForError(value, options, required);

			if (!hasError) {
				this.lastMatchedVal = value;
			}

			this.setState({
				hasError,
				options,
				value
			});
		// new list of options were passed in
		} else if (this.props.options !== nextProps.options && !this.props.filter) {
			const { required } = this.props;
			const { value } = this.state;
			const newOptions = this.filterMatches(value, nextProps.options);
			const hasError = this.checkForError(value, newOptions, required);

			if (!hasError) {
				this.lastMatchedVal = value;
			}
			
			this.setState({
				hasError,
				options: newOptions
			});
		}
	}

	checkForError = (value, options = [], required) => {
		const { name, matchOnEmpty, validation } = this.props;

		let hasError = !value && !!required;
		const validInput = options.find(option => option === value);

		if (!hasError && !!value && !validInput) {
			hasError = true;
		} else if (!hasError && typeof validation === 'function') {
			hasError = validation(value, name, options);
		}

		return hasError;
	}

	onFocus = (event) => {
		if (typeof this.props.filter === 'function') {
			this.customFilterMatches(this.state.value);
		}

		this.setState({
			focused: true
		}, () => {
			if (typeof this.props.onFocus === 'function') {
				this.props.onFocus(event);
			}
		});
	}

	handleClickOutside = () => {
		this.setState({
			focused: false,
			selectedOptionIndex: -1
		});
	}

	// return a list of filtered matches against user input
	// @value(string|object) - the users selected or typed option
	// @options([string]|[object]) - list of options to filter against
	// @return - returns the new list of options available
	// 	can be a list of strings or objects
	filterMatches = (value, options = []) => {
		const newOptions = fuzzy.filter(value, options); 

		return newOptions.map(option => option.original);
	}

	// @value(string): value to filter against
	customFilterMatches = (value) => {
		this.setState({
			loadingFilter: true,
			value
		}, () => {
			new Promise((resolve, reject) => {
				resolve(this.props.filter(value));
			}).then(newOptions => {
				this.loadfilterOptions(value, newOptions);
			});
		});
	}

	loadfilterOptions = (value, newOptions) => {
		const { name, matchOnEmpty, onChange, onMatch, required } = this.props;

		this.setState({
			hasError: this.checkForError(value, newOptions, required),
			loadingFilter: false,
			options: newOptions,
			selectedOptionIndex: -1,
			value
		}, () => {
			// fire onMatch if the value matches an option in the list
			if (!!value
				&& typeof onMatch === 'function'
				&& !this.state.hasError
				&& value !== this.lastMatchedVal) {

				onMatch(value, name);
				this.lastMatchedVal = value;

			} else if (!value
				&& matchOnEmpty
				&& !this.state.hasError
				&& this.lastMatchedVal !== '') {

				onMatch('', name);
				this.lastMatchedVal = '';
			} else if (typeof onChange === 'function') {
				onChange(this.state.hasError, value, name);
			}
		});
	}

	// if the user hits a valid keycode, fill out the input 
	// or move up and down the list
	onKeyDown = (event) => {
		if (!this.state.focused) {
			return;
		}

		// autofill from first option in the list if its available
		if (AUTOCOMPLETE_KEYS[event.keyCode]) {
			event.preventDefault();
			event.stopPropagation();
			this.autoCompleteKeyDown();
		// navigate highlighted option up or down
		} else if (NAVIGATION_KEYS[event.keyCode]) {
			event.stopPropagation();
			this.navigationKeyDown(event.keyCode);
		// escape closes options
		} else if (this.state.focused
			&& (event.keyCode === KeyEvent.DOM_VK_ESCAPE
				|| event.keyCode === KeyEvent.DOM_VK_TAB)) {

			this.setState({ focused: false });
		}
	}

	onKeyUp = (event) => {
		if (AUTOCOMPLETE_KEYS[event.keyCode]
			|| NAVIGATION_KEYS[event.keyCode]) {

			event.stopPropagation();
		}
	}

	// auto complete fires when enter is hit; will always be a valid input
	autoCompleteKeyDown = () => {
		const { filter, onChange, onMatch, name } = this.props;
		const { options, selectedOptionIndex } = this.state;

		let option;

		// grab appropriate option from the list if it exists
		if (selectedOptionIndex > -1) {
			option = options[selectedOptionIndex];
		} else if (options.length > 0) {
			option = options[0];
		} else {
			// do nothing
			return;
		}

		if (typeof filter === 'function') {
			this.setState({ value: option }, () => {
				this.customFilterMatches(option);
			});

			return;
		}

		const newOptions = this.filterMatches(option, this.props.options);

		this.setState({
			focused: false,
			hasError: false,
			options: newOptions,
			selectedOptionIndex: -1,
			value: option
		}, () => {
			if (typeof onMatch === 'function' && this.lastMatchedVal !== option) {
				onMatch(option, name);
				this.lastMatchedVal = option;
			}
		});
	}

	navigationKeyDown = (keyCode) => {
		const { options, selectedOptionIndex } = this.state;
		let newIndex;

		if (keyCode === KeyEvent.DOM_VK_DOWN) {
			newIndex = (selectedOptionIndex + 1) % options.length;
		} else {
			newIndex = selectedOptionIndex < 0
				? (options.length + selectedOptionIndex) % options.length
				: (options.length + selectedOptionIndex - 1) % options.length;
		}

		this.setState({ selectedOptionIndex: newIndex });
	}

	// handle a change in the input
	onChange = (event) => {
		const {
			filter, 
			matchOnEmpty,
			name,
			onChange,
			onMatch,
			options,
			required
		} = this.props;

		const value = event.target.value;

		if (typeof filter === 'function') {
			this.setState({ value }, () => {
				this.customFilterMatches(value);
			});

			return;
		}

		const newOptions = !value
			? options
			: this.filterMatches(value, options);

		this.setState({
			hasError: this.checkForError(value, newOptions, required),
			options: newOptions,
			selectedOptionIndex: -1,
			value
		}, () => {
			// fire onMatch if the value matches an option in the list or
			// if there is no value and its not required
			if (typeof onMatch === 'function'
				&& !this.state.hasError
				&& this.lastMatchedVal !== value) {

				onMatch(value, name);
				this.lastMatchedVal = value;

			// if input is empty and matches are triggered on empty matches
			} else if (!value
				&& matchOnEmpty
				&& !this.state.hasError
				&& this.lastMatchedVal !== '') {

				onMatch('', name);
				this.lastMatchedVal = '';
			// otherwise it was just a change event w/ no match
			} else if (typeof onChange === 'function') {
				onChange(this.state.hasError, value, name);
			}
		});
	}

	clearInput = () => {
		this.onChange({ target: { value: '' } });
		this.inputRef.focus();
	}

	// handle a user clicking an option in the list with the mouse
	// @selectedOption(string|object) - the option the user clicked on
	onListItemClick = (selectedOption) => {
		const { filter, name, onMatch, options } = this.props;

		if (typeof filter === 'function') {
			this.setState({ value: selectedOption }, () => {
				this.customFilterMatches(selectedOption);
			});

			return;
		}

		this.setState({
			hasError: false,
			options: this.filterMatches(selectedOption, options),
			selectedOptionIndex: -1,
			value: selectedOption
		}, () => {
			if (typeof onMatch === 'function' && this.lastMatchedVal !== selectedOption) {
				onMatch(selectedOption, name);
				this.lastMatchedVal = selectedOption;
			}
		});
	}

	onListItemMouseOver = (index) => {
		this.setState({ selectedOptionIndex: index });
	}

	renderIncrementalSearchResults = () => {
		if (!this.state.focused) {
			return null;
		}

		const { listClasses, listStyle, portalRef } = this.props;
		const { options, selectedOptionIndex } = this.state;

		const listContainerClasses = classNames(
			'apm-list-filter-menu-ul',
			{ [listClasses.container]: !!listClasses.container },
			'ignore-react-onclickoutside'
		);

		const listContainer = (
			<ul
				className={listContainerClasses}
				style={listStyle.container}
			>
				{ Array.isArray(options) && options.length > 0
					? options.map((option, i) => (
						<ListFilterItem
							CustomListItem={this.props.CustomListItem}
							index={i}
							key={i}
							listClasses={listClasses}
							onClick={this.onListItemClick}
							onMouseOver={this.onListItemMouseOver}
							option={option}
							selected={selectedOptionIndex === i}
							style={listStyle.item}
						/>
					))
					: null
				}
			</ul>
		);

		if (!!portalRef) {
			return createPortal(listContainer, portalRef);
		}

		return listContainer;
	}

	render() {
		const { 
			CustomListItem,
			disabled,
			disableOnClickOutside,
			enableOnClickOutside,
			eventTypes,
			filter,
			listClasses,
			listStyle,
			matchOnEmpty,
			name,
			onMatch,
			options,
			outsideClickIgnoreClass,
			portalRef,
			preventDefault,
			required,
			stopPropagation,
			validation,
			...props
		} = this.props;
		const { hasError, loadingFilter, value } = this.state;

		const inputClasses = classNames({
			'apm-mi-form-control apm-mi-list-filter': true,
			[this.props.className]: !!this.props.className,
			'apm-error-border-color': hasError
		});

		return (
			<div className="apm-mi-container">
				<input
					{...props}
					autoComplete="off"
					className={inputClasses}
					disabled={disabled}
					onChange={this.onChange}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					onKeyUp={this.onKeyUp}
					ref={ref => this.inputRef = ref}
					type="text"
					value={value}
				/>
				{ this.renderIncrementalSearchResults() }
				{ loadingFilter &&
					<span className="apm-mi-clear-input">
						<Spinner className="apm-color-black" />
					</span>
				}
				{ !!value && !loadingFilter && !disabled &&
					<span
						className="apm-mi-clear-input"
						onClick={this.clearInput}
					>
						<i className="fa fa-times" />
					</span>
				}
			</div>
		);
	}
}

export const ListFilter = onClickOutside(ListFilterComponent);
