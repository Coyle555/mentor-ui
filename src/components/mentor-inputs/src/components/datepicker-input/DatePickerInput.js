import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import cn from 'classnames';
import moment from 'moment';

import { keyEvent as KeyEvent } from 'utils';
import { DatePicker } from 'datepicker';

// default format masks for different datepicker types
const DEFAULT_FORMAT_MASKS = {
	datetime: 'YYYY-MM-DD HH:mm',
	date: 'YYYY-MM-DD',
	time: 'HH:mm'
};

class DatePickerContainer extends Component {
	constructor(props) {
		super(props);

		const { required, value } = this.props;
		const mask = this.getDateFormat();

		const isValid = moment(value).isValid();
		const firstMoment = isValid
			? new moment(value, mask)
			: new moment(new Date(), mask)

		this.lastVal = firstMoment.format(mask);

		// @showPicker(bool) - if the date picker popup is open
		// @hasError(bool) - if there is an error with the users
		// 	selected date
		// @pickerEnabled - enabled if the datepicker can fit in the viewport;
		// 	otherwise the user enters the date directly
		// @value(string) - current value in the input field
		this.state = {
			showPicker: this.props.autoFocus,
			hasError: !!required & !isValid,
			pickerEnabled: true,
			moment: firstMoment,
			value: !isValid ? '' : firstMoment.format(mask),
		};

	}

	componentDidMount() {
		this.isPickerEnabled();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.value.toString() !== nextProps.value.toString()) {
			let val = '';

			if (!!nextProps.value) {
				val = nextProps.value;
			}

			this.setState({
				hasError: !!this.props.required && !nextProps.value,
				value: val
			});
		}
	}

	// checks if the datepicker is in picker mode depending if the date picker
	// can render inside the viewport; if it can't the date will be entered
	// directly by the user
	isPickerEnabled = () => {
		if (!this.pickerRef) return false;

		const pickerBound = this.pickerRef.getBoundingClientRect();
		const windowHeight = window.innerHeight;

		if (pickerBound.bottom > windowHeight) {
			this.setState({ pickerEnabled: false });
		}
	}

	getDateFormat = () => {
		return DEFAULT_FORMAT_MASKS[this.props.type];
	}

	handleClickOutside = () => {
		const { name, onBlur } = this.props;
		const { hasError, value } = this.state;

		if (!this.state.showPicker) return;

		this.setState({
			showPicker: false
		}, () => {
			if (typeof onBlur === 'function' && this.lastVal !== value) {
				onBlur(hasError, value, name);
				this.lastVal = value;
			}
		});
	}

	onFocus = () => {
		this.setState({ showPicker: true });
	}


	validDate(value) {
		const { type } = this.props;
		const mask = this.getDateFormat();
		let valid;

		if (value.length !== mask.length) {
			return false;
		}

		if (type === 'datetime') {
			valid = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/.test(value);

		} else if (type === 'date') {
			valid = /\d{4}-\d{2}-\d{2}/.test(value);

		} else if (type === 'time') {
			valid = /\d{2}:\d{2}/.test(value);

		}

		return valid ? new moment(value, mask).isValid() : false;
	}

	handleInputChange = evt => {
		const { name, onChange, required } = this.props;
		const mask = this.getDateFormat();

		const value = evt.target.value;
		let hasError = value.length > 0
			? !this.validDate(value)
			: !!required;

		const isValidValue = this.validDate(value);

		if (isValidValue) {
			this.setState({
				moment: new moment(value, mask)
			})
		}

		this.setState({
			//pickerEnabled: !value.length > 0,
			hasError,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, value, name);
			}
		});
	}

	// when user selects a date or time on the datetime picker
	handleDateTimeChange = (value) => {
		const { name, onChange, required, type } = this.props;

		this.setState({
			hasError: !!required && !value,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(false, value, name);
			};
		});
	};

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
				onChange(hasError, value, name)
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
		//console.log('renderPicker method - moment state: ', this.state.moment);

		const picker = (
			<div
				className="mui-mi-datepicker ignore-react-onclickoutside"
				ref={ref => this.pickerRef = ref}
				style={pickerStyle.container}
			>

				<DatePicker
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
		const {
			hasError,
			pickerEnabled,
			showPicker,
			value,
		} = this.state;

		const {
			disabled,
			error,
			name,
			type,
			className,
		} = this.props;

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
					placeholder={this.getDateFormat()}
					type="text"
					value={value}
				/>
				{ pickerEnabled
					&& showPicker
					&& this.renderPicker()
				}
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
	type: PropTypes.oneOf(['date', 'datetime', 'time']).isRequired,
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
