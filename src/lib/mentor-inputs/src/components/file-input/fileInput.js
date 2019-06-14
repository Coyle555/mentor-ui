import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import '../../styles/index.less';

class FileInput extends Component {
	
	static propTypes = {
		name: PropTypes.string,
		onDrop: PropTypes.func.isRequired
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		const { name } = this.props;

		this.props.onDrop(acceptedFiles, rejectedFiles, name);
	}

	render() {
		const {
			children,
			name,
			...props
		} = this.props;

		return (
			<Dropzone
				activeClassName="apm-mi-file-input-active"
				className="apm-mi-file-input"
				{...props}
				name={name}
				onDrop={this.onDrop}
			>
				{children}
			</Dropzone>
		);
	}
}

export default FileInput;
