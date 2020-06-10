import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const statusText = {
  400: 'Route not found',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Resource not found',
  500: 'Server Error',
  502: 'Forbidden Gateway'
};

const ErrorPage = ({ children, status }) => (
  <div className="mui-errorpage">
    <h1>{status}</h1>
    <h3>{statusText[status] || 'Something went wrong'}</h3>
    <div className="error-desc">
      {children}
    </div>
  </div>
);

ErrorPage.propTypes = {
  status: PropTypes.number,
};

export { ErrorPage };