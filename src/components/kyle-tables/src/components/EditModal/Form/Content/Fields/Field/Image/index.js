import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const ImageField = ({ disabled, fieldId, onDeleteClick, rowId, uploadFile, value }) => {
	
	if (disabled && !value) {
		return (
			<p className="no-file">
				No Image Uploaded
			</p>
		);
	}

	if (disabled) {
		return (
			<div className="file-input-container">
				<div className="file-display">
					<img className="file-image" src={value} />
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
					title="Delete Image"
				/>
				<div className="file-display">
					<img className="file-image" src={value} />
				</div>
				</>
			}
			<div className="file-input" style={{ width: !!value ? '75%' : '100%' }}>
				<FileInput
					label="Upload Image"
					name={fieldId}
					onDrop={uploadFile}
				/>
			</div>
		</div>
	);
};

ImageField.propTypes = {
	fieldId: PropTypes.string,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	uploadFile: PropTypes.func,
	value: PropTypes.string
};
