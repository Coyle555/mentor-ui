import React from 'react';
import PropTypes from 'prop-types';

export const Footer = ({
	currentIndex,
	hasNext,
	hasPrevious,
	onNextClick,
	onPreviousClick,
	totalCount
}) => (
	<div className="footer">
		<button
			disabled={!hasPrevious}
			onClick={onPreviousClick}
			type="button"
		>
			<i className="fas fa-chevron-left" /> Previous
		</button>
		{currentIndex} / {totalCount}
		<button
			disabled={!hasNext}
			onClick={onNextClick}
			type="button"
		>
			Next <i className="fas fa-chevron-right" />
		</button>
	</div>
);

Footer.propTypes = {
	currentIndex: PropTypes.number,
	hasNext: PropTypes.bool,
	hasPrevious: PropTypes.bool,
	onNextClick: PropTypes.func,
	onPreviousClick: PropTypes.func,
	totalCount: PropTypes.number
};

Footer.defaultProps = {
	currentIndex: 0,
	hasNext: false,
	hasPrevious: false,
	totalCount: 0
};
