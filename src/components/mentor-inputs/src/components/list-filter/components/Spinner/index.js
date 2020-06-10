import React from 'react';
import PropTypes from 'prop-types';

export const Spinner = ({ className }) => (
	<i className={`far fa-spinner mui-spinner ${className}`} />
);

Spinner.propTypes = {
	className: PropTypes.string
};

Spinner.defaultProps = {
	className: ''
};
