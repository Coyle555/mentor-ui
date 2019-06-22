import { useEffect, useState, useRef } from 'react';
import { get } from 'lodash';
import shortid from 'shortid';
import { useInputValidation } from './useInputValidation';
/*
	wip.... 
	A hook for handling shared functionality among mentor inputs:
	onChange
	onBlur
	parsing value from props
	validation - String for error message / null for valid


*/

export const useInputState = (props = {}) => {

	const {
		onBlur,
		onChange,
		parse,
		validate,
		value,
		handleEvents,
		...input
	} = props;

	const inputRef = useRef(null);
	const fakeNameToPreventAutocomplete = useRef(null);
	const [ currentValue, setCurrentValue ] = useState(() => getDisplayValue(value, parse));
	const [ error, checkErrors ] = useInputValidation(validate);
	
	/// value in state should be updated when value in props is changed

	useEffect(() => {
		const newVal = getDisplayValue(props.value, parse);

		if (!fakeNameToPreventAutocomplete.current && input.autoComplete !== 'true' ) {
			fakeNameToPreventAutocomplete.current = shortid.generate() + '-APM-' + (input.name || 'unnamed');
		}

		if (currentValue !== newVal) {
			/// update to the new value if its actually new
			setCurrentValue(newVal);

			if (inputRef.current) {
				/// check for errors on the new value
				/// as long as the inputRef points to a dom node
				checkErrors(inputRef.current, validate);
			}
		}

	}, [props.value]);

	/// as soon as the input ref is attached to the node
	/// check for errors on the value
	/// (We also need to reevaluate error status if required attribute is changed)
	useEffect(() => {	
		if (!inputRef.current || !inputRef.current.name) return;

		checkErrors(inputRef.current, validate);

	}, [inputRef.current, input.required]);

	return {

		onBlur(evt) {
			if (typeof onBlur !== 'function') return;
			
			const lastVal = getDisplayValue(value, parse);

			if (handleEvents) {
			
				onBlur(evt);
			
			} else if (String(currentValue).trim() !== String(lastVal).trim()) {
				const val = typeof parse === 'function' ? parse(currentValue) : currentValue;

				onBlur(error, val, input.name);
			
			}
		},
		
		onChange(evt) {
			const newValue = evt.target.value;
			checkErrors(evt.target, validate);
			setCurrentValue(newValue);

			if (typeof onChange === 'function') {
				if (handleEvents) {
					onChange(evt);
				} else {
					const val = typeof parse === 'function' ? parse(newValue) : newValue;
					onChange(evt.target.validationMessage, val, input.name);
				}
			}
		},
		name: fakeNameToPreventAutocomplete.current || input.name,
		ref: inputRef,
		value: currentValue
	}
}

/*
	value - any datatype - the value that needs parsing
	parse - a string pointing to an object key or a getter function
*/
export function getDisplayValue(value, parse) {

	if (!parse) {

		if (value && typeof value === 'object') {
		//// instead of having an input render something like [object Object]
		//// pluck the name property of the object (theres a good chance there will be one)			
			return value.name
		
		} else {
					
			return value;
		
		}
	
	} else if (typeof parse === 'string' && value && typeof value === 'object') {

		return get(value, parse, value.name);
	
	} else if (typeof parse === 'function') {
		
		return parse(value);
	
	} else {
		return value;
	}
}


