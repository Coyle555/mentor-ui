/* eslint-disable react/display-name */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FloatInput from '../float-input/floatInput';

export const isMoney = (val) => {
	const decimalIncluded = val.includes('.');
	// check for proper precision if a decimal was added
	if (decimalIncluded) {
		const [integerPortion, decimalPortion] = val.split('.');
		const valHasNoIntegerPortion = (integerPortion.length === 0);

		// a decimal with no leading numbers, check if the precision is a valid int
		if (valHasNoIntegerPortion) {
			return !isNaN(decimalPortion)
				&& parseInt(Number(decimalPortion)) === Number(decimalPortion)
				&& !isNaN(parseInt(decimalPortion, 10))
				&& decimalPortion.length <= 2
				? true
				: 'Invalid money value';
		}

		// precision of 0 not allowed
		if (decimalPortion.length === 0) {
			return 'Invalid money value';
		}

		// only one precision after decimal; gets autofilled on blur
		if (decimalPortion.length === 1) {
			return !isNaN(val)
				&& parseFloat(Number(val)) === Number(val)
				&& !isNaN(parseFloat(val, 10))
				&& String(Number(val).toFixed(1)) === val
				? true
				: 'Invalid money value';
		}

		// valid precision after decimal for money
		if (decimalPortion.length === 2) {
			return !isNaN(val)
				&& parseFloat(Number(val)) === Number(val)
				&& !isNaN(parseFloat(val, 10))
				&& String(Number(val).toFixed(2)) === val
				? true
				: 'Invalid money value';
		}
	}

	// check its a valid int otherwise
	return !isNaN(val)
		&& parseInt(Number(val)) === Number(val)
		&& !isNaN(parseInt(val, 10))
		? true
		: 'Invalid money value';
};

const MoneyInput = React.forwardRef((props, ref) => {
	const [value, setValue] = useState(props.value);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const onBlur = useCallback((err, value, name, evt) => {
		if (!err && value.includes('.')) {
			const parts = value.split('.');

			if (parts[1].length === 0) {
				value = value + '00';
				setValue(value);
			}

			if (parts[1].length === 1) {
				value = value + '0';
				setValue(value);
			}
		}

		if (typeof props.onBlur === 'function') {
			props.onBlur(err, value, name, evt);
		}
	}, [props.onBlur]);

	return (
		<FloatInput
			placeholder="Enter dollar amount"
			{...props}
			onBlur={onBlur}
			precision={undefined}
			ref={ref}
			validate={[isMoney].concat(props.validate)}
			value={value}
		/>
	);
});

MoneyInput.propTypes = {
	onBlur: PropTypes.func,
	validate: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	value: PropTypes.string
};

MoneyInput.defaultProps = {
	value: ''
};

export default MoneyInput;
