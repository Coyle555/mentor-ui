import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { keyEvent as KeyEvent } from 'utils';
import { getDateFormat, getPlaceholder, isValidDate } from './utils/utils';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.less';

class DatePickerContainer extends Component {

	static propTypes = {
		className: PropTypes.string,
		disabled: PropTypes.bool,
		error: PropTypes.bool,
		maxDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date)
		]),
		minDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date)
		]),
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
		type: PropTypes.oneOf(['date', 'datetime']).isRequired,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date)
		])
	}

	static defaultProps = {
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
			container: {},
		},
		name: '',
		onBlur: null,
		onChange: null,
		required: false,
		type: 'datetime',
		value: ''
	}

	constructor(props) {
		super(props);

		const { required, type, value } = this.props;

		const mask = getDateFormat(type);
		const isValid = isValidDate(value, moment.ISO_8601);
		const initValue = isValid
			? moment(value, moment.ISO_8601).format(mask)
			: '';

		this.lastVal = initValue;

		// @hasError(bool) - if there is an error with the users
		// 	selected date
		// @value(string) - current value in the input field
		this.state = {
			hasError: !!required & !isValid,
			value: initValue
		};

	}

	componentDidUpdate(prevProps) {
		const { type } = this.props;

		if (!!this.props.value
			&& new moment(this.state.value, getDateFormat(type)).toISOString() !== this.props.value.toString()) {

			let val = '';

			if (!!this.props.value) {
				val = this.props.value;
			}

			this.setState({
				hasError: !!this.props.required && !this.props.value,
				value: val
			});
		}
	}

	// when user selects a date or time on the datetime picker
	handleChange = (value) => {
		console.log('value on change', value);
		const { name, onChange, required, type } = this.props;

		// if user clears the input from the datepicker
		let hasError = !!required && !value;

		this.setState({
			hasError,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, this.convertValueToISOString(), name);
			};
		});
	};

	convertValueToISOString = () => {
		const { type } = this.props;
		const { value } = this.state;
		
		return new moment(value, DEFAULT_FORMAT_MASKS[type]).toISOString();
	}

	// clear the date from the input box
	clearInput = () => {
		const { name, onChange } = this.props;
		const value = '';
		const hasError = !!this.props.required;

		this.setState({
			hasError,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, this.convertValueToISOString(), name)
			}
		});
	}

	handleClose = () => {
		this.setState({ showPicker: false });
	}

	onKeyDown = (evt) => {
		if (evt.keyCode === KeyEvent.DOM_VK_TAB) {
			this.handleClose();
		}
	}

	render() {
		const { hasError, showPicker, value } = this.state;
		const { className, disabled, error, name, type } = this.props;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError
		});

		const CustomInput = ({ value }) => (
			<input
				data-testid={'datepicker-input-' + name}
				className={inputClasses}
				disabled={disabled}
				placeholder={getPlaceholder(type)}
				type="text"
				value={value}
			/>
		);

		return (
			<DatePicker
				fixedHeight
				onChange={this.handleChange}
				selected={new Date()}
			/>
		);
	}
}

export default DatePickerContainer;
