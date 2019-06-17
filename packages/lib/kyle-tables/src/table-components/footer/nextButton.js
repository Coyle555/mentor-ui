import React from 'react';
import PropTypes from 'prop-types';

export const NextButton = ({hasNext, onClick}) => (
	<button
		disabled={!hasNext}
		onClick={onClick}
		type="button"
	>
		Next <i className="fas fa-chevron-right" />
	</button>
);

NextButton.propTypes = {
	hasNext: PropTypes.bool,
	onClick: PropTypes.func
};

NextButton.defaultProps = {
	hasNext: false
};
