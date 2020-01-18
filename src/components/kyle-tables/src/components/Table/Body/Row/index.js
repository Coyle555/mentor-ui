import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRowDraggable } from './Drag/Draggable';
import { TableRowDroppable } from './Drag/Droppable';
import { ExpandCell } from './Cell/ExpandCell';
import { Cell } from './Cell';

// Generates a row that just displays the data in cells
// Also can be expanded
export class TableRow extends PureComponent {

	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object),
		customClasses: PropTypes.object,
		customColumns: PropTypes.object,
		draggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				dragType: PropTypes.string, dragCb: PropTypes.func
			})
		]),
		expandable: PropTypes.bool,
		expanded: PropTypes.bool,
		rowSelected: PropTypes.bool,
		row: PropTypes.object,
		rowId: PropTypes.string,
		_onExpandClick: PropTypes.func
	};

	static defaultProps = {
		columns: [],
		customClasses: {},
		customColumns: {},
		draggable: false,
		expandable: false,
		rowButtons: [],
		row: {}
	};

	_onExpandClick = (event) => {
		event.stopPropagation();
		this.props._onExpandClick(this.props.rowId);
	}

	_onRowSelect = (event) => {
		if (typeof this.props._onRowSelect === 'function') {
			this.props._onRowSelect(this.props.row);
		}
	}

	onExtraColClick = (onClick) => {
		if (typeof onClick === 'function') {
			onClick(this.props.row);
		}
	}

	render() {
		const {
			allowSelection,
			columns,
			customClasses,
			customColumns,
			draggable,
			dropType,
			expandable,
			expanded,
			rowButtons,
			rowSelected,
			row,
			rowId,
			selectedRows,
		} = this.props;

		const rowClass = {
			'table-row': true,
			'table-row-selected': rowSelected,
			[customClasses.tableRow]: !!customClasses.tableRow
		};

		// table row to display
		let tableRow = (
			<tr className={classNames(rowClass)}>
				{ expandable && 
					<ExpandCell
						expanded={expanded}
						lastBtn={rowButtons.length === 0}
						onClick={this._onExpandClick}
					/>
				}
				{ rowButtons.map((btn, i) => (
					<td
						className={classNames({
							'table-cell-view table-row-button': true,
							'table-btn-border': rowButtons.length === i + 1
						})}
						key={`${rowId}-extra-${i}`}
						onClick={() => this.onExtraColClick(btn.onClick)}
					>
						{btn.icon}
					</td>
				))}
				{ allowSelection &&
					<td className="table-cell-view">
						<div className="pretty p-icon">
							<input
								checked={!!rowSelected}
								onChange={this._onRowSelect}
								type="checkbox"
							/>
							<div className="state p-info">
								<i className="icon fal fa-check" />
								<label />
							</div>
						</div>
					</td>
				}
				{ columns.map(col => (
					<Cell
						colId={col.id}
						customClasses={customClasses}
						customColumn={customColumns[col.id]}
						isUtc={col.utc}
						key={col.id}
						parse={col.parse}
						row={row}
						type={col.type}
						value={row[col.id]}
					/>
				))}
			</tr>
		);


		if (!!dropType && !rowSelected) {
			let colSpan = expandable
				? columns.length + 2
				: columns.length + 1;

			return (
				<TableRowDroppable
					colSpan={colSpan}
					desc={row.desc}
					dropType={dropType}
					name={row.name}
					rowId={rowId}
				>
					{tableRow}
				</TableRowDroppable>
			);
		// if view row is draggable, wrap row in a draggable component
		} else if (draggable && rowSelected) {
			return (
				<TableRowDraggable
					dragCb={draggable.dragCb}
					dragType={draggable.dragType}
					selectedRows={selectedRows}
					rowId={rowId}
				>
					{tableRow}
				</TableRowDraggable>
			);
		}

		return tableRow;
	}
};
