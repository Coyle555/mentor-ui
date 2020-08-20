/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../select-input/selectInput';

const OPTIONS = ['Yes', 'No'];

const parseMatchedValue = val => val === 'Yes'
	? true
	: val === 'No'
		? false
		: '';

const BooleanInput = React.forwardRef((props, ref) => {
	return (
		<SelectInput
			{...props}
			options={OPTIONS}
			parseMatchedValue={parseMatchedValue}
			ref={ref}
		/>
	);
});

BooleanInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	style: PropTypes.object,
	value: PropTypes.oneOf([false, true, 'false', 'true', '', null, undefined])
};

export default BooleanInput;
