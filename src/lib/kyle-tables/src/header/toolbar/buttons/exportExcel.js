import React from 'react';
import PropTypes from 'prop-types';

// TODO this is not implemented on the backend
const ExportExcel = ({ disabled, excelURL }) => (
	<a
		className="btn-table"
		data-for="table-tooltip"
		data-tip="Export To Excel"
		disabled={disabled}
		download={true}
		href={excelURL}
	>
		<i className="fal fa-file-excel" />
	</a>
);

ExportExcel.propTypes = {
	disabled: PropTypes.bool,
	excelURL: PropTypes.string.isRequired
};

export default ExportExcel;
