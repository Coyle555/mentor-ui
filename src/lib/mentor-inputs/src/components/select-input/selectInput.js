import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const SelectInput = ({ 
	validation, 
	options, 
	placeholder,
	getOptionLabel,
	getOptionValue,
	parse, 
	...props 
}) => {
	const parseValue = useMemo(() => {
		return function(value) {
			if (typeof parse === 'function') {
				return parse(value);
			} else if (value && typeof value === 'object') {
				return getOptionValue(value);
			} else {
				return value;
			}
		}
	}, []);

	const inputState = useInputState({ 
		validate: validation, 
		parse: parseValue, 
		...props 
	});	

	const formattedOptions = useMemo(() => {
		return options.map((option, i) => {
			const label = getOptionLabel(option);
			const val = getOptionValue(option);

			return (
				<option
					key={typeof val === 'object' ? i : val}
					value={val}
				>
					{ /// prevent potential crash cause by react trying to render JSON in the html
						typeof label === 'string' 
							? label
							: String(label) // this probably wont look pretty but its better than the alternative
					}
				</option>	
			)
		});
	}, [ options ]);

	const inputClasses = classNames({	
		'apm-mi-form-control': true,
		[props.className]: !!props.className,
	});


	return (
		<select
			{...props}
			className={inputClasses}
			{...inputState}
			name={props.name}
		>
			<option
				disabled={props.required}
				value="" 
			>
				{ placeholder }
			</option>
			{ formattedOptions }
		</select>
	);
}

SelectInput.propTypes = {
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	options: PropTypes.array,
	parse: PropTypes.func,
	validation: PropTypes.func,
};

SelectInput.defaultProps = {
	getOptionLabel: (val) => { return val },
	getOptionValue: (val) => { return val },
	options: []
};

export default SelectInput;
