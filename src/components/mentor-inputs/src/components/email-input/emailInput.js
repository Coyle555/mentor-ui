import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text-input/textInput'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isEmail(value) {
	return EMAIL_REGEX.test(value);
}

const EmailInput = ({ validate = [], ...props }) => {

	return (
		<TextInput
			placeholder="Enter email"
			{...props}
			validate={[isEmail].concat(validate)}
		/>		
	);
}


export default EmailInput;
