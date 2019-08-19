import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.less';

export const ExpandRow = ({ expanded, lastBtn, onClick }) => {
	const iconClasses = classNames({
		'fas': true,
		'fa-caret-down': expanded,
		'fa-caret-right': !expanded,
		'fa-2x': true,
	});

	const expandBtnClasses = classNames({
		'table-expand-icon': true,
		'table-btn-border': lastBtn
	});

	return (
		<td className={expandBtnClasses} onClick={onClick}>
			<i className={iconClasses} />
		</td>
	);
};

ExpandIcon.propTypes = {
	expanded: PropTypes.bool.isRequired,
	lastBtn: PropTypes.bool,
	onClick: PropTypes.func.isRequired
};

ExpandIcon.defaultProps = {
	expanded: false,
	lastBtn: true
};
