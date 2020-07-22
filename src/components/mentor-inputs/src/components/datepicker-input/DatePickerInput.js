import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import {
	getDateFormat,
	getDateFormatForPicker,
	getPlaceholder,
	isValidDate,
	isValidDateOnInput
} from './utils/utils';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.less';

const KeyEvent = { DOM_VK_TAB: 9 };

const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;

class DatePickerInput extends Component {

	static propTypes = {
		className: PropTypes.string,
		convertToLocal: PropTypes.bool,
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
		convertToLocal: true,
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

		const { required, value } = this.props;

		const isValid = isValidDate(value, moment.ISO_8601);
		let initValue = '';

		if (isValid) {
			initValue = this.formatDate(value);
		}

		this.datePickerRef = React.createRef();

		// @hasError(bool) - if there is an error with the users selected date
		// @inputValue(string) - current value in the input field
		this.state = {
			hasError: (!!required && !initValue) || (!!initValue && !isValid),
			inputValue: initValue
		};
	}

	componentDidUpdate(prevProps) {
		// new date passed down
		if (this.props.value !== prevProps.value) {
			const isValid = isValidDate(this.props.value, moment.ISO_8601);
			let inputValue = '';

			if (isValid) {
				inputValue = this.formatDate(this.props.value);
			}

			this.setState({
				hasError: (!!this.props.required && !this.props.value) || (!!this.props.value && !isValid),
				inputValue
			});
		}
	}

	formatDate = (value) => {
		return this.props.convertToLocal
			? moment.utc(value).local().format()
			: moment.utc(value).format();
	}

	// handle when the user clicks on a date in the calendar
	handleChange = (value, event) => {
		// ignore change events caused by user input
		if (!!event && event.type === 'change') return;

		const { name, onChange } = this.props;

		this.setState({
			hasError: false,
			inputValue: value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(this.state.hasError, this.state.inputValue, name);
			}
		});
	}

	// change event indicates we are dealing with an event initiated by the user typing
	// into the input; otherwise it would be a click event which indicates the calendar
	// was clicked and a valid date was selected by the user
	handleChangeRaw = (event) => {
		const { name, onChange, required, type } = this.props;
		let inputValue = event.target.value;

		const isValid = isValidDate(inputValue, getDateFormat(type))
			&& isValidDateOnInput(moment(inputValue).format(getDateFormat(type)), type);

		const hasError = (!!required && !inputValue) || (!!inputValue && !isValid);

		if (isValid) {
			inputValue = moment(inputValue, getDateFormat(type)).toISOString();
		}

		this.setState({
			hasError,
			inputValue
		}, () => {
			if (typeof onChange === 'function') {
				onChange(this.state.hasError, this.state.inputValue, name);
			}
		});
	}

	// when blurring, if the input has an invalid date, the error and input need to
	// be checked if they have to be cleared
	handleBlur = (evt) => {
		const { name, onBlur, required, type } = this.props;

		let inputValue = evt.target.value;
		const isValid = isValidDate(inputValue, getDateFormat(type));

		// clear the input if invalid
		if (!isValid) {
			inputValue = '';
		} else {
			inputValue = moment(inputValue, getDateFormat(type)).toISOString();
		}

		this.setState({
			hasError: !!required && !inputValue,
			inputValue
		}, () => {
			if (typeof onBlur === 'function') {
				onBlur(this.state.hasError, this.state.inputValue, name);
			}
		});
	}

	onKeyDown = (evt) => {
		if (evt.keyCode === KeyEvent.DOM_VK_TAB || evt.which === KeyEvent.DOM_VK_TAB) {
			this.datePickerRef.setOpen(false);
		}
	}

	render() {
		/* eslint-disable no-unused-vars */
		const {
			className,
			convertToLocal,
			error,
			name,
			onBlur,
			onChange,
			required,
			type,
			value,
			...props
		} = this.props;
		/* eslint-enable no-unused-vars */
		const { hasError, inputValue } = this.state;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError || error
		});

		let dateVal;

		if (inputValue) {
			dateVal = new Date(inputValue);

			// shift time by timezone offset to get utc if there is no local conversion
			if (!convertToLocal) {
				dateVal.setTime(dateVal.getTime() + dateVal.getTimezoneOffset() * SEC_IN_MIN * MS_IN_SEC);
			}
		}

		const popperClasses = cn({
			'mui-datepicker-popper': true,
			'mui-datepicker-popper-datetime': type === 'datetime'
		});

		return (
			<DatePicker
				className={inputClasses}
				dateFormat={getDateFormatForPicker(type)}
				dayClassName={() => 'mui-datepicker-day'}
				fixedHeight
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onChangeRaw={this.handleChangeRaw}
				onKeyDown={this.onKeyDown}
				openToDate={!hasError ? dateVal : undefined}
				placeholderText={getPlaceholder(type)}
				popperClassName={popperClasses}
				popperModifiers={{
					preventOverflow: {
						enabled: true,
						escapeWithReference: false,
						boundariesElement: 'viewport'
					}
				}}
				ref={ref => this.datePickerRef = ref}
				selected={!hasError ? dateVal : undefined}
				showTimeSelect={type === 'datetime'}
				timeIntervals={15}
				{...props}
			/>
		);
	}
}

export default DatePickerInput;
