import React from 'react';
import PropTypes from 'prop-types';

// TODO this is not implemented on the backend
const ExportPDF = ({ disabled, pdfURL }) => (
	<a
		className="btn-table"
		data-for="table-tooltip"
		data-tip="Export To PDF"
		disabled={disabled}
		download={true}
		href={pdfURL}
	>
		<i className="fal fa-file-pdf" />
	</a>
);

ExportPDF.propTypes = {
	disabled: PropTypes.bool,
	pdfURL: PropTypes.string.isRequired
};

export default ExportPDF;
