import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

function isFloat(num) {
	return !isNaN(num) && parseFloat(Number(num)) === Number(num) && !isNaN(parseFloat(num, 10))
		? true
		: 'Invalid number';
}

const FloatInput = ({ max, min, precision, validate, ...props }) => {

	const hasValidPrecision = useCallback(val => (
		precision > -1 && String(Number(val).toFixed(precision)) !== val
			? 'Invalid number'
			: true
	), [precision]);

	const isGreaterThanMin = useCallback(value => (
		typeof min === 'number' && Number(value) < min
			? 'Value is too small'
			: true
	), [min]);

	const isGreaterThanMax = useCallback(value => (
		typeof max === 'number' && Number(value) > max
			? 'Value is too large'
			: true
	), [max]);

	const validates = useMemo(() => {
		return [
			isFloat,
			hasValidPrecision,
			isGreaterThanMin,
			isGreaterThanMax
		].concat(validate);
	}, [hasValidPrecision, isGreaterThanMin, isGreaterThanMax, validate]);

	return (
		<TextInput
			placeholder="Enter decimal"
			{...props}
			validate={validates}
		/>
	);
};

FloatInput.propTypes = {
	max: PropTypes.number,
	min: PropTypes.number,
	precision: PropTypes.number,
	validate: PropTypes.func
};

FloatInput.defaultProps = {
	precision: -1
};

export default FloatInput;
