import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

/// check if value is a float (1.000 wont throw an error in an input by default)
function noDecimals(num) {
	return num.indexOf('.') > -1
		? 'No decimal allowed'
		: true;
}

function isInteger(num) {
	return !isNaN(num) && parseInt(Number(num)) === Number(num) && !isNaN(parseInt(num, 10))
		? true
		: 'Invalid number';
}

const IntegerInput = ({ max, min, validate, ...props }) => {

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
			isInteger,
			noDecimals,
			isGreaterThanMin,
			isGreaterThanMax
		].concat(validate);
	}, [isGreaterThanMin, isGreaterThanMax, validate]);

	return (
		<TextInput
			placeholder="Enter whole number"
			{...props}
			validate={validates}
		/>
	);
};

IntegerInput.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	validate: PropTypes.func
};

export default IntegerInput;
