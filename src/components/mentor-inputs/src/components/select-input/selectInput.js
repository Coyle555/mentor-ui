import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { hasError, useInputState } from '../../hooks/index';
import '../../styles/index.less';

const SelectInput = ({ 
	options, 
	placeholder,
	parse, 
	required,
	validate, 
	value,
	...props 
}) => {
	value = typeof parse === 'function' ? parse(value) : value;

	//if (!value) value = '';

	const lastVal = useRef(value);
	const inputRef = useRef(null);
	const [ currentValue, setCurrentValue ] = useState(value);
	const [ error, setError ] = useState(hasError(value, required, validate));
	console.log('curren value', currentValue);

	/// value in state should be updated when value in props is changed
	/*useEffect(() => {
		if (currentValue !== value) {
			/// update to the new value if its actually new
			setCurrentValue(validateValue(value));

			if (inputRef.current) {
				/// check for errors on the new value
				/// as long as the inputRef points to a dom node
				setError(hasError(value, required, validate));
			}
		}

	}, [value]);

	/// as soon as the input ref is attached to the node
	/// check for errors on the value
	/// (We also need to reevaluate error status if required attribute is changed)
	/*useEffect(() => {
		if (!inputRef.current || !inputRef.current.name) return;

		setError(hasError(currentValue, required, validate));

	}, [inputRef.current, required]);

	/*const onBlur = useCallback(evt => {
		if (typeof onBlur !== 'function') return;
		
		if (currentValue !== lastVal) {
			lastVal.current = currentValue;

			const actualValue = typeof parse === 'function'
				? options.find(opt => parse(opt) === newValue)
				: newValue;

			onBlur(error, actualValue, props.name);
		}
	});*/

	console.log(currentValue);
	const onChange = useCallback(evt => {
		const newValue = evt.target.value;
		setCurrentValue(newValue);

		//const error = hasError(newValue, required, validate);
		//setError(error);

		if (typeof onChange === 'function') {
			/*const actualValue = typeof parse === 'function'
				? options.find(opt => parse(opt) === newValue)
				: newValue;

			console.log('calling on change w/', error, actualValue, props.name);*/

			onChange(error, '', props.name);
		}
	});

	/*const inputClasses = classNames({
		'mui-mi-input-field': true,
		[props.className]: !!props.className,
		'mui-mi-input-field-has-error': error
	});*/

	return (
		<select
			{...props}
			//className={inputClasses}
			name={props.name}
			//onBlur={onBlur}
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

				return (
					<option
						key={value}
						value={value}
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
	placeholder: 'Select an option',
	value: ''
};

export default SelectInput;
