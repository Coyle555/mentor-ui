import React from 'react';
import PropTypes from 'prop-types';

import { FileInput } from 'mentor-inputs';

export const ImageField = ({ onDeleteClick, value }) => (

	<div className="file-input-container">
		{ value &&
			<div className="file-display">
				<img className="file-image" src={value} />
				<p
					className="file-delete"
					onClick={() => onDeleteClick(rowId, colId)}
				>
					Delete Image
				</p>
			</div>
		}
		<div className="file-input" style={{ width: !!value ? '75%' : '100%' }}>
			<FileInput label="Upload Image" />
		</div>
	</div>
);

ImageField.propTypes = {
	onDeleteClick: PropTypes.func,
	value: PropTypes.string
};
