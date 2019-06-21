import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { defaults } from 'lodash';
import cn from 'classnames';
import fscreen from 'fscreen';

import Button from '../Button/index';

import './style.less';

/// reuse this hook for all full screen components
const useFullScreen = (wrapper) => {

	const [ isFullScreen, setIsFullScreen ] = useState(false);

	const toggle = () => {

		if (isFullScreen) {
			setIsFullScreen(false);
			fscreen.exitFullscreen();
			// wrapper.current.style.width = null;
			// wrapper.current.style.height = null;
		} else {
			// wrapper.current.style.width = '100%';
			// wrapper.current.style.height = '100%';			
			fscreen.requestFullscreen(wrapper.current);

			setIsFullScreen(true);
		}
	}

	return { isFullScreen,  toggle };
}


export const Modal = props => {

	const modalRef = useRef(null);

	const el = useMemo(() => {
		return document.createElement('div');
	}, []);

	const { isFullScreen, toggle } = useFullScreen(modalRef);

	useEffect(() => {
		document.body.appendChild(el);
		document.body.style.setProperty('overflow',  'hidden');

		return () => {
			document.body.removeChild(el);
			document.body.style.removeProperty('overflow');
		}
	}, []);

	if (!props.display) return null;

	const overlayClassName = cn(
		props.overlayClassName,
		'APM-modal-overlay',
		{ 'apm-fullscreen': isFullScreen }
	);

	const contentClassName = cn(
		'apm-modal-content',
		props.contentClassName,
		{ 'apm-fullscreen': isFullScreen }
	);

	const fullScreenButtonIcon = cn(
		'fa',
	  { 'fa-compress-wide': isFullScreen },
	  { 'fal fa-expand-wide fa-lg': !isFullScreen },
		'fa-lg',
	);

	const contentStyle = defaults({
		width: props.width,
		height: props.height,
	}, props.contentStyle);

	const handleClickOutside = evt => {

		// we only want to respond to on click events directly on the overlay
		// not on any of it's child nodes
		if (!props.closeOnOutsideClick || !evt.target.classList.contains('APM-modal-overlay')) {
			return;
		}

		if (typeof props.onClose === 'function') {
			props.onClose();
			// dont allow it to bubble up. if its a nested modal, both will close
			evt.stopPropagation();
		}
	}

	return createPortal(
		<div
			ref={modalRef}
			className={overlayClassName}
			style={props.overlayStyle}
			onClick={handleClickOutside}
			data-testid="modal-overlay"
		>
			<div
				className={contentClassName}
				style={contentStyle}
			>
				<div className="apm-modal-actions">
					{
						props.fullScreenToggle &&
						<Button
							className="apm-modal-actions-button"
							medium
							isLight
							onClick={toggle}
						>
							<i className={fullScreenButtonIcon}></i>
						</Button>
					}
					{
						!props.hideCloseButton &&
						<Button
							className="apm-modal-actions-button"
							medium
							isLight
							onClick={props.onClose}
						>
							<i className="fal fa-times fa-lg"/>
						</Button>
					}
 				</div>
				<div className="apm-modal-body">
					{ props.children }
				</div>
			</div>
		</div>
	, el)
}


Modal.defaultProps = {
	closeOnOutsideClick: true,
	contentStyle: {},
	onClose: () => { return true; },
	overlayStyle: {},
}

Modal.propTypes = {
	closeOnOutsideClick: PropTypes.bool,
	contentClassName: PropTypes.string,
	contentStyle: PropTypes.object,
	customButtons: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
	]),
	display: PropTypes.bool,
	height: PropTypes.number,
	hideCloseButton: PropTypes.bool,
	onClose: PropTypes.func,
	// onOpen: PropTypes.func,
	overlayClassName: PropTypes.string,
	overlayStyle: PropTypes.object,
	width: PropTypes.number,
};

export default Modal;
export * from './useBasicModalSettings';

