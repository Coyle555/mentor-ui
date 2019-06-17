import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';
import moment from 'moment';

import InputMoment from './input-moment/input-moment';

// default format masks for different datepicker types
const DEFAULT_FORMAT_MASKS = {
	datetime: 'YYYY-MM-DD HH:mm',
	date: 'YYYY-MM-DD',
	time: 'HH:mm'
};


export class DatePicker extends Component {

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
		type: PropTypes.oneOf(['date', 'datetime', 'time']).isRequired,
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
		pickerStyle: {},
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

		let val = '';
		const mask = this.getDateFormat();

		if (!moment(value).isValid()) {
		
			this.moment = new moment(new Date(), mask);
		
		} else {

			this.moment = new moment(value, mask);
			val = this.moment.format(mask);
		}

		this.lastVal = val;

		// @focused(bool) - if the date picker popup is open
		// @hasError(bool) - if there is an error with the users 
		// 	selected date
		// @inputMode - true if there is not enough space to render the
		// 	datepicker in the viewport; false otherwise
		// @pickerMode - enabled if the datepicker can fit in the viewport;
		// 	otherwise the user enters the date directly
		// @value(string) - current value in the input field
		this.state = {
			focused: this.props.autoFocus,
			hasError: !!required & !val,
			inputMode: false,
			pickerMode: true,
			value: val
		};
	}

	componentDidMount() {
		this.isPickerMode();
		//window.addEventListener('resize', this.isPickerMode);
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

	componentWillUnmount() {
		//window.removeEventListener('resize', this.isPickerMode);
	}

	// checks if the datepicker is in picker mode depending if the date picker 
	// can render inside the viewport; if it can't the date will be entered
	// directly by the user
	isPickerMode = () => {
		if (!this.pickerRef) return false;

		const pickerBound = this.pickerRef.getBoundingClientRect();
		const windowHeight = window.innerHeight;

		if (pickerBound.bottom > windowHeight) {
			this.setState({ pickerMode: false });
		}
	}

	getDateFormat = () => {
		return DEFAULT_FORMAT_MASKS[this.props.type];
	}

	handleClickOutside = () => {
		const { name, onBlur } = this.props;
		const { hasError, value } = this.state;

		if (!this.state.focused) return;
		
		this.setState({
			focused: false
		}, () => {
			if (typeof onBlur === 'function' && this.lastVal !== value) {
				onBlur(hasError, value, name);
				this.lastVal = value;
			}
		});
	}

	onClick = () => {
		this.setState({ focused: true });
	}

	handleInputChange = evt => {
		const { name, onChange, required } = this.props;
		const mask = this.getDateFormat();

		const value = evt.target.value;
		let hasError = value.length > 0
			? !this.validDate(value)
			: !!required;

		this.setState({
			inputMode: !this.state.pickerMode || value.length > 0,
			hasError,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(hasError, value, name);
			}
		});
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

	// when user selects a date or time on the datetime picker
	handleDateTimeChange = (newVal) => {
		const { name, onChange, required, type } = this.props;
		const mask = this.getDateFormat();
		const value = newVal.format(mask);

		this.setState({
			hasError: !!required && !value,
			value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(false, value, name);
			}
		});
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
				onChange(hasError, value, name)
			}
		});
	}

	handleClose = () => {
		this.setState({ focused: false });
	}

	renderPicker = () => {
		if (!this.state.focused) {
			return null;
		}

		const { pickerStyle, portalRef } = this.props;

		const picker = (
			<div
				className="apm-datepicker-input ignore-react-onclickoutside"
				ref={ref => this.pickerRef = ref}
				style={pickerStyle.container}
			>
				<InputMoment
					clearInput={this.clearInput}
					dateDisabled={this.props.type === 'time'}
					handleClose={this.handleClose}
					nextMonthIcon="fa fa-angle-right"
					maxDate={this.props.maxDate}
					minDate={this.props.minDate}
					maxHour={this.props.maxHour}
					minHour={this.props.minHour}
					maxMinute={this.props.maxMinute}
					minMinute={this.props.minMinute}
					moment={this.moment}
					onChange={this.handleDateTimeChange}
					prevMonthIcon="fa fa-angle-left"
					timeDisabled={this.props.type === 'date'}
				/>
			</div>
		);

		if (!!portalRef) {
			return createPortal(picker, portalRef);
		}

		return picker;
	}

	render() {
		const {
			disabled,
			error,
			maxDate,
			minDate,
			name,
			onBlur,
			maxHour,
			minHour,
			maxMinute,
			minMinute,
			pickerStyle,
			portalRef,
			required,
			type,
			validation,
			// props from on click outside lib
			disableOnClickOutside,
			enableOnClickOutside,
			eventTypes,
			outsideClickIgnoreClass,
			preventDefault,
			stopPropagation,
			...props
		} = this.props;
		const { hasError, inputMode, pickerMode, value } = this.state;

		const iconClasses = classNames({
			'fal': true,
			'fa-calendar-alt': type !== 'time',
			'fa-clock': type === 'time'
		});

		const inputClasses = classNames({
			'apm-datepicker-input-group': true,
			[this.props.className]: !!this.props.className,
			'apm-error-border-color': error !== null ? error : hasError
		});

		return (
			<div className="apm-mi-container">
				<div className={inputClasses}>
					<span
						className="apm-datepicker-input-group-addon"
						style={{ color: hasError ? '#be1717' : '#16181e' }}
					>
						<i className={iconClasses} />
					</span>
					<input
						{...props}
						data-testid={'datepicker-input-' + this.props.name}
						className="apm-mi-form-control apm-width-100p"
						disabled={disabled}
						onChange={this.handleInputChange} 	// everything is handled through date picker
						onClick={this.onClick}
						placeholder={this.getDateFormat()}
						style={{
							border: 0,
							borderLeftWidth: '1px',
							borderLeftStyle: 'solid',
							borderLeftColor: hasError ? '#be1717' : '#16181e'
						}}
						type="text"
						value={value}
					/>
					{ pickerMode && !inputMode && this.renderPicker() }
				</div>
			</div>
		);
	}
}

export default onClickOutside(DatePicker);
