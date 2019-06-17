import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FloatInput from '../float-input/floatInput';

// TO DO - Allow for different currency symbols

const MoneyInput = ({ currency, ...inputProps}) => {

	return (
		<div className="input-group">
			<div
				className="input-group-addon"
				style={{
					backgroundColor: 'transparent',
					border: 'none'
				}}
			>
				<i className="far fa-dollar-sign" />
			</div>
			<FloatInput
				{...inputProps}
				precision={2}
			/>
		</div>				
	)
}

MoneyInput.propTypes = {
	currency: PropTypes.string.isRequired
};

MoneyInput.defaultProps = {
	currency: 'USD'
};

export default MoneyInput;
