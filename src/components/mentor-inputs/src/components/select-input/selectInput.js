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
		const isGetLabelFn = typeof getOptionLabel === 'function';
		const isGetValueFn = typeof getOptionValue === 'function';

		return options.map((option, i) => {
			let label, val = option;
			
			if (isGetLabelFn) {
				/// prevent potential crash cause by react trying to render JSON in the html
				// this probably wont look pretty but its better than the alternative
				label = String(getOptionLabel(option));
			} else {
				label = typeof option === 'string' ? option : String(option);
			}

			if (isGetLabelFn) {
				val = getOptionValue(option);
			}
			
			return (
				<option
					key={i + label}
					value={val}
				>
					{ label }
				</option>	
			)
		});
	}, [ options ]);

	const inputClasses = classNames({	
		'mui-mi-input-field': true,
		[props.className]: !!props.className,
	});


	return (
		<div className={inputState.classes.inputGroup}>
			<span className={inputState.classes.addon}>
				<i className="fal fa-list" />
			</span>
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
		</div>
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
	// getOptionLabel: (val) => { return val },
	// getOptionValue: (val) => { return val },
	options: [],
	placeholder: 'Select an option'
};

export default SelectInput;
