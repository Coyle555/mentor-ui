import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const FileField = ({ disabled, fieldId, onDeleteClick, rowId, uploadFile, value }) => {
	
	if (disabled && !value) {
		return (
			<p className="no-file">
				No File Uploaded
			</p>
		);
	}

	if (disabled) {
		return (
			<div className="file-input-container">
				<div className="file-display">
					<a
						className="file-link"
						download
						href={value}
						title="Download"
					>
						File
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="file-input-container">
			{ value &&
				<>
				<i
					className="far fa-trash-alt file-delete"
					onClick={() => onDeleteClick(rowId, fieldId)}
					title="Delete File"
				/>
				<div className="file-display">
					<a
						className="file-link"
						download
						href={value}
						title="Download"
					>
						File
					</a>
				</div>
				</>
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
};

FileField.propTypes = {
	colId: PropTypes.string,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	uploadFile: PropTypes.func,
	value: PropTypes.string
};
