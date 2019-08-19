import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SelectInput } from 'mentor-inputs';

export const SelectCell = ({
	colId,
	editMode,
	inputClass,
	onBlur,
	options,
	required,
	rowId,
	value
}) => (
	!editMode
		? value
		: <SelectInput
			className={inputClass}
			data-testid="select-cell"
			name={colId}
			onBlur={(err, value, name) => onBlur(rowId, name, value)}
			options={options}
			required={required}
			value={value}
		/>
);

SelectCell.propTypes = {
	colId: PropTypes.string,
	inputClass: PropTypes.string,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.string),
	required: PropTypes.bool,
	rowId: PropTypes.string,
	value: PropTypes.string
};

SelectCell.defaultProps = {
	options: []
};
