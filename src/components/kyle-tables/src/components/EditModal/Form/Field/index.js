import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { DateField } from './Date';
import { getMentorInput, TextInput } from 'mentor-inputs';

export const Field = ({ color, type, updateable, value }) => {

	if (type === 'color') {

		return (
			<ColorField
				color={value}
				disabled={!updateable}
			/>
		);

	} else if (type === 'date' || type === 'datetime') {

		return (
			<DateField
				disabled={!updateable}
				type={type}
			/>
		);

	} else {

		const MentorInput = getMentorInput(type);

		return (
			<MentorInput
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
