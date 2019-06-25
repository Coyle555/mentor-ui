import React from 'react';

import DropdownContent from '../DropdownContent';
/**
	The menu ui that displays when the Dropdown trigger was clicked
*/
const DropdownMenu = props => {
	return (
		<DropdownContent className="APMDropdown-menu">
			{ props.children }
		</DropdownContent>
	)
}

export default DropdownMenu;