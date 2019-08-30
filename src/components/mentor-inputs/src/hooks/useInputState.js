import { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import shortid from 'shortid';

import { hasError } from './hasError';

function validateValue(value) {
	return !!value ? String(value) : '';
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

	value = validateValue(value);

	const inputRef = useRef(null);
	const fakeNameToPreventAutocomplete = useRef(null);
	const lastVal = useRef(value);

	const [ currentValue, setCurrentValue ] = useState(value);
	const [ error, setError ] = useState(hasError(value, required, validate))
	
	/// value in state should be updated when value in props is changed
	useEffect(() => {
		if (!fakeNameToPreventAutocomplete.current && input.autoComplete !== 'true' ) {
			fakeNameToPreventAutocomplete.current = shortid.generate() + '-APM-' + (input.name || 'unnamed');
		}

		if (currentValue !== value) {
			/// update to the new value if its actually new
			setCurrentValue(validateValue(value));

			if (inputRef.current) {
				/// check for errors on the new value
				/// as long as the inputRef points to a dom node
				setError(hasError(value, required, validate));
			}
		}

	}, [props.value]);

	/// as soon as the input ref is attached to the node
	/// check for errors on the value
	/// (We also need to reevaluate error status if required attribute is changed)
	useEffect(() => {
		if (!inputRef.current || !inputRef.current.name) return;

		setError(hasError(currentValue, required, validate));

	}, [inputRef.current, input.required]);

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

		name: fakeNameToPreventAutocomplete.current || input.name,
		ref: inputRef,
		value: currentValue
	}
};
