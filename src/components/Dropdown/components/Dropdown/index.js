import React, { useState, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DropdownContent from '../DropdownContent';
import DropdownTrigger from '../DropdownTrigger';
import DropdownMenu from '../DropdownMenu';
import DropdownContext from '../../utils/context';

import '../../style.less';

/*
	The container for the family of components that comprise the dropdown
*/
const Dropdown = props => {
	const { openOnMount, className } = props;

	const state = useState(openOnMount);

	return (
		<DropdownContext.Provider value={state}>
			<div className={cn("APMDropdown", className)}>
				{ props.children }
			</div>
		</DropdownContext.Provider>
	)
}

Dropdown.propTypes = {
	/**
		Must contain a DropdownTrigger
	*/
	children(props) {
		let hasTrigger, hasContent;

		Children.forEach(props.children, component => {
			const componentName = component.type.__docgenInfo.displayName;
			if (componentName === 'DropdownTrigger') {
				hasTrigger = true;
			} 
		});

		if (!hasTrigger) {
			throw new Error('A <Dropdown/> requires a <DropdownTrigger /> child element');
		} 
	},
	/**
		Display the dropdown content when the component mounts instead of waiting for it to be triggered.
	*/
	openOnMount: PropTypes.bool,
	className: PropTypes.string,
};

Dropdown.defaultProps = {
	openOnMount: false,
};

export default Dropdown;
