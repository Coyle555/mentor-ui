import React, { useCallback } from 'react';
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

const IntegerInput = ({ max, min, validate, ...props }) => {

	const isGreaterThanMin = useCallback(value => (
		min !== undefined ? Number(value) >= min : true
	));

	const isGreaterThanMax = useCallback(value => (
		max !== undefined ? Number(value) <= max : true
	));

	return (
		<TextInput
			placeholder="Enter number"
			{...props}
			validate={[
				isInteger,
				noDecimals,
				isGreaterThanMin,
				isGreaterThanMax
			].concat(validate)}
		/>
	);
};

IntegerInput.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	validate: PropTypes.func
};

export default IntegerInput;
