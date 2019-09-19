import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const FileField = ({ fieldId, onDeleteClick, rowId, uploadFile, value }) => (

	<div className="file-input-container">
		{ value &&
			<div className="file-display">
				<a href={value} download className="file-link">File</a>
				<p
					className="file-delete"
					onClick={() => onDeleteClick(rowId, fieldId)}
				>
					Delete File
				</p>
			</div>
		}
		<div className="file-input" style={{ width: !!value ? '75%' : '100%' }}>
			<FileInput
				label="Upload File"
				name={fieldId}
				onDrop={uploadFile}
			/>
		</div>
	</div>
);

FileField.propTypes = {
	colId: PropTypes.string,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	uploadFile: PropTypes.func,
	value: PropTypes.string
};
