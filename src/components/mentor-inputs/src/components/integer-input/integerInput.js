import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const IntegerInput = ({ validation, ...props }) => {

	const validate = [ noDecimals, validation ];

	const inputState = useInputState({ validate, parse, ...props });

	const inputClasses = classNames('mui-mi-input-field', props.className);

	return (
		<div className={inputState.classes.inputGroup}>
			<span className={inputState.classes.addon}>
				<span className="text">123</span>
			</span>
			<input
				{...props}
				{...inputState}
				className={inputClasses}
				placeholder="Enter number"
			/>
		</div>
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


export default IntegerInput;
