import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../select-input/selectInput';

// an async select input
export const AsyncDropdown = ({ route, ...selectProps }) => {
	
	// const { error, getDisplayValue, onChange, onBlur, value } = useInputState(props);
	const [ options, setOptions ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	
	useEffect(() => {

		if (!route) return;
		setLoading(true);
		const xhr = new XMLHttpRequest();
		xhr.open('GET', route);

		xhr.onload = function() {
			if (!xhr.response || xhr.status !== 200) {
				return console.log('ERROR', xhr);
			}
			setLoading(false);
			setOptions(JSON.parse(xhr.response).Value);
		}

		xhr.onerror = function() {
			console.log('error', xhr);
		}

		xhr.send();

	}, [route]);


	if (loading) {
		return  <i className="fas fa-spinner fa-spin"/>;
	}

	return (
		<SelectInput 	
			{...selectProps}
			options={options}
		/>
	);
}

AsyncDropdown.propTypes = {
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	options: PropTypes.array,
	parse: PropTypes.func,
	route: PropTypes.string,
	validation: PropTypes.func,	
}

AsyncDropdown.defaultProps = {
	getOptionValue: (opt) => {
		return opt && typeof opt === 'object'
			? opt.id
			: opt
	}
}
