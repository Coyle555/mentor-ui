import React from 'react';
import PropTypes from 'prop-types';

export const PreviousRecord = ({ label, hasPrevious, onClick }) => {
	return (
		<div
			className="previous-record end-of-records"
			onClick={onClick}
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
