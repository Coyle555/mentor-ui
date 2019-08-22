import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { DateField } from './Date';
import {
	getMentorInput,
	FloatInput,
	IntegerInput,
	MoneyInput,
	SelectInput,
	TextInput,
	TextareaInput,
	UrlInput
} from 'mentor-inputs';

export const Field = ({ color, options, type, updateable, value }) => {

	if (Array.isArray(options)) {

		return (
			<SelectInput
				disabled={!updateable}
				options={options}
				value={value}
			/>
		);

	} else if (type === 'color') {

		return (
			<ColorField
				color={value}
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'date' || type === 'datetime') {

		return (
			<DateField
				disabled={!updateable}
				type={type}
			/>
		);

	} else if (type === 'integer') {

		return (
			<IntegerInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'float') {

		return (
			<FloatInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'multiline') {

		return (
			<TextareaInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'money') {

		return (
			<MoneyInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'url') {

		return (
			<UrlInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else {

		return (
			<TextInput
				disabled={!updateable}
				value={value}
			/>
		);

	}
}

Field.propTypes = {
	color: PropTypes.bool,
	type: PropTypes.string,
	updateable: PropTypes.bool
};

Field.defaultProps = {
	color: false,
	updateable: true
};
