import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { keyEvent as KeyEvent } from 'utils';
import {
	getDateFormat,
	getDateFormatForPicker,
	getPlaceholder,
	isValidDate
} from './utils/utils';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.less';

class DatePickerInput extends Component {

	static propTypes = {
		className: PropTypes.string,
		disabled: PropTypes.bool,
		error: PropTypes.bool,
		name: PropTypes.string,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
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
		error: false,
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
			? moment(value, moment.ISO_8601).toDate()
			: '';

		this.lastVal = initValue;

		// @hasError(bool) - if there is an error with the users selected date
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
		const { name, onChange, required } = this.props;
		console.log('value on change', value);

		this.setState({
			hasError: !!required && !value,
			value: !!value ? value : ''
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, value, name);
			};
		});
	}

	handleBlur = ({ target: { value } }) => {
		const date = new Date(value);
		console.log('date on blur', date);
	}

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

	render() {
		const { 
			className,
			disabled,
			error,
			name,
			onBlur,
			onChange,
			required,
			type,
			value,
			...props
		} = this.props;
		const { hasError, value } = this.state;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError || error
		});

		return (
			<DatePicker
				className={inputClasses}
				dateFormat={getDateFormatForPicker(type)}
				disabled={disabled}
				fixedHeight
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				openToDate={value}
				placeholderText={getPlaceholder(type)}
				selected={value}
				shouldCloseOnSelect={false}
				showTimeSelect={type === 'datetime'}
				timeIntervals={15}
				{...props}
			/>
		);
	}
}

export default DatePickerInput;
