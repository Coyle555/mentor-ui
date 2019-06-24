import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeClass } from 'utils/composeClass';

/**
	A single menu item link for a DropdownMenu
*/
const DropdownMenuItem = props => {
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
	onClick: PropTypes.func,
	/**
		Additional styling for the anchor tag
	*/
	style: PropTypes.object
}

export default DropdownMenuItem;