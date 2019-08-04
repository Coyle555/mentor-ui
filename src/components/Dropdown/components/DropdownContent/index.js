import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DropdownContext from '../../utils/context';

const DropdownContent = props => {
	const [isOpen, setIsOpen] = useContext(DropdownContext);
	const ref = useRef(null);

	const onClickOutside = (evt) => {
		if (!ref.current) return;
		const triggerWrapper = evt.target.closest('div.APMDropdown');
		const wrapperEl = ref.current.closest('div.APMDropdown');
		if (wrapperEl.isSameNode(triggerWrapper)) return;
		setIsOpen(false);
	}

	useEffect(() => {
		window.addEventListener('click', onClickOutside);
		return () => {
			window.removeEventListener('click', onClickOutside);
		}
	}, []);

	// make sure its completely visible on the viewport
	useEffect(() => {
		if (!isOpen) return;
		//const wrapper = ref.current.parentNode.getBoundingClientRect();
		const content = ref.current.getBoundingClientRect();
		const maxWidth = window.innerWidth;

		// clipped on right side of screen
		if (content.right > maxWidth) {
			ref.current.style.left = (maxWidth - content.right - 18) + 'px';

		// clipped on left side of screen
		} else if (content.left < 0) {

			ref.current.style.left = '0px';

		} else {
			// TODO - center it around the Dropdown trigger (or maybe allow user to pass in position prop)
		}

	});

	if (!isOpen) return null;

	const handleOnClick = evt => {
		evt.stopPropagation();
	}

	return (
		<div
			className={cn('APMDropdown-content', className)}
			onClick={handleOnClick}
			ref={ref}
			style={props.style}
		>
			{ props.children }
		</div>
	)
}

export default DropdownContent;
