import React from 'react';
import PropTypes from 'prop-types';

const statusText = {
	400: 'Route not found',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Resource not found',
	500: 'Server Error'
};

export const ErrorPage = props => (
	<div className="middle-box text-center animated fadeInDown">
		<h1>{props.status}</h1>
		<h3 className="font-bold">{statusText[props.status] || 'Something went wrong'}</h3>
			<div className="error-desc">
				{ props.children }
		</div>
	</div>
);

ErrorPage.propTypes = {
	status: PropTypes.number,
};

// ErrorPage.defaultProps = {
// 	status: 500,
// };

