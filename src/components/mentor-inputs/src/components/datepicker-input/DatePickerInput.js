import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import {
	getDateFormat,
	getDateFormatForPicker,
	getPlaceholder,
	isValidDate
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

		const { convertToLocal, required, value } = this.props;

		const isValid = isValidDate(value, moment.ISO_8601);
		let initValue = null;

		if (isValid) {
			initValue = convertToLocal
				? moment.utc(value).local().format()
				: moment.utc(value).format();
		}

		this.datePickerRef = React.createRef();

		// @hasError(bool) - if there is an error with the users selected date
		// @inputValue(string) - current value in the input field
		this.state = {
			hasError: !!required && !isValid,
			inputValue: initValue
		};
	}

	componentDidUpdate(prevProps) {
		// new date passed down
		if (this.props.value !== prevProps.value) {
			const isValid = isValidDate(this.props.value, moment.ISO_8601);
			let inputValue = null;

			if (isValid) {
				inputValue = this.props.convertToLocal
					? moment.utc(this.props.value).local().format()
					: moment.utc(this.props.value).format();
			}

			this.setState({
				hasError: !!this.props.required && !isValid,
				inputValue
			});
		}
	}

	// when user selects a date or time on the datetime picker
	handleChange = (value) => {
		const { name, onChange, required } = this.props;
		const isValid = isValidDate(value, moment.ISO_8601);

		this.setState({
			hasError: (!!required && !value) || (!!value && !isValid),
			inputValue: value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(this.state.hasError, this.state.inputValue, name);
			};

			this.datePickerRef.setFocus(true);
		});
	}

	handleBlur = (evt) => {
		const { name, onBlur, required, type } = this.props;
		const { inputValue } = this.state;

		if (typeof onBlur === 'function') {
			onBlur(this.state.hasError, inputValue, name);
		}
	}

	onKeyDown = (evt) => {
		if (evt.keyCode === KeyEvent.DOM_VK_TAB || evt.which === KeyEvent.DOM_VK_TAB) {
			this.datePickerRef.setOpen(false);
			this.handleBlur();
		}
	}

	render() {
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
		const { hasError, inputValue } = this.state;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError || error
		});

		let dateVal;

		if (!!inputValue) {
			if (convertToLocal) {
				dateVal = new Date(inputValue);
			// shift time by timezone offset when creating a date object
			} else {
				const offset = new Date().getTimezoneOffset();
				dateVal = new Date(Date.parse(new Date(inputValue)) + (offset * SEC_IN_MIN * MS_IN_SEC));
			}
		}

		const popperClasses = cn(
			'mui-datepicker-popper',
			{ 'mui-datepicker-popper-datetime': type === 'datetime' }
		);

		return (
			<DatePicker
				className={inputClasses}
				dateFormat={getDateFormatForPicker(type)}
				fixedHeight
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onKeyDown={this.onKeyDown}
				openToDate={dateVal}
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
				selected={dateVal}
				shouldCloseOnSelect={false}
				showTimeSelect={type === 'datetime'}
				timeIntervals={15}
				{...props}
			/>
		);
	}
}

export default DatePickerInput;
