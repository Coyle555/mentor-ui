import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectInput from '../select-input/selectInput';

const OPTIONS = ['Yes', 'No'];
const parseMatchedValue = (val => val === 'Yes' ? true : val === 'No' ? false : '');

const BooleanInput = ({ value, ...props }) => {

	if (value === true || value === 'true') {
		value = 'Yes';
	} else if (value === false || value === 'false') {
		value = 'No';
	}

	return (
		<SelectInput 
			{...props}
			options={OPTIONS}
			parseMatchedValue={parseMatchedValue}
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
