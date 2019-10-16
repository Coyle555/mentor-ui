import React from 'react'
import PropTypes from 'prop-types';

export const ListItem = ({ children, deletable, editable }) => {
	return (
		<li className="list-item">
			{children}
		</li>
	);
};

ListItem.propTypes = {
	deletable: PropTypes.bool,
	editable: PropTypes.bool,
};
