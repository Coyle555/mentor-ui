import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';

export const PreviousRecord = ({ label, hasPrevious, onPreviousClick }) => {
	const previousClasses = classNames({
		'previous-record': true,
		'end-of-previous-records': !hasPrevious
	});

	const motionProps = useSpring({
		from: { width: '0px' },
		to: { width: '64px' }
	});

	return (
		<animated.div
			className={previousClasses}
			onClick={onPreviousClick}
			style={motionProps}
		>
			<p className="previous-record-label">
				{ hasPrevious
					? label
					: 'No Previous Record'
				}
			</p>
		</animated.div>
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
