import React, { useCallback, useMemo } from 'react';
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
		isInteger(min) ? Number(value) >= min : true
	), [min]);

	const isGreaterThanMax = useCallback(value => (
		isInteger(max) ? Number(value) <= max : true
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
			placeholder="Enter number"
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
