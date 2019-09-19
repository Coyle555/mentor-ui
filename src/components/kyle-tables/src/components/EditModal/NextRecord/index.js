import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';

export const NextRecord = ({ hasNext, label, onNextClick }) => {
	const nextClasses = classNames({
		'next-record': true,
		'end-of-next-records': !hasNext
	});

	const motionProps = useSpring({
		from: { opacity: 0, width: '0px' },
		to: { opacity: 1, width: '64px' }
	});

	return (
		<animated.div
			className={nextClasses}
			onClick={onNextClick}
			style={motionProps}
		>
			<p className="next-record-label">
				{ hasNext
					? label
					: 'No Next Record'
				}
			</p>
		</animated.div>
	);
};

NextRecord.propTypes = {
	label: PropTypes.string,
	onNextClick: PropTypes.func
};

NextRecord.defaultProps = {
	label: 'Next Record'
};
