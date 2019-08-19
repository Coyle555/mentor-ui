import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableRowDraggable } from './Drag/Draggable';
import { TableRowDroppable } from './Drag/Droppable';
import { ExpandRow } from './Cell/Expand';
import { Cell } from './Cell';

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
		onBlur: PropTypes.func,
		onOptionMatch: PropTypes.func,
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
		rowButtons: [],
		row: {}
	};

	_onExpandClick = (event) => {
		event.stopPropagation();
		this.props._onExpandClick(this.props.rowId);
	}

	_onRowSelect = (event) => {
		this.props._onRowSelect(this.props.row);
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
			onBlur,
			onOptionMatch,
			onColorChange,
			onDeleteImageClick,
			portalRef,
			rowButtons,
			rowSelected,
			row,
			rowId,
			selectedRows,
			uploadFileCb,
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
					<ExpandRow
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
						asyncFilter={col.asyncFilter}
						cellOptions={col.options}
						cellType={col.type}
						colId={col.id}
						color={col.color}
						customClasses={customClasses}
						customColumn={customColumns[col.id]}
						editMode={editMode}
						file={col.file}
						image={col.image}
						key={col.id}
						multiline={!!col.multiline}
						onBlur={onBlur}
						onOptionMatch={onOptionMatch}
						onColorChange={onColorChange}
						onDeleteImageClick={onDeleteImageClick}
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
