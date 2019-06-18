import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRowDraggable } from './tableRowDraggable';
import { TableRowDroppable } from './tableRowDroppable';
import { ExpandIcon } from './icons/expandIcon';
import { Cell } from './tableCell';

// Generates a row that just displays the data in cells
// Also can be expanded
export class TableRow extends PureComponent {

	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.object),
		customColumns: PropTypes.object,
		draggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				dragType: PropTypes.string, dragCb: PropTypes.func
			})
		]),
		editDraggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				editDragType: PropTypes.string,
				editDragCb: PropTypes.func
			})
		]),
		editMode: PropTypes.bool,
		expandable: PropTypes.bool,
		expanded: PropTypes.bool,
		model: PropTypes.object,
		onBlur: PropTypes.func,
		onOptionMatch: PropTypes.func,
		onDeleteTokenClick: PropTypes.func,
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
		editDraggable: false,
		editMode: false,
		expandable: false,
		extraColumns: [],
		model: {},
		row: {}
	};

	_onExpandClick = (event) => {
		event.stopPropagation();
		this.props._onExpandClick(this.props.rowId);
	}

	_onRowSelect = (event) => {
		this.props._onRowSelect(this.props.row);
	}

	generateCustomFilter = (col) => {
		if (typeof this.props.generateCustomFilter === 'function') {
			return this.props.generateCustomFilter(col, this.props.row);
		}

		return null;
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
			editDraggable,
			editMode,
			expandable,
			expanded,
			extraColumns,
			model,
			onBlur,
			onOptionMatch,
			onColorChange,
			onDeleteImageClick,
			onDeleteTokenClick,
			onInsertTokenClick,
			portalRef,
			selectedRows,
			rowSelected,
			row,
			rowId,
			uploadFileCb,
		} = this.props;

		let rowClass = {
			'table-row': true,
			'table-row-selected': rowSelected,
			[customClasses.tableRow]: !!customClasses.tableRow
		};

		// table row to display
		let tableRow = (
			<tr className={classNames(rowClass)}>
				{ expandable && 
					<ExpandIcon
						expanded={expanded}
						onClick={this._onExpandClick}
					/>
				}
				{ extraColumns.map((col, i) => (
					<td
						className={classNames(
							"table-cell-view text-center",
							{ "apm-cursor-p": typeof col.onClick === 'function' }
						)}
						key={`${rowId}-extra-${i}`}
						onClick={this.onExtraColClick.bind(null, col.onClick)}
					>
						{col.cell}
					</td>
				))}
				{ allowSelection &&
					<td className="table-cell-view table-cell-selector">
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
						asyncFilter={this.generateCustomFilter(col)}
						cellOptions={col.options}
						cellType={col.type}
						colId={col.id}
						customClasses={customClasses}
						customColumn={customColumns[col.id]}
						editMode={editMode}
						file={col.file}
						key={col.id}
						model={model}
						multiline={model[col.id]
							? model[col.id].multiline
							: undefined
						}
						onBlur={onBlur}
						onOptionMatch={onOptionMatch}
						onColorChange={onColorChange}
						onDeleteImageClick={onDeleteImageClick}
						onDeleteTokenClick={onDeleteTokenClick}
						onInsertTokenClick={onInsertTokenClick}
						portalRef={portalRef}
						required={col.required}
						row={row}
						rowId={rowId}
						rowSelected={rowSelected}
						tableOnInsert={col.tableOnInsert}
						tokenize={col.tokenize}
						type={col.type}
						updatable={col.updateable}
						uploadFileCb={uploadFileCb}
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
		} else if (!editMode && draggable && rowSelected) {
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
		// else if edit mode and edit row is draggable, wrap it
		} else if (editMode && editDraggable && rowSelected) {
			return (
				<TableRowDraggable
					dragCb={editDraggable.dragCb}
					dragType={editDraggable.dragType}
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
