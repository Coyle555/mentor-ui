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
		isUtc: PropTypes.bool,
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
		isUtc: false,
		name: '',
		onBlur: null,
		onChange: null,
		required: false,
		type: 'datetime',
		value: ''
	}

	constructor(props) {
		super(props);

		const { isUtc, required, type, value } = this.props;

		const isValid = isValidDate(value, moment.ISO_8601);
		let initValue = null;

		if (isValid) {
			initValue = isUtc
				? moment.utc(value).local().toDate()
				: moment(value, moment.ISO_8601).toDate();
		}

		this.lastVal = isValid
			? moment(initValue).format(getDateFormat(type))
			: null;

		// @hasError(bool) - if there is an error with the users selected date
		// @inputValue(string) - current value in the input field
		this.state = {
			hasError: !!required & !isValid,
			inputValue: initValue
		};
	}

	componentDidUpdate(prevProps) {
		// new date passed down
		if (this.props.value !== prevProps.value) {
			const isValid = isValidDate(this.props.value, moment.ISO_8601);
			let inputValue = null;

			if (isValid) {
				inputValue = this.props.isUtc
					? moment.utc(this.props.value).local().toDate()
					: moment(this.props.value, moment.ISO_8601).toDate();
			}

			this.lastVal = isValid
				? moment(inputValue).format(getDateFormat(this.props.type))
				: null;

			this.setState({
				hasError: !!this.props.required && !isValid,
				inputValue
			});
		}
	}

	// when user selects a date or time on the datetime picker
	handleChange = (value) => {
		const { name, onChange, required } = this.props;

		this.setState({
			hasError: !!required && !value,
			inputValue: !!value ? value : ''
		}, () => {
			if (typeof onChange === 'function') {
				onChange(this.state.hasError, value, name);
			};
		});
	}

	handleBlur = ({ target: { value } }) => {
		const { name, onBlur, type } = this.props;
		const { hasError } = this.state;

		if (typeof onBlur === 'function' && this.lastVal !== value) {
			const mask = getDateFormat(type);
			const isoDate = moment(value, mask).toDate();

			onBlur(hasError, isoDate, name);
			this.lastVal = value;
		}
	}

	render() {
		const { 
			className,
			error,
			name,
			onBlur,
			onChange,
			required,
			type,
			value,
			...props
		} = this.props;
		const { hasError, inputValue } = this.state;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError || error
		});

		return (
			<DatePicker
				className={inputClasses}
				dateFormat={getDateFormatForPicker(type)}
				fixedHeight
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				openToDate={inputValue}
				placeholderText={getPlaceholder(type)}
				popperClassName="mui-datepicker-popper"
				popperModifiers={{
					preventOverflow: {
						enabled: true,
						escapeWithReference: false,
						boundariesElement: 'viewport'
					}
				}}
				selected={inputValue}
				shouldCloseOnSelect={false}
				showTimeSelect={type === 'datetime'}
				timeIntervals={15}
				{...props}
			/>
		);
	}
}

export default DatePickerInput;
