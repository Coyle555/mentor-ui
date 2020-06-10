import { useState } from 'react';


//https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
/// define error messages
const getErrorMessage = (validityState) => {
	const messages = {
		badInput: 'This field is invalid',
		patternMismatch: 'Invalid format',
		rangeOverflow: 'Value is too big.',
		rangeUnderflow: 'Value is too small.',
		stepMismatch: 'Invalid step', //idk...
		tooLong: 'Field too long',
		tooShort: 'Field too short',
		typeMismatch: 'Invalid field type', /// i
		valueMissing: 'This field is required'
	}
	for (let key in validityState) {
		if (validityState[key]) {
			return messages[key];
		}
	}
	return '';
}


export function useInputValidation(customValidators) {
	const [errorMessage, setErrorMessage] = useState('');

	if (!Array.isArray(customValidators)) {
		customValidators = [customValidators];
	}

	const validator = (inputRef) => {
		let i = -1;
		let errorString = '';

		for (i = 0; i < customValidators.length && !errorString; i++) {
			const fn = customValidators[i];

			if (typeof fn === 'function') {
				// validator fn should return a string if input is invalid, 
				// if it returns a falsey value assign an empty string
				errorString = fn(inputRef.value, inputRef) || '';
				// display error message in the ui
				setErrorMessage(errorString);
				// invalidate the input to prevent a form from submitting if failed (and trigger :invalid styles on the input)
				// or remove custom error message if passed by passing in empty string
				//console.log({ errorString });
				inputRef.setCustomValidity(errorString);
			}
		}

		if (!errorString) {
			let { customError, ...validityState } = inputRef.validity;
			// clear out any previously applied custom error messages since all tests passed
			if (customError) {
				const browserError = getErrorMessage(validityState);

				inputRef.setCustomValidity(browserError);
				setErrorMessage(browserError);
			} else {
				// if no custom validation function was passed in, or the custom handlers all passed
				// use browsers built in validation based on various html attributes passed in (required, min, max, etc)
				// to generate an error message
				//console.log(inputRef.name, inputRef.validationMessage, inputRef.value, typeof inputRef.value, inputRef.checkValidity());
				setErrorMessage(inputRef.validationMessage);
			}
		}
	}

	return [errorMessage, validator];
};
