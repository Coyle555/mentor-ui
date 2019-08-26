import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const ImageField = ({ onDeleteClick, value }) => (

	<div className="file-input-container">
		<div className="file-display">
			<img className="file-image" src={value} />
			<p className="file-delete">Delete Image</p>
			{/*onClick={() => onDeleteClick(rowId, colId)}*/}
		</div>
		<div className="file-input">
			<FileInput label="Upload Image" />
		</div>
	</div>
);

ImageField.propTypes = {
	onDeleteClick: PropTypes.func,
	value: PropTypes.string
};
