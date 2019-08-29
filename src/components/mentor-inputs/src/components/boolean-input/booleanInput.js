import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectInput from '../select-input/selectInput';

const OPTIONS = ['True', 'False'];

function parse(value) {
	return value === 'True' ? 'true' : 'false';
}

const BooleanInput = ({ value, ...props }) => {

	if (value === 'true' || value === true) {
		value = 'True';
	} else if (value === 'false' || value === false) {
		value = 'False';
	} else {
		value = '';
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
