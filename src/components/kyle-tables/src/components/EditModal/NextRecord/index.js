import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';

export const NextRecord = ({ hasNext, onNextClick }) => {
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
					? 'Next Record'
					: 'No Next Record'
				}
			</p>
		</animated.div>
	);
};

NextRecord.propTypes = {
	onNextClick: PropTypes.func
};
