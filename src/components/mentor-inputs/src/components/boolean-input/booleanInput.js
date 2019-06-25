import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectInput from '../select-input/selectInput';

const OPTIONS = [ 
	{ value: true, label: 'True' },
	{ value: false, label: 'False' }
];

const BooleanInput = props => {
	
	return (
		<SelectInput 
			{...props}
			getOptionLabel={getOptionLabel}
			getOptionValue={getOptionValue}
			options={OPTIONS}
			parse={parse}
		/>
	);
}

function getOptionLabel(opt) {
	return opt.label;
}
function getOptionValue(opt) {
	return opt.value;
}

function parse(value) {
	switch (value) {
		case true:
		case 'true':
			return true;
		case false:
		case 'false':
			return false;
		default:
			return ''
	}
}

BooleanInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	// validation: PropTypes.func,
	style: PropTypes.object,
	value: PropTypes.oneOf([ false, true, 'false', 'true', '', null, undefined])	
}

export default BooleanInput;
