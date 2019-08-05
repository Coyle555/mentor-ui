import React, {
	useContext,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeClass } from 'utils/composeClass';

import DropdownContext from '../../utils/context';

/**
	A single menu item link for a DropdownMenu
*/
const DropdownMenuItem = props => {
	const {
		className,
		children,
		iconClass,
		onClick,
		closeOnClick,
		...rest
	} = props;

	const [isOpen, setIsOpen] = useContext(DropdownContext);
	const setIsOpenFalse = setIsOpenWrapper(false, setIsOpen);
	const cc = composeClass('APMDropdown', className);

	return (
		<a
			className={cc('menu-item')}
			onClick={onClickHandler(
				onClick,
				closeOnClick,
				setIsOpenFalse,
			)}
			{...rest}
		>
			<i className={cn(cc('menu-item-icon'), iconClass)} />
			{children}
		</a>
	);
}

function setIsOpenWrapper(bool, setIsOpen) {
	return () => {
		setIsOpen(bool);
	};
};

function onClickHandler(onClick, closeOnClick, setIsOpenFalse) {
	return (event) => {
		onClick(event);

		if (closeOnClick)
			setIsOpenFalse();
	};
};

DropdownMenuItem.propTypes = {
	/**
		Additional class names for the <a> element
	*/
	className: PropTypes.string,
	/**
		An href attribute for the <a /> element
	*/
	href: PropTypes.string,
	/**
		A FontAwesome class name for the icon to the left of the achor tag's child content
	*/
	iconClass: PropTypes.string,
	/**
		An onClick function for the link
	*/
	onClick: PropTypes.func.isRequired,
	/**
		Additional styling for the anchor tag
	*/
	style: PropTypes.object
}

export default DropdownMenuItem;
