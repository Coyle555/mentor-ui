import React from 'react';
import PropTypes from 'prop-types';

export const SegmentedList = ({ columns, data }) => {
	return (
		<div>
			{ columns.map(col => (
				<div>{col}</div>
			))}
			{ data.map(d => (
				columns.map(col => (
					<div>{d[col]}</div>
				))
			))}
		</div>
	);
};

SegmentedList.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired
};

SegmentedList.defaultProps = {
	columns: [],
	data: []
};
