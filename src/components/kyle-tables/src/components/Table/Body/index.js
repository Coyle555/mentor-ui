import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRow } from './Row';
import './styles.less';

export class TableBody extends Component {

	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		customColumns: PropTypes.object,
		expandable: PropTypes.bool,
		ExpandComponent: PropTypes.element,
		draggable: PropTypes.bool,
		rowButtons: PropTypes.arrayOf(PropTypes.object),
		rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
		selectedRows: PropTypes.object,
	}

	static defaultProps = {
		columns: [],
		customClasses: {},
		draggable: false,
		dropType: '',
		expandable: false,
		rowButtons: [],
		rowData: [],
		selectedRows: {}
	}

	constructor(props) {
		super(props);

		// @expandedRows: a hash map of all expanded rows
		// 	only used when the table body is expandable
		this.state = {
			expandedRows: {}
		};
	}

	// when a row is clicked, keep track if it needs to be expanded or not
	_onExpandClick = (rowId) => {
		const newExpandedRows = Object.assign({},
			this.state.expandedRows,
			{ [rowId]: !this.state.expandedRows[rowId] });

		this.setState({ expandedRows: newExpandedRows });
	}

	render() {
		const {
			allowSelection,
			columns,
			customClasses,
			customColumns,
			rowData,
			draggable,
			dropType,
			expandable,
			ExpandComponent,
			rowButtons,
			selectedRows,
			_onRowSelect,
		} = this.props;

		const { expandedRows } = this.state;

		let rows = [];

		rowData.forEach((row, i) => {
			rows.push(
				<TableRow
					allowSelection={allowSelection}
					columns={columns}
					customClasses={customClasses}
					customColumns={customColumns}
					draggable={draggable}
					dropType={dropType}
					expandable={expandable}
					expanded={expandedRows[row.id]}
					key={row.id}
					rowButtons={rowButtons}
					row={row}
					rowId={row.id}
					rowSelected={!!selectedRows[row.id]}
					selectedRows={selectedRows}
					_onExpandClick={this._onExpandClick}
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
						<td colSpan={columns.length + 1}>
							{ React.cloneElement(
								ExpandComponent,
								{ row }
							)}
						</td>
					</tr>
				);
			}
		});

		const classList = classNames({
			'table-body': true,
			[customClasses.tableBody]: !!customClasses.tableBody
		});

		return (
			<tbody className={classList}>
				{rows}
			</tbody>
		);
	}
};
