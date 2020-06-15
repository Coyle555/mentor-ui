import { useState } from 'react';


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
			// use browsers built in validation based on various html attributes passed in (required, min, max, etc)
			// to generate an error message
			setErrorMessage(inputRef.validationMessage);
		}
	}

	return [errorMessage, validator];
};
