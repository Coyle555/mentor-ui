import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

function isFloat(num) {
	return !isNaN(num)
		&& parseFloat(Number(num)) === Number(num)
		&& !isNaN(parseFloat(num, 10));
}

const FloatInput = ({ validate = [], precision = -1, ...props }) => {

	const hasValidPrecision = useCallback(val => (
		precision > -1
			? String(Number(val).toFixed(precision)) === val
			: true
	));

	return (
		<TextInput
			placeholder="Enter decimal"
			{...props}
			validate={[isFloat, hasValidPrecision].concat(validate)}
		/>
	);
};

FloatInput.propTypes = {
	precision: PropTypes.number
};

export default FloatInput;
