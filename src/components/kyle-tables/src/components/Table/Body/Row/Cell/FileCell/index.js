import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './styles.less';

export const FileCell = ({ colId, editMode, rowId, uploadFileCb, value }) => (

	!editMode
		? <a download={true} href={value}>{value}</a>
		: <Dropzone
			onDrop={(acceptedFiles, rejectedFiles) => {
				if (!acceptedFiles.length) return;

				uploadFileCb(rowId, colId, acceptedFiles);
			}}
		>
			{({ getRootProps, getInputProps }) => (
				<div {...getRootProps({ className: 'mui-table-file-cell' })}>
					<input {...getInputProps()} />
					<p className="no-margins">Drop File</p>
				</div>
			)}
		</Dropzone>
);

FileCell.propTypes = {
	colId: PropTypes.string.isRequired,
	editMode: PropTypes.bool,
	rowId: PropTypes.string.isRequired,
	uploadFileCb: PropTypes.func
};

FileCell.defaultProps = {
	editMode: false
};
