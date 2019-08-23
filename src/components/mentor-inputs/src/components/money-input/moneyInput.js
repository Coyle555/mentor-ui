import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FloatInput from '../float-input/floatInput';

// TO DO - Allow for different currency symbols
import './styles.less';

const MoneyInput = ({ currency, ...inputProps}) => {

	return (
		<FloatInput
			precision={2}
			{...inputProps}
			placeholder="Enter dollar amount"
		/>
	);
}

MoneyInput.propTypes = {
	currency: PropTypes.string.isRequired
};

MoneyInput.defaultProps = {
	currency: 'USD'
};

export default MoneyInput;
