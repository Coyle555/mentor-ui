import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const FloatInput = ({ validation, precision, ...props }) => {

	const validate = [ isValidFloat(props.required), validation ];

	const inputState = useInputState({ validate, parse, ...props });
	const inputClasses = classNames(inputState.className, props.className);

	function parse(value) {
		if (isNaN(value)) {
			//avoid passing NaN into input 
			return ''; 
		} else if (!isNaN(precision)) {
			return Number(parseFloat(value).toFixed(precision))
		} else {
			return parseFloat(value);
		}
	}

	return (
		<input
			placeholder="Enter decimal"
			{...props}
			{...inputState}
			className={inputClasses}
		/>
	);
}

function isValidFloat(required) {
	return (num) => {
		if ((num === '' && !!required) || (num !== '' && !isFloat(num))) {
			return 'Invalid number';
		}
	};
}

function isFloat(num) {
	return !isNaN(num)
		&& parseFloat(Number(num)) === Number(num)
		&& !isNaN(parseFloat(num, 10));
}

export default FloatInput;
