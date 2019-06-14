import React from 'react';
import PropTypes from 'prop-types';

export const ExportCSV = ({ csvURL, disabled }) => (
	<a
		className="btn-table"
		data-for="table-tooltip"
		data-tip="Export To CSV"
		disabled={disabled}
		href={csvURL}
		download={true}
	>
		<i className="fal fa-file-csv" />
	</a>
);

ExportCSV.propTypes = {
	disabled: PropTypes.bool,
	csvURL: PropTypes.string.isRequired
};
