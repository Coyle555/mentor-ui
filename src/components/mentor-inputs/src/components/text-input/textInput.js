import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const TextInput = ({ icon, validation, ...props }) => {

	const validate = [ noEmptyStrings, validation ];
	const inputState = useInputState({ validate, parse, ...props });
	const inputClasses = classNames('mui-mi-input-field', props.className);

	return (
		<div className={inputState.classes.inputGroup}>
			<span className={inputState.classes.addon}>
				<i className={icon} />
			</span>
			<input
				autoComplete="false"
				placeholder="Enter text"
				type="text"
				{...props}
				className={inputClasses}
				{...inputState}
			/>
		</div>
	);
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

TextInput.propTypes = {
	icon: PropTypes.string,
};

TextInput.defaultProps = {
	icon: 'fal fa-text',
};

export default TextInput;

