import React from 'react'
import PropTypes from 'prop-types';

export const ListItem = ({ children, deletable, editable, style }) => {
	console.log('style on list item', style);
	return (
		<li className="list-item" style={style}>
			{children}
		</li>
	);
};

ListItem.propTypes = {
	deletable: PropTypes.bool,
	editable: PropTypes.bool,
};
