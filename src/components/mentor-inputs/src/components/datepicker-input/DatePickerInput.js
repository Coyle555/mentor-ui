import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import cn from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { keyEvent as KeyEvent } from 'utils';
import { getDateFormat, getPlaceholder, isValidDate } from './utils/utils';

import './styles.less';

class DatePickerContainer extends Component {

	constructor(props) {
		super(props);

		const { required, type, value } = this.props;
		const mask = getDateFormat(type);

		const isValid = moment(value).isValid();
		const firstMoment = isValid
			? new moment(value)
			: new moment(new Date());

		this.lastVal = firstMoment.format(mask);

		// @showPicker(bool) - if the date picker popup is open
		// @hasError(bool) - if there is an error with the users
		// 	selected date
		// @value(string) - current value in the input field
		this.state = {
			showPicker: this.props.autoFocus,
			hasError: !!required & !isValid,
			moment: firstMoment,
			value: !isValid ? '' : firstMoment.format(mask),
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

	handleClickOutside = () => {
		const { name, onBlur } = this.props;
		const { hasError, value } = this.state;

		if (!this.state.showPicker) return;

		this.setState({
			showPicker: false
		}, () => {
			if (typeof onBlur === 'function' && this.lastVal !== value) {
				onBlur(hasError, this.convertValueToISOString(), name);
				this.lastVal = value;
			}
		});
	}

	onFocus = () => {
		this.setState({ showPicker: true });
	}


	handleInputChange = evt => {
		const { name, onChange, required, type } = this.props;
		const mask = getDateFormat(type);

		const value = evt.target.value;
		const isValidValue = isValidDate(value, mask, type);
		const hasError = (value.length > 0 && !isValidValue) || (!value && !!required);

		if (isValidValue) {
			this.setState({ moment: new moment(value, mask) });
		}

		this.setState({
			hasError,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, this.convertValueToISOString(), name);
			}
		});
	}

	// when user selects a date or time on the datetime picker
	handleDateTimeChange = (value) => {
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

	renderPicker = () => {
		const { pickerStyle, portalRef } = this.props;

		const picker = (
			<div
				className="mui-mi-datepicker ignore-react-onclickoutside"
				ref={ref => this.pickerRef = ref}
				style={pickerStyle.container}
			>

				<DatePicker
					format={getDateFormat(this.props.type)}
					onCloseHandler={this.handleClose}
					onChange={this.handleDateTimeChange}
					onClearHandler={this.clearInput}
					maxDate={this.props.maxDate}
					minDate={this.props.minDate}
					maxHour={this.props.maxHour}
					minHour={this.props.minHour}
					maxMinute={this.props.maxMinute}
					minMinute={this.props.minMinute}
					moment={this.state.moment}
					type={this.props.type}
				/>
			</div>
		);

		return picker;
	}

	render() {
		const { hasError, showPicker, value } = this.state;
		const { className, disabled, error, name, type } = this.props;

		const inputClasses = cn({
			'mui-mi-input-field': true,
			[this.props.className]: !!this.props.className,
			'mui-mi-input-field-has-error': hasError
		});

		return (
			<div className="mui-mi-container">
				<input
					data-testid={'datepicker-input-' + name}
					className={inputClasses}
					disabled={disabled}
					onChange={this.handleInputChange}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					placeholder={getPlaceholder(type)}
					type="text"
					value={value}
				/>
			</div>
		);
	}
}

DatePickerContainer.propTypes = {
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
		container: {},
	},
	name: '',
	onBlur: null,
	onChange: null,
	required: false,
	type: 'datetime',
	value: ''
}

export default onClickOutside(DatePickerContainer);
