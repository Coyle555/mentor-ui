import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({className}) => (
	<i className={`fa fa-spinner apm-spinner ${className}`} />
);

Spinner.propTypes = {
	className: PropTypes.string
};

Spinner.defaultProps = {
	className: ''
};

export default Spinner;
