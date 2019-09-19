import React from 'react';
import cn from 'classnames';

import DropdownContent from '../DropdownContent';
/**
	The menu ui that displays when the Dropdown trigger was clicked
*/
const DropdownMenu = props => {
	const { children, className } = props;

	return (
		<DropdownContent className={cn(
			"APMDropdown-menu",
			className,
		)}>
			{ props.children }
		</DropdownContent>
	)
}

export default DropdownMenu;
