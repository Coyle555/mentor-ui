import { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import { hasError } from './hasError';

function validateValue(value) {
	return value === 0 || !!value ? String(value) : '';
}

export const useInputState = (props = {}) => {

	let {
		disabled,
		onBlur,
		onChange,
		required,
		validate,
		value,
		...input
	} = props;

	const lastVal = useRef(validateValue(value));

	const [ currentValue, setCurrentValue ] = useState(validateValue(value));
	const [ error, setError ] = useState(hasError(currentValue, required, validate));

	useEffect(() => {
		setError(hasError(currentValue, required, validate));
	}, [required, validate]);
	
	/// value in state should be updated when value in props is changed
	useEffect(() => {
		/// update to the new value if its actually new
		setCurrentValue(validateValue(value));
		setError(hasError(value, required, validate));
	}, [value]);

	const inputClasses = classNames({
		'mui-mi-input-field': true,
		[props.className]: !!props.className,
		'mui-mi-input-field-has-error': error
	});
		
	return {
		className: inputClasses,

		onBlur: useCallback(evt => {
			if (typeof onBlur !== 'function') return;
			
			if (String(currentValue).trim() !== String(lastVal).trim()) {
				lastVal.current = currentValue;
				onBlur(error, currentValue, input.name);
			}
		}),
		
		onChange: useCallback(evt => {
			const newValue = evt.target.value;
			setCurrentValue(newValue);

			const error = hasError(newValue, required, validate);
			setError(error);

			if (typeof onChange === 'function') {
				onChange(error, newValue, input.name);
			}
		}),

		name: input.name,
		value: currentValue
	}
};
