import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';

import '../../styles/index.less';

const FloatInput = ({ validation, precision, ...props }) => {

	const validate = [ isFloat, validation ];

	const inputState = useInputState({ validate, parse, ...props });
	const inputClasses = classNames('apm-mi-form-control', props.className);

	const step = useMemo(() => {
		if (isNaN(precision)) return '0.00005';
		let str = '0.';
		for (let i = 0; i < precision - 1; i++) {
			str += '0'
		}
		return str + '1';
	}, [precision]);

	function parse(value) {
		if (isNaN(value)) {
			//avoid passing NaN into input 
			return ''; 
		} else if (!isNaN(precision)) {
			return Number(parseFloat(value).toFixed(precision))
		} else {
			return parseFloat(value);
		}	
	}

	return (
		<input
			{...props}
			{...inputState}
			className={inputClasses}
			step={step}
			type="number"
		/>		
	)
}


function isFloat(value) {
	if (value != 0 && !parseFloat(value)) return 'NONONONON'
}
export default FloatInput;

