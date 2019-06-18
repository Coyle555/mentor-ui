import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const TextInput = ({ validation, ...props }) => {

	const validate = [ noEmptyStrings, validation ];
	const inputState = useInputState({ validate, parse, ...props });
	const inputClasses = classNames('apm-mi-form-control', props.className);

	return (
		<input
			autoComplete="false"
			type="text"
			{...props}
			className={inputClasses}
			{...inputState}
		/>		
	)
}

function noEmptyStrings(value, input) {

	if (input.required && !value.trim().length) {
		return 'This field is required.';
	}
}

function parse(value) {
	/// non string values could get passed in initially as a prop
	if (typeof value === 'string') {
		return value.trim();
	} else if (!isNaN(value) && value !== null) {
		// apparently isNaN(null) is false...
		return value.toString();
	} else if (!value) {
		return '';
	}
}

export default TextInput;

