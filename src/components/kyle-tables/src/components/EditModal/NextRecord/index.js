import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import classNames from 'classnames';

export const NextRecord = ({ hasNext, label, onNextClick }) => {
	const [show, setShow] = useState(true);

	const transitions = useTransition(
		show,
		null,
		{
			from: { width: '0px' },
			enter: { width: '64px' },
			leave: { width: '0px' }
		}
	);

	const nextClasses = classNames({
		'next-record': true,
		'end-of-next-records': !hasNext
	});

	return transitions.map(({ item, key, props }) => {
		return item && 
			<animated.div
				className={nextClasses}
				key={key}
				onClick={onNextClick}
				style={props}
			>
				<p className="label">
					{ hasNext
						? label
						: 'No Next Record'
					}
				</p>
			</animated.div>
	});
};

NextRecord.propTypes = {
	label: PropTypes.string,
	onNextClick: PropTypes.func
};

NextRecord.defaultProps = {
	label: 'Next Record'
};
