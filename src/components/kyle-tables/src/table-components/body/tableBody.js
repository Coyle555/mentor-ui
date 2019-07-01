import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRow } from './tableRow';
import './styles.less';

export class TableBody extends Component {

	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		customColumns: PropTypes.object,
		editMode: PropTypes.bool,
		expandable: PropTypes.bool,
		extraColumns: PropTypes.array,
		ExpandComponent: PropTypes.element,
		dragProperties: PropTypes.shape({
			draggable: PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.object,
			]),
			editDraggable: PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.object
			])
		}),
		rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
		selectedRows: PropTypes.object,
		_onBlur: PropTypes.func,
		_onOptionMatch: PropTypes.func
	}

	static defaultProps = {
		columns: [],
		customClasses: {},
		dragProperties: {
			draggable: false,
			editDraggable: false
		},
		dropType: '',
		expandable: false,
		extraColumns: [],
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
			editMode,
			rowData,
			dragProperties,
			dropType,
			customColumns,
			expandable,
			ExpandComponent,
			extraColumns,
			generateCustomFilter,
			portalRef,
			selectedRows,
			uploadFileCb,
			_onBlur,
			_onColorChange,
			_onDeleteImageClick,
			_onOptionMatch,
			_onRowSelect,
		} = this.props;

		const { expandedRows } = this.state;

		let rows = [];

		// if not in edit mode and edit mode isn't being force toggled
		rowData.forEach((row, i) => {
			rows.push(
				<TableRow
					allowSelection={allowSelection}
					columns={columns}
					customClasses={customClasses}
					customColumns={customColumns}
					draggable={dragProperties.draggable}
					dropType={dropType}
					editDraggable={dragProperties.editDraggable}
					editMode={editMode}
					expandable={expandable}
					expanded={expandedRows[row.id]}
					extraColumns={extraColumns}
					generateCustomFilter={generateCustomFilter}
					key={row.id}
					onOptionMatch={_onOptionMatch}
					onBlur={_onBlur}
					onColorChange={_onColorChange}
					onDeleteImageClick={_onDeleteImageClick}
					portalRef={portalRef}
					selectedRows={selectedRows}
					rowSelected={!!selectedRows[row.id]}
					row={row}
					rowId={row.id}
					uploadFileCb={uploadFileCb}
					_onExpandClick={this._onExpandClick}
					_onRowSelect={_onRowSelect}
				/>
			);

			// if rows are expandable and the row is expanded
			if (expandable && expandedRows[row.id]) {
				rows.push(
					<tr key={`${row.id}-${i}`}>
						<td colSpan={extraColumns.length + 1} />
						<td
							colSpan={columns.length + 1}
							style={{ borderLeft: '1px solid #667587' }}
						>
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
			[customClasses.tableBody]: !!customClasses.tableBody
		});

		return (
			<tbody className={classList}>
				{rows}
			</tbody>
		);
	}
};
