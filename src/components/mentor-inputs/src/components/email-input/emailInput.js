import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text-input/textInput'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmailInput = ({ validation, ...props }) => {

	// return a better error message than what some browsers provide ('Match the requested format')
	// but use have the browser determine if theres an error
	/// (Im doing the regex test as well because the testing environment returns an empyt object for input.validity)
	function isEmail(value, input) {
		if (!value) return;
		//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
		if (input.validity.patternMismatch || !EMAIL_REGEX.test(value)) {
			return 'Not a valid email address.';
		} else if (typeof validation === 'function') {
			const customError = validation(value, input);
			return customError;
		}
	}

	return (
		<TextInput
			{...props}
			type="email"
			validation={isEmail}
		/>		
	)
}


export default EmailInput;