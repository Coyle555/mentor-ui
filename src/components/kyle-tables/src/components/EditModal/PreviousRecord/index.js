import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const PreviousRecord = ({ label, hasPrevious, onPreviousClick }) => {
	const previousClasses = classNames({
		'previous-record': true,
		'end-of-previous-records': !hasPrevious
	});

	return (
		<div
			className={previousClasses}
			onClick={onPreviousClick}
		>
			<p className="label">
				{ hasPrevious
					? label
					: 'No Previous Record'
				}
			</p>
		</div>
	);
};

PreviousRecord.propTypes = {
	hasPrevious: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

PreviousRecord.defaultProps = {
	label: 'Previous Record'
};
