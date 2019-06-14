import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Record count displays the current number of entries being viewed versus
// the total number of entries
export const RecordCount = ({currentPage, entriesViewable, pageSize, recordCount}) => (
	<p>
		{`Showing `}
		<b>
			{ entriesViewable > 0
				? ((pageSize * (currentPage - 1)) + 1)
				: 0
			}
		</b>
		{` to `}
		<b>
			{(pageSize * (currentPage - 1)) + entriesViewable}
		</b>
		{` of `}
		<b>{recordCount}</b>
		{` records`}
	</p>
);

RecordCount.propTypes = {
	currentPage: PropTypes.number.isRequired,
	entriesViewable: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	recordCount: PropTypes.number.isRequired
};

RecordCount.defaultProps = {
	currentPage: 1,
	entriesViewable: 25,
	pageSize: 25,
	recordCount: 0
};
