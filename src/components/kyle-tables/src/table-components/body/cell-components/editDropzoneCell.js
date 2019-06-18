import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export class EditDropzoneCell extends PureComponent {

	static propTypes = {
		path: PropTypes.string.isRequired,
		rowId: PropTypes.string.isRequired,
		uploadFileCb: PropTypes.func
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		if (!acceptedFiles.length) return;

		const { path, rowId } = this.props;

		this.props.uploadFileCb(rowId, path, acceptedFiles);
	}

	render() {
		return (
			<Dropzone
				accept={this.props.mimeType}
				style={{
					width: '100%',
					height: '40px',
					display: 'block',
					lineHeight: '40px',
					textAlign: 'center',
					border: '2px dashed darkgrey',
					borderRadius: '5px',
					backgroundColor: 'lightgrey',
					boxSizing: 'border-box'
				}}
				activeStyle={{
					border: '2px solid darkgrey'
				}}
				rejectStyle={{
					border: '2px solid red'
				}}
				onDrop={this.onDrop}
			>
				<p className="no-margins">Drop File</p>
			</Dropzone>
		)
	}
};
