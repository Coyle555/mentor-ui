import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DropdownContext from '../../utils/context';

import '../../style.less';
/** 
	The container for the family of components that comprise the dropdown
*/
const Dropdown = props => {

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
	/**
		Display the dropdown content when the component mounts instead of waiting for it to be triggered.
	*/
	openOnMount: PropTypes.bool
};

Dropdown.defaultProps = {
	openOnMount: false
};

export default Dropdown;