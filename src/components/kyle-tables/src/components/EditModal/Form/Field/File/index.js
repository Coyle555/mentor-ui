import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const FileField = ({ onDeleteClick, value }) => (

	<div className="file-input-container">
		<div className="file-display">
			<a href={value} download className="file-link">File</a>
			<p className="file-delete">Delete File</p>
			{/*onClick={() => onDeleteClick(rowId, colId)}*/}
		</div>
		<div className="file-input">
			<FileInput label="Upload File" />
		</div>
	</div>
);

FileField.propTypes = {
	onDeleteClick: PropTypes.func,
	value: PropTypes.string
};
