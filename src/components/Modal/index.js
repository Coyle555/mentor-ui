import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { defaults } from 'lodash';
import cn from 'classnames';

import './style.less';

const ESCAPE_KEYCODE = 27;

export const Modal = props => {

	const el = useMemo(() => {
		let div = document.getElementById('mui-modal');

		if (!div) {
			div = document.createElement('div');
			div.className = 'APM-modal-wrapper';
			div.id = 'mui-modal';
		}

		return div;
	}, []);

	const closeModalOnKeyDown = useCallback(evt => {
		if (evt.keyCode === ESCAPE_KEYCODE && typeof props.onClose === 'function') {
			evt.stopPropagation();
			props.onClose();
		}
	}, [props.onClose]);

	useEffect(() => {
		document.body.appendChild(el);
		document.body.style.setProperty('overflow',  'hidden');

		return () => {
			document.body.removeChild(el);
			document.body.style.removeProperty('overflow');
		}
	}, []);

	useEffect(() => {
		if (!props.display) return;

		window.addEventListener('keydown', closeModalOnKeyDown);

		return () => {
			window.removeEventListener('keydown', closeModalOnKeyDown);
		}
	}, [props.display]);

	if (!props.display) return null;

	const overlayClassName = cn(
		{ [props.overlayClassName]: !!props.customClasses.overlay },
		'APM-modal-overlay'
	);

	const contentClassName = cn(
		'apm-modal-content',
		{ [props.customClasses.content]: !!props.customClasses.content }
	);

	const bodyClassName = cn(
		'apm-modal-body',
		{ [props.customClasses.body]: !!props.customClasses.body }
	);

	const contentStyle = defaults({
		width:  props.width,
		height: props.height
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
			className={overlayClassName}
			style={props.overlayStyle}
			onClick={handleClickOutside}
			data-testid="modal-overlay"
		>
			<div
				className={contentClassName}
				style={contentStyle}
			>
				{ !props.hideCloseButton &&
					<div className="apm-modal-actions">
						<i className="fal fa-times fa-lg close-modal" onClick={props.onClose} />
					</div>
				}
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
	customClasses: {},
	onClose: () => {},
	overlayStyle: {},
}

Modal.propTypes = {
	closeOnOutsideClick: PropTypes.bool,
	contentStyle: PropTypes.object,
	customClasses: PropTypes.shape({
		overlay: PropTypes.string,
		content: PropTypes.string,
		body: PropTypes.string
	}),
	display: PropTypes.bool,
	height: PropTypes.number,
	hideCloseButton: PropTypes.bool,
	onClose: PropTypes.func,
	overlayStyle: PropTypes.object,
	width: PropTypes.number,
};

export default Modal;
