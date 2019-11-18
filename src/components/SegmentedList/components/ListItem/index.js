import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ListItem = ({ children, customClasses }) => {
	const itemClasses = classNames(
		'list-item',
		{ [customClasses.listItem]: !!customClasses.listItem }
	);

	return (
		<li className={itemClasses}>
			{children}
		</li>
	);
};
