import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import DropdownContext from '../../utils/context';
/**
	Wraps the ui that should trigger the visibility of the DropDown content with a click event
*/
const DropdownTrigger = props => {
	const [isOpen, setIsOpen] = useContext(DropdownContext)
	const { className, children, render } = props;

	return (
		<div
			className={className}
			onClick={() => setIsOpen(!isOpen)}
		>
				{
					typeof render === 'function'
						? render(isOpen)
						: children
				}
		</div>
	);
}

DropdownTrigger.propTypes = {
	/**
		Renders the trigger's children dynamically via render props.
		The invoked function receives a single boolean argument that indicates whether or not
		the Dropdown is currently displaying it's content. If no render prop is passed in,
		props.children will display
	*/
	render: PropTypes.func
}

export default DropdownTrigger;
