import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Spinner = ({ className, large }) => (
	<i className={cn({
		'fa fa-spinner apm-spinner': true,
		'fa-lg': large,
		[className]: !!className
	})} />
);

Spinner.propTypes = {
	className: PropTypes.string,
	large: PropTypes.bool
};

Spinner.defaultProps = {
	className: '',
	large: false
};

export default Spinner;