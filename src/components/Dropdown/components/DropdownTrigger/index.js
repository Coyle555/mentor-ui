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
<<<<<<< HEAD
		<span
			className={props.className}
			onClick={!props.disabled 
				? () => setIsOpen(!isOpen)  
				: null
			}
		>
				{ 
					typeof props.render === 'function'
						? props.render(isOpen, props.disabled) 
						: props.children
=======
		<div
			className={className}
			onClick={() => setIsOpen(!isOpen)}
		>
				{
					typeof render === 'function'
						? render(isOpen)
						: children
>>>>>>> c2dc23153852ed6a10f13a315d75ef115174e8d8
				}
		</span>
	);
}

DropdownTrigger.propTypes = {
	/**
<<<<<<< HEAD
		Disable onClick events
	*/
	disabled: PropTypes.bool,
	/**
		Renders the trigger's children dynamically via render props. 
		The invoked function receives a single boolean argument that indicates whether or not 
=======
		Renders the trigger's children dynamically via render props.
		The invoked function receives a single boolean argument that indicates whether or not
>>>>>>> c2dc23153852ed6a10f13a315d75ef115174e8d8
		the Dropdown is currently displaying it's content. If no render prop is passed in,
		props.children will display
	*/
	render: PropTypes.func
}

export default DropdownTrigger;
