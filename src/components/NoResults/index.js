import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const NoResults = ({ className, children }) => (
	<div className={classNames('text-success text-center font-bold', className)}>
		{children}
	</div>
);

NoResults.propTypes = {
	className: PropTypes.string
};

NoResults.defaultProps = {
	className: ''
};

