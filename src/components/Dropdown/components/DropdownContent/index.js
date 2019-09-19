import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Popper from 'popper.js';
import DropdownContext from '../../utils/context';

const DropdownContent = props => {
	const [isOpen, setIsOpen] = useContext(DropdownContext);

	const popper = useRef(null);
	const ref = useRef(null);

	const { children, style, className } = props;

	const onClickOutside = (evt) => {
		
		if (!ref.current) return;
		const triggerWrapper = evt.target.closest('.APMDropdown');
		const wrapperEl = ref.current.closest('.APMDropdown');

		if (wrapperEl.isSameNode(triggerWrapper)) return;
		setIsOpen(false);
	}

	useEffect(() => {

		window.addEventListener('click', onClickOutside);
		return () => {
			window.removeEventListener('click', onClickOutside);
		}
	}, []);


	useEffect(() => {
 		if (!isOpen) return;
 		

 		const triggerEl = ref.current.previousSibling 
 			? ref.current.previousSibling
 			: ref.current.nextSibling;


		popper.current = new Popper( 
			triggerEl.firstChild,
			ref.current,
			{ 
				placement: props.placement
			}
		);
	}, [isOpen]);


	if (!isOpen) return null;

	const handleOnClick = evt => {
		evt.stopPropagation();
	}

	return (
		<div
			className={cn('APMDropdown-content', className)}
			onClick={handleOnClick}
			ref={ref}
			style={style}
		>
			{ children }
		</div>
	)
}


DropdownContent.propTypes = {
	/**
		The placement of the content relative to the dropdown trigger. 
		See https://popper.js.org/popper-documentation.html#Popper.placements
	*/
	placement: PropTypes.string
}

DropdownContent.defaultProps = {
	placement: 'bottom'
}

export default DropdownContent;

