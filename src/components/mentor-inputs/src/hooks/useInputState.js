import { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import { hasError } from './hasError';

function validateValue(value) {
	return value !== null && value !== undefined
		? String(value)
		: '';
}

export const useInputState = (props = {}) => {
	const {
		id,
		onBlur,
		onChange,
		required,
		validate,
		value,
		...input
	} = props;

	const [ currentValue, setCurrentValue ] = useState(() => 
		validateValue(value)
	);
	
	const [ error, setError ] = useState(() => 
		hasError(currentValue, required, validate)
	);

	useEffect(() => {
		setError(hasError(currentValue, required, validate));
	}, [required, validate]);
	
	useEffect(() => {
		const newVal = validateValue(value);

		setCurrentValue(newVal);
		setError(hasError(newVal, required, validate));
	}, [id, value]);

	useEffect(() => {
		const err = hasError(currentValue, required, validate);
		setError(err);
	}, [currentValue, required, validate]);

	const inputClasses = classNames({
		'mui-mi-input-field': true,
		[props.className]: !!props.className,
		'mui-mi-input-field-has-error': error
	});

	return {
		className: inputClasses,

		onBlur: useCallback(evt => {
			if (typeof onBlur !== 'function') return;
			
			onBlur(error, currentValue, input.name, evt);
		}),
		
		onChange: useCallback(evt => {
			const newValue = evt.target.value;
			setCurrentValue(newValue);

			const error = hasError(newValue, required, validate);
			setError(error);

			if (typeof onChange === 'function') {
				onChange(error, newValue, input.name, evt);
			}
		}),

		name: input.name,
		value: currentValue
	}
};
