import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FloatInput from '../float-input/floatInput';

// TO DO - Allow for different currency symbols
import './styles.less';

const MoneyInput = ({ currency, ...inputProps }) => {

	return (
		<FloatInput
			placeholder="Enter dollar amount"
			{...inputProps}
			precision={2}
		/>
	);
}

function isValidMoney(required) {
	return (num) => {
		if ((num === '' && !!required) || (num !== '' && !isFloat(num))) {
			return 'Invalid number';
		}
	};
}

function isFloat(num) {
	return !isNaN(num)
		&& parseFloat(Number(num)) === Number(num)
		&& !isNaN(parseFloat(num, 10));
}

MoneyInput.propTypes = {
	currency: PropTypes.string.isRequired
};

MoneyInput.defaultProps = {
	currency: 'USD'
};

export default MoneyInput;
