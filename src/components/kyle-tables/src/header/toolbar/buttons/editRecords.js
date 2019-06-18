import React from 'react';
import PropTypes from 'prop-types';

export const EditRecords = ({ disabled, editMode, onClick }) => {
	const style = {};

	if (!disabled) {
		style.color = editMode ? '#8dc63f' : 'white';
	}

	return (
		<span 
			data-for="table-tooltip"
			data-tip="Toggle Edit Mode"
		>
			<button
				className="btn-table"
				type="button"
				disabled={disabled}
				onClick={onClick}
			>
				<i className="fal fa-pencil" style={style} />
			</button>
		</span>
	);
};

EditRecords.propTypes = {
	disabled: PropTypes.bool,
	editMode: PropTypes.bool,
	onClick: PropTypes.func
};
