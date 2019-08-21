import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

export const NextRecord = ({ editMode, label, onClick }) => {
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

	return transitions.map(({ item, key, props }) => {
		return item && 
			<animated.div
				className="next-record"
				key={key}
				onClick={onClick}
				style={props}
			>
				<p style={{
					textTransform: 'uppercase',
					letterSpacing: '1px',
					wordSpacing: '2px',
					writingMode: 'vertical-rl',
					height: '100%',
					textAlign: 'center',
					transform: 'rotate(180deg)'
				}}>
					{label}
				</p>
			</animated.div>
	});
};

NextRecord.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func
};

NextRecord.defaultProps = {
	label: 'Next Record'
};
