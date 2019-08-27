import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const FileField = ({ colId, onDeleteClick, rowId, value }) => (

	<div className="file-input-container">
		{ value &&
			<div className="file-display">
				<a href={value} download className="file-link">File</a>
				<p
					className="file-delete"
					onClick={() => onDeleteClick(rowId, colId)}
				>
					Delete File
				</p>
			</div>
		}
		<div className="file-input" style={{ width: !!value ? '75%' : '100%' }}>
			<FileInput label="Upload File" />
		</div>
	</div>
);

FileField.propTypes = {
	colId: PropTypes.string,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	value: PropTypes.string
};
