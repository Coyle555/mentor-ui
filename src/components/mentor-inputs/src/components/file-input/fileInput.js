import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';

import '../../styles/index.less';

const FileInput = ({ label, name, onDrop, ...props }) => {

	const dropzoneDrop = useCallback(acceptedFiles => {
		if (typeof onDrop === 'function') {
			onDrop(acceptedFiles, name);
		}
	}, [onDrop, name]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: dropzoneDrop
	});

	const classes = classNames({
		'mui-mi-file-input': true,
		'mui-mi-file-input-active': isDragActive
	});

	const rootProps = getRootProps({ style: { outline: 'none', height: '100%' } });

	return (
		<div {...rootProps}>
			<input
				{...getInputProps()}
				accept={props.accept}
				capture={props.capture}
				multiple={props.multiple}
			/>
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
