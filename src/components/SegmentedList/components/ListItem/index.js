import React from 'react'
import PropTypes from 'prop-types';

export const ListItem = ({ children, style }) => {
	return (
		<li className="list-item" style={style}>
			{children}
		</li>
	);
};
