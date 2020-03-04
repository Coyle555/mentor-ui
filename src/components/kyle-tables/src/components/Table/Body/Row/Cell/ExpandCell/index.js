import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ExpandCell = ({ expanded, onClick }) => {
	const iconClasses = classNames({
		'fas': true,
		'fa-caret-down': expanded,
		'fa-caret-right': !expanded,
		'fa-2x': true,
	});

	return (
		<td className="table-row-button table-btn-border" onClick={onClick}>
			<i className={iconClasses} />
		</td>
	);
};

ExpandCell.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

ExpandCell.defaultProps = {
	expanded: false,
};
