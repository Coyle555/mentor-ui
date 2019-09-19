import React from 'react';
import PropTypes from 'prop-types';

export const Spinner = ({className}) => (
	<i className={`far fa-spinner apm-spinner ${className}`} />
);

Spinner.propTypes = {
	className: PropTypes.string
};

Spinner.defaultProps = {
	className: ''
};
