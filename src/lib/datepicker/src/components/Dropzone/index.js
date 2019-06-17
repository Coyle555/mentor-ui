import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Dropzone from 'react-dropzone';

import { composeClass } from 'utils/composeClass';

import './index.less';

const APMDropzone = ({
	className,
	iconClass,
	isDefaultStyle,
	onDragLeaveHandler,
	onDragEnterHandler,
	onDropRejectedHandler,
	onDropHandler,
	isEnabled,
	src,
	...props,
}) => {
	const [ dropEntered, setDropEntered ] = useState(false);
	const [ isFetching, setIsFetching ] = useState(false);

	function onDrop(acceptedFiles, rejectedFiles) {
		setDropEntered(false);
		setIsFetching(true);

		onDropHandler(acceptedFiles, rejectedFiles, setIsFetching);
	}

	function onDragEnter(event) {
		setDropEntered(true);

		if (onDragEnterHandler)
			onDragEnterHandler(event);
	}

	function onDragLeave(event) {
		setDropEntered(false);

		if (onDragLeaveHandler)
			onDragLeaveHandler(event);
	}

	function onDropRejected(event) {
		setIsFetching(false);

		if (onDropRejectedHandler)
			onDropRejectedHandler(event);
	}

	const cc = useMemo(() => composeClass('APMDropzone', className), []);
	const defaultIconClass = iconClass ? iconClass : 'fal fa-cloud-upload';

	return (
		<div className={cc('container')}>
			<Dropzone
				onDragLeave={onDragLeave}
				onDragEnter={onDragEnter}
				onDropRejected={onDropRejected}
				onDrop={onDrop}
				className={cn(
					cc(),
				  { [cc('default')] : isDefaultStyle },
				  { [cc('enter')] : dropEntered },
				  { [cc('fetching')] : isFetching },
				)}
				style={{
					backgroundImage: !isFetching && src? `url(${src})` : 'none',
					...props.style }}
				{...props}
			>
				<i className={cn(
					cc('icon'),
				  { [defaultIconClass]: !isFetching || dropEntered },
				  { [`${cc('icon-rotate')} fal fa-circle-notch`]: isFetching && !dropEntered },
				)}></i>
			</Dropzone>
		</div>
	)
};

APMDropzone.propTypes = {
	onDragLeaveHandler: PropTypes.func,
	onDragEnterHandler: PropTypes.func,
	onDropRejectedHandler: PropTypes.func,
	onDropHandler: PropTypes.func.isRequired,
	isEnabled: PropTypes.bool,
	src: PropTypes.string,
}

export default APMDropzone;
