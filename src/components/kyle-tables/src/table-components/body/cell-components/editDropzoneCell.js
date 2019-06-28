import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export class EditDropzoneCell extends PureComponent {

	static propTypes = {
		colId: PropTypes.string.isRequired,
		rowId: PropTypes.string.isRequired,
		uploadFileCb: PropTypes.func
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		if (!acceptedFiles.length) return;

		const { colId, rowId, uploadFileCb } = this.props;

		uploadFileCb(rowId, colId, acceptedFiles);
	}

	render() {
		return (
			<Dropzone onDrop={this.onDrop}>
				{({ getRootProps, getInputProps }) => {
					console.log(getRootProps);
					console.log(getInputProps);

					return (
						<div
							{...getRootProps({
								style: {
									width: '100%',
									display: 'block',
									textAlign: 'center',
									border: '2px dashed darkgrey',
									borderRadius: '5px',
									backgroundColor: 'lightgrey',
									boxSizing: 'border-box',
									outline: 'none'
								}
							})}
						>
							<input {...getInputProps()} />
							<p className="no-margins">Drop File</p>
						</div>
					);
				}}
			</Dropzone>
		)
	}
};
