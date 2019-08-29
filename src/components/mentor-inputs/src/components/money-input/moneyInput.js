import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FloatInput from '../float-input/floatInput';

const MoneyInput = (props) => {

	return (
		<FloatInput
			placeholder="Enter dollar amount"
			{...props}
			precision={2}
		/>
	);
}

export default MoneyInput;
