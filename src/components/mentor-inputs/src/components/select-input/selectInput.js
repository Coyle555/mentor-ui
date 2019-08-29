import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const SelectInput = ({ 
	options, 
	placeholder,
	parse, 
	validate, 
	...props 
}) => {
	const inputState = useInputState({ validate, parse, ...props });

	return (
		<select
			{...props}
			{...inputState}
			name={props.name}
		>
			<option
				disabled={props.required}
				value="" 
			>
				{ placeholder }
			</option>
			{ options.map(option => {
				const value = typeof parse === 'function'
					? parse(option)
					: option;

				return (
					<option
						key={value}
						value={value}
					>
						{option}
					</option>
				);
			})}
		</select>
	);
}

SelectInput.propTypes = {
	options: PropTypes.array,
	parse: PropTypes.func,
	validation: PropTypes.func,
};

SelectInput.defaultProps = {
	options: [],
	placeholder: 'Select an option'
};

export default SelectInput;
