import React from 'react';
import PropTypes from 'prop-types';

export const PreviousRecord = ({ label, hasPrevious, onClick }) => {
	return (
		<div
			onClick={onClick}
			style={{
				background: 'white',
				height: '80%',
				padding: '10px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				borderTopRightRadius: '9.3px',
				borderBottomRightRadius: '9.3px',
				width: '64px'
			}}
		>
			<p style={{
				textTransform: 'uppercase',
				letterSpacing: '1px',
				wordSpacing: '2px',
				writingMode: 'vertical-lr',
				height: '100%',
				textAlign: 'center'
			}}>
				{label}
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
	label: 'Previous'
};
