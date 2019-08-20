import React from 'react';
import PropTypes from 'prop-types';

export const NextRecord = ({ label, onClick }) => {
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
				borderTopLeftRadius: '9.3px',
				borderBottomLeftRadius: '9.3px',
				width: '64px'
			}}
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
		</div>
	);
};

NextRecord.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func
};

NextRecord.defaultProps = {
	label: 'Next Record'
};
