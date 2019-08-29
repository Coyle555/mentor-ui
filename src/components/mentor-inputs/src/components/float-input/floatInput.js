import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextInput from '../text-input/textInput'

function isFloat(num) {
	return !isNaN(num)
		&& parseFloat(Number(num)) === Number(num)
		&& !isNaN(parseFloat(num, 10));
}

const FloatInput = ({ validate = [], precision, ...props }) => {

	return (
		<TextInput
			placeholder="Enter decimal"
			{...props}
			validate={[isFloat].concat(validate)}
		/>
	);
}

export default FloatInput;
