/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text-input/textInput';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isEmail(value) {
	return EMAIL_REGEX.test(value)
		? true
		: 'Invalid email';
}

const EmailInput = React.forwardRef(({ validate = [], ...props }, ref) => {

	return (
		<TextInput
			placeholder="Enter email"
			{...props}
			ref={ref}
			validate={[isEmail].concat(validate)}
		/>
	);
});

EmailInput.propTypes = {
	validate: PropTypes.oneOfType(PropTypes.func, PropTypes.arrayOf(PropTypes.func))
};

export default EmailInput;
