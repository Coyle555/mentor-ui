import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DatePickerComposed } from 'mentor-inputs';

export const DateField = (props) => {

	return (
		<DatePickerComposed {...props} />
	);
}
