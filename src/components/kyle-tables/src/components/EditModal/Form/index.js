import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ columns, data }) => {

	return (
		<div style={{
			margin: '0 auto',
			background: 'white',
			width: '40%',
			height: '100%',
			borderRadius: '9.3px',
			border: 'solid 0.9px #979797',
			padding: '5px',
		}}>
			{ columns.map(col => col.label) }
			{ data.map(d => <p />) }
		</div>
	);
};
