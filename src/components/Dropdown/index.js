import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeClass } from 'utils/composeClass';

import './style.less';

export const DropdownContext = React.createContext(null);

// The container for the dropdown
export const Dropdown = props => {

	const state = useState(props.openOnMount);

	return (
		<DropdownContext.Provider value={state}>
			<div className="APMDropdown">
				{ props.children }
			</div>
		</DropdownContext.Provider>
	)
}

Dropdown.propTypes = {
	openOnMount: PropTypes.bool
};

Dropdown.defaultProps = {
	openOnMount: false
};


export const DropdownTrigger = props => {
	const [isOpen, setIsOpen] = useContext(DropdownContext)

	const handleOnClick = evt => {
		if (!isOpen) {
			evt.stopPropagation();
			setIsOpen(true);
		}
	}

	return (
		<div
			  className={props.className}
			  onClick={handleOnClick}
		>
				{ 
					typeof props.render === 'function'
						? props.render(isOpen) 
						: props.children
				}
		</div>
	);
}

export const DropdownMenu = props => {
	const [isOpen, setIsOpen] = useContext(DropdownContext);
	const ref = useRef(null);

	const onClickOutside = () => {
		setIsOpen(false);
	}

	useEffect(() => {
		window.addEventListener('click', onClickOutside);
		return () => {
			window.removeEventListener('click', onClickOutside);
		}
	}, []);

	// center the menu and/or make sure its completely visible on the viewport
	useEffect(() => {
		if (!isOpen) return;
		//const wrapper = ref.current.parentNode.getBoundingClientRect();
		const content = ref.current.getBoundingClientRect();
		const maxWidth = window.innerWidth;

		if (content.right > maxWidth) {
			ref.current.style.left = (maxWidth - content.right - 18) + 'px';

		} else if (content.left < 0) {
			ref.current.style.left = '0px';
		}

	});

	if (!isOpen) return null;

	const handleOnClick = evt => {
		evt.stopPropagation();
	}

	return (
		<div
			className="APMDropdown-menu"
			onClick={handleOnClick}
			ref={ref}
		>
			{ props.children }
		</div>
	)
}


export const DropdownMenuItem = props => {
	const { className, children, iconClass, ...rest } = props;
  const cc = composeClass('APMDropdown', className);

	return (
		<a
			className={cc('menu-item')}
			{...rest}
		>
			<i className={cn(cc('menu-item-icon'), iconClass)} />
			{children}
		</a>
	);
}

