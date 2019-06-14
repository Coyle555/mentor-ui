import React from 'react';
import PropTypes from 'prop-types';

export const PreviousButton = ({hasPrevious, onClick}) => (
	<button
		disabled={!hasPrevious}
		onClick={onClick}
		type="button"
	>
		<i className="fas fa-chevron-left" /> Previous
	</button>
);

PreviousButton.propTypes = {
	hasPrevious: PropTypes.bool,
	onClick: PropTypes.func
};

PreviousButton.defaultProps = {
	hasPrevious: false
};
