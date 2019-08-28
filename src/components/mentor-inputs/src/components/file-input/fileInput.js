import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';

import '../../styles/index.less';

const FileInput = ({ label, name, onDrop }) => {
	
	const dropzoneDrop = useCallback((acceptedFiles, rejectedFiles) => {
		if (typeof onDrop === 'function') {
			onDrop(acceptedFiles, rejectedFiles, name);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ dropzoneDrop });

	const classes = classNames({
		'mui-mi-file-input': true,
		'mui-mi-file-input-active': isDragActive
	});

	const rootProps = getRootProps({ style: { outline: 'none', height: '100%' } });

	return (
		<div {...rootProps}>
			<input {...getInputProps()} />
			<p className={classes}>{label}</p>
		</div>
	);
}

FileInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	onDrop: PropTypes.func.isRequired
};

FileInput.defaultProps = {
	label: 'Upload File(s)'
};

export default FileInput;
