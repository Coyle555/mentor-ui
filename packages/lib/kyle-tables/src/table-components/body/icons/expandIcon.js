import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ExpandIcon = ({expanded, onClick}) => {
	const iconClasses = classNames({
		'fas': true,
		'fa-caret-down': expanded,
		'fa-caret-right': !expanded,
		'fa-2x': true
	});

	return (
		<td onClick={onClick} className="table-expand-icon">
			<i className={iconClasses} />
		</td>
	);
};

ExpandIcon.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

ExpandIcon.defaultProps = {
	expanded: false,
};
