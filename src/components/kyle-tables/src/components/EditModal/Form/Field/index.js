import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { getMentorInput } from 'mentor-inputs';

export const Field = ({ color, value }) => {

	if (color) {
		return <ColorField color={value} />;
	}

	return null;
}

Field.propTypes = {
	color: PropTypes.bool
};

Field.defaultProps = {
	color: false
};
