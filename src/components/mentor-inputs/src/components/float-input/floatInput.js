import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

function isFloat(num) {
	return !isNaN(num)
		&& parseFloat(Number(num)) === Number(num)
		&& !isNaN(parseFloat(num, 10));
}

const FloatInput = ({ max, min, precision = -1, validate, ...props }) => {

	const hasValidPrecision = useCallback(val => (
		precision > -1
			? String(Number(val).toFixed(precision)) === val
			: true
	));

	const isGreaterThanMin = useCallback(value => (
		min !== undefined ? Number(value) >= min : true
	));

	const isGreaterThanMax = useCallback(value => (
		max !== undefined ? Number(value) <= max : true
	));

	return (
		<TextInput
			placeholder="Enter decimal"
			{...props}
			validate={[
				isFloat,
				hasValidPrecision,
				isGreaterThanMin,
				isGreaterThanMax
			].concat(validate)}
		/>
	);
};

FloatInput.propTypes = {
	precision: PropTypes.number
};

export default FloatInput;
