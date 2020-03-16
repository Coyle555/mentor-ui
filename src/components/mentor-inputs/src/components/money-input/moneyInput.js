import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FloatInput from '../float-input/floatInput';

export const isMoney = (val) => {
	// check for proper precision if a decimal was added
	if (val.includes('.')) {
		const parts = val.split('.');

		return !isNaN(val)
			&& parseFloat(Number(val)) === Number(val)
			&& !isNaN(parseFloat(val, 10))
			&& String(Number(val).toFixed(2)) === val
				? true
				: 'Invalid money value'
	}

	// check its a valid int otherwise
	return !isNaN(val)
		&& parseInt(Number(val)) === Number(val)
		&& !isNaN(parseInt(val, 10))
			? true
			: 'Invalid money value';
}

const MoneyInput = (props) => {

	return (
		<FloatInput
			placeholder="Enter dollar amount"
			{...props}
			validation={[isMoney, props.validate]}
		/>
	);
};

MoneyInput.propTypes = {
	validate: PropTypes.func
};

export default MoneyInput;
