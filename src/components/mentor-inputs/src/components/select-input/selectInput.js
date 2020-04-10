import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../styles/index.less';

function hasError(value, required, customValidators) {
	if (value === '' && !!required) {
		return 'Value is required';
	}

	if (!!customValidators && !Array.isArray(customValidators)) {
		customValidators = [customValidators];
	}

	if (value !== ''
		&& !!customValidators
		&& customValidators.length > 0) {

		for (let validator of customValidators) {
			if (typeof validator === 'function') {
				const validity = validator(value);
				
				if (typeof validity === 'string') {
					return validity;
				} else if (!validator(value)) {
					return 'An error occurred';
				}
			}
		}
	}

	return false;
}

const SelectInput = ({ 
	disabled,
	options, 
	placeholder,
	parse, 
	parseMatchedValue,
	required,
	validate, 
	...props 
}) => {
	let value = typeof parseMatchedValue === 'function'
		? parseMatchedValue(props.value)
		: props.value;

	if (value === undefined || value === null) {
		value = '';
	}

	const inputRef = useRef(null);
	const [ currentValue, setCurrentValue ] = useState(value);
	const [ error, setError ] = useState(() => hasError(value, required, validate));

	useEffect(() => {
		setError(hasError(currentValue, required, validate));
	}, [required, validate]);

	useEffect(() => {
		let value = typeof parseMatchedValue === 'function'
			? parseMatchedValue(props.value)
			: props.value;

		if (value === undefined || value === null) {
			value = '';
		}

		if (currentValue !== value) {
			setCurrentValue(value);
			setError(hasError(value, required, validate));
		}
	}, [props.value]);

	/// as soon as the input ref is attached to the node
	/// check for errors on the value
	/// (We also need to reevaluate error status if required attribute is changed)
	useEffect(() => {
		if (!inputRef.current) return;

		const err = hasError(currentValue, required, validate);
		setError(err);

		if (typeof err === 'string') {
			inputRef.current.setCustomValidity(err);
		}
	}, [inputRef.current, currentValue, required, validate]);

	const onBlur = evt => {
		if (typeof props.onBlur !== 'function') return;
		
		const actualValue = typeof parse === 'function'
			&& typeof parseMatchedValue !== 'function'
				? options.find(opt => parse(opt) === currentValue)
				: currentValue;

		props.onBlur(error, actualValue, props.name, evt);
	};

	const onChange = useCallback(evt => {
		const newValue = evt.target.value;
		setCurrentValue(newValue);

		const error = hasError(newValue, required, validate);
		setError(error);

		if (typeof props.onChange === 'function') {
			
			const actualValue = typeof parse === 'function'
				&& typeof parseMatchedValue !== 'function'
					? options.find(opt => parse(opt) === newValue)
					: newValue;

			if (inputRef.current) {
				if (error) {
					inputRef.current.setCustomValidity(String(error));
				} else {
					inputRef.current.setCustomValidity('');
				}
			}

			props.onChange(error, actualValue, props.name, evt);
		}
	}, [inputRef.current, options, parse, parseMatchedValue, props.name, props.onChange, required, validate]);

	const inputClasses = classNames({
		'mui-mi-input-field': true,
		[props.className]: !!props.className,
		'mui-mi-input-field-has-error': !!error && !disabled
	});

	return (
		<select
			{...props}
			disabled={disabled}
			required={required}
			className={inputClasses}
			name={props.name}
			onBlur={onBlur}
			onChange={onChange}
			ref={inputRef}
			value={currentValue}
		>
			<option
				disabled={required}
				value=""
			>
				{ placeholder }
			</option>
			{ options.map(option => {

				const value = typeof parse === 'function'
					? parse(option)
					: option;

				const returnValue = typeof parseMatchedValue === 'function' 
					? parseMatchedValue(option)
					: value;

				return (
					<option
						key={value}
						value={returnValue}
					>
						{value}
					</option>
				);
			})}
		</select>
	);
}

SelectInput.propTypes = {
	options: PropTypes.array,
	parse: PropTypes.func,
	validation: PropTypes.func,
};

SelectInput.defaultProps = {
	options: [],
	placeholder: 'Select a value',
	value: ''
};

export default SelectInput;
