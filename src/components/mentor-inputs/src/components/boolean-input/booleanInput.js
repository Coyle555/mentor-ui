import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectInput from '../select-input/selectInput';

const OPTIONS = ['Yes', 'No'];
const parseMatchedValue = (val => val === 'Yes' ? true : val === 'No' ? false : '');

const BooleanInput = React.forwardRef(({ value, ...props }, ref) => {
	let renderedValue = '';
	if (value === true || value === 'true') {
		renderedValue = 'Yes';
	} else if (value === false || value === 'false') {
		renderedValue = 'No';
	}

	return (
		<SelectInput
			{...props}
			options={OPTIONS}
			parseMatchedValue={parseMatchedValue}
			ref={ref}
			value={renderedValue}
		/>
	);
});

BooleanInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	style: PropTypes.object,
	value: PropTypes.oneOf([false, true, 'false', 'true', '', null, undefined])
}

export default BooleanInput;
