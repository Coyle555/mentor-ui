import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { getMentorInput } from 'mentor-inputs';

const EPSILON = 0.00000001;

// edit a regular text input cell
// updated data is sent to server when the input box loses focus or the user
// hits enter
export const DefaultCell = ({ colId, editMode, inputClass, required, rowId, type, value }) => {

	if (!editMode) {
		return value;
	}

	const origValue = useRef(value)

	function _onBlur(error, value, name) {
		if (error) return;

		// add an epsilon check to deal with floating point arithmetic
		// to make sure a change in float input is large enough to update
		if (type === 'float' && Math.abs(value - origValue.current) < EPSILON) {

			return;
		}

		origValue.current = value;
		onBlur(rowId, name, value);
	}

	const Input = getMentorInput(type);

	return (
		<Input
			className={inputClass}
			data-testid="edit-input"
			name={colId}
			onBlur={_onBlur}
			required={required}
			value={value}
		/>
	);
}

DefaultCell.propTypes = {
	colId: PropTypes.string,
	editMode: PropTypes.bool,
	inputClass: PropTypes.string,
	onBlur: PropTypes.func,
	required: PropTypes.bool,
	rowId: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

DefaultCell.defaultProps = {
	editMode: false,
	type: 'string',
	value: ''
};
