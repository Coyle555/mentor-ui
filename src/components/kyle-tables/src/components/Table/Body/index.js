import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRow } from './Row';
import './styles.less';

export const TableBody = ({
	allowSelection,
	columns,
	customClasses,
	customColumns,
	dragProperties,
	dropType,
	expandable,
	ExpandComponent,
	rowButtons,
	rowData,
	selectedRows,
	_onRowSelect,
}) => {
	// a map of all expanded rows only used when the table body is expandable
	const [expandedRows, setExpandedRows] = useState({});

	// when a row is clicked, keep track if it needs to be expanded or not
	const _onExpandClick = (rowId) => {
		setExpandedRows(Object.assign(
			{},
			expandedRows,
			{ [rowId]: !expandedRows[rowId] })
		);
	};

	const rows = [];

	rowData.forEach((row, i) => {
		rows.push(
			<TableRow
				allowSelection={allowSelection}
				columns={columns}
				customClasses={customClasses}
				customColumns={customColumns}
				draggable={dragProperties.draggable}
				dropType={dropType}
				expandable={expandable}
				expanded={expandedRows[row.id]}
				key={row.id}
				rowButtons={rowButtons}
				row={row}
				rowId={row.id}
				rowSelected={!!selectedRows[row.id]}
				selectedRows={selectedRows}
				_onExpandClick={_onExpandClick}
				_onRowSelect={_onRowSelect}
			/>
		);

		// if rows are expandable and the row is expanded
		if (expandable && expandedRows[row.id]) {
			rows.push(
				<tr key={`${row.id}-expand-${i}`}>
					<td
						className="table-row-expanded"
						colSpan={rowButtons.length + 1}
					/>
					<td colSpan={allowSelection
						? columns.length + 1
						: columns.length
					}>
						{ React.cloneElement(
							ExpandComponent,
							{ row }
						)}
					</td>
				</tr>
			);
		}
	});

	const classList = classNames(
		'table-body',
		{ [customClasses.tableBody]: !!customClasses.tableBody }
	);

	return (
		<tbody className={classList}>
			{rows}
		</tbody>
	);
};

TableBody.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	customColumns: PropTypes.object,
	expandable: PropTypes.bool,
	ExpandComponent: PropTypes.element,
	dragProperties: PropTypes.shape({
		draggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.object,
		]),
	}),
	rowButtons: PropTypes.arrayOf(PropTypes.object),
	rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedRows: PropTypes.object,
};

TableBody.defaultProps = {
	columns: [],
	customClasses: {},
	dragProperties: {
		draggable: {},
	},
	dropType: '',
	expandable: false,
	rowButtons: [],
	rowData: [],
	selectedRows: {}
};
