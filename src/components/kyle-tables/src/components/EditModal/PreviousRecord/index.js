import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';

export const PreviousRecord = ({ hasPrevious, onPreviousClick }) => {
	const previousClasses = classNames({
		'previous-record': true,
		'end-of-previous-records': !hasPrevious
	});

	const motionProps = useSpring({
		from: { opacity: 0, width: '0px' },
		to: { opacity: 1, width: '64px' }
	});

	return (
		<animated.div
			className={previousClasses}
			onClick={onPreviousClick}
			style={motionProps}
		>
			<p className="previous-record-label">
				{ hasPrevious
					? 'Previous Record'
					: 'No Previous Record'
				}
			</p>
		</animated.div>
	);
};

PreviousRecord.propTypes = {
	hasPrevious: PropTypes.bool,
	onClick: PropTypes.func,
};
