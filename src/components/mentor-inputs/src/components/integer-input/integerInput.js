import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const IntegerInput = ({ validation, ...props }) => {

	const validate = [ isValidInt(props.required), noDecimals, validation ];

	const inputState = useInputState({ validate, parse, ...props });

	const inputClasses = classNames(inputState.className, props.className);

	return (
		<input
			placeholder="Enter number"
			{...props}
			{...inputState}
			className={inputClasses}
		/>
	);
}

function parse(value) {
	if (isNaN(value)) return ''; //avoid passing NaN into input
	return parseInt(value);
}

/// check if value is a float (1.000 wont throw an error in an input by default)
function noDecimals(num) {
	if (String(num).indexOf('.') > -1) {
		return 'No decimal values.';
	} 
}

function isValidInt(required) {
	return (num) => {
		if ((num === '' && required) || (num !== '' && !isInteger(num))) {
			return 'Invalid number';
		}
	};
}

function isInteger(num) {
	return !isNaN(num)
		&& parseInt(Number(num)) === Number(num)
		&& !isNaN(parseInt(num, 10));
}

export default IntegerInput;
