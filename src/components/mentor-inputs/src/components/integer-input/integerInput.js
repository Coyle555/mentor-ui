import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

/// check if value is a float (1.000 wont throw an error in an input by default)
function noDecimals(num) {
	return num.indexOf('.') === -1;
}

function isInteger(num) {
	return !isNaN(num)
		&& parseInt(Number(num)) === Number(num)
		&& !isNaN(parseInt(num, 10));
}

const IntegerInput = ({ validate = [], ...props }) => {

	return (
		<TextInput
			placeholder="Enter number"
			{...props}
			validate={[isInteger, noDecimals].concat(validate)}
		/>
	);
}

export default IntegerInput;
