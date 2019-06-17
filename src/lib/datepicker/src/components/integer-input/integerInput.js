import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const IntegerInput = ({ validation, ...props }) => {

	const validate = [ noDecimals, validation ];

	const inputState = useInputState({ validate, parse, ...props });

	const inputClasses = classNames('apm-mi-form-control', props.className);

	return (
		<input
			{...props}
			{...inputState}
			className={inputClasses}
			type="number"
		/>		
	)
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


export default IntegerInput;
