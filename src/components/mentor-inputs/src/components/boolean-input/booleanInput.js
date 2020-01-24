import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectInput from '../select-input/selectInput';

const OPTIONS = [true, false];
const parse = (val => val ? 'Yes' : 'No');

const BooleanInput = ({ value, ...props }) => {

	if (value === 'true' || value === 'True') {
		value = true;
	} else if (value === 'false' || value === 'False') {
		value = false;
	}

	return (
		<SelectInput 
			{...props}
			options={OPTIONS}
			parse={parse}
			value={value}
		/>
	);
}

BooleanInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	style: PropTypes.object,
	value: PropTypes.oneOf([ false, true, 'false', 'true', '', null, undefined])	
}

export default BooleanInput;
