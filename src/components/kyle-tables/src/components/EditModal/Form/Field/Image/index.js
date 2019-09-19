import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const ImageField = ({ fieldId, onDeleteClick, rowId, uploadFile, value }) => (

	<div className="file-input-container">
		{ value &&
			<div className="file-display">
				<img className="file-image" src={value} />
				<p
					className="file-delete"
					onClick={() => onDeleteClick(rowId, fieldId)}
				>
					Delete Image
				</p>
			</div>
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

ImageField.propTypes = {
	fieldId: PropTypes.string,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	uploadFile: PropTypes.func,
	value: PropTypes.string
};
