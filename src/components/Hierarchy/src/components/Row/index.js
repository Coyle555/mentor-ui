import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Row = ({ title, subtitle }) => {
	const [loading, setLoading] = useState(false);
	console.log('Row', row);

	return (
		<div>{title}</div>	
	);
};

Row.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
