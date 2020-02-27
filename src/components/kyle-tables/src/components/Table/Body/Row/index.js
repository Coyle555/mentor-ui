import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag, DragPreviewImage } from 'react-dnd';

import { createDragPreview } from './Drag/createDragPreview';
import { ExpandCell } from './Cell/ExpandCell';
import { Cell } from './Cell';

// Generates a row that just displays the data in cells
// Also can be expanded
export const TableRow = ({
	allowSelection,
	columns,
	customClasses,
	customColumns,
	draggable,
	expandable,
	expanded,
	rowButtons,
	rowSelected,
	row,
	rowId,
	selectedRows,
	...props
}) => {
	const [draggingRows, setDraggingRows] = useState(null);

	const _onExpandClick = useCallback((event) => {
		event.stopPropagation();
		props._onExpandClick(rowId);
	}, [props._onExpandClick, rowId]);

	const _onRowSelect = useCallback((event) => {
		if (typeof props._onRowSelect === 'function') {
			props._onRowSelect(row, event);
		}
	}, [props._onRowSelect, row]);

	const onExtraColClick = useCallback((onClick) => {
		if (typeof onClick === 'function') {
			onClick(row);
		}
	}, [row]);

	const rowClass = {
		'table-row': true,
		'table-row-selected': rowSelected,
		[customClasses.tableRow]: !!customClasses.tableRow
	};

	let drag, preview;
	let rowIds = [row.id];

	if (draggable.dragType) {
		const selectedRowIds = Object.keys(selectedRows);

		if (selectedRowIds.length > 0) {
			if (selectedRowIds.includes(row.id)) {
				rowIds = selectedRowIds;
			} else {
				rowIds = rowIds.concat(selectedRowIds);
			}
		}

		[, drag, preview] = useDrag({
			item: { type: draggable.dragType, rowIds }
		});
	}

	// table row to display
	const tableRow = (
		<tr className={classNames(rowClass)}>
			{ !!draggable.dragType &&
				<>
				<DragPreviewImage
					connect={preview}
					src={createDragPreview({
						preview: draggable.preview,
						row,
						rowIds,
						selectedRows,
					})}
				/>
				<td
					className={classNames(
						'table-cell-view table-row-button table-row-drag-btn',
						{ 'table-btn-border': !expandable && rowButtons.length === 0 }
					)}
				>
					<i
						className="fas fa-grip-vertical"
						ref={drag}
					/>
				</td>
				</>
			}
			{ rowButtons.map((btn, i) => (
				<td
					className={classNames({
						'table-cell-view table-row-button': true,
						'table-btn-border': !expandable && rowButtons.length === i + 1
					})}
					key={`${rowId}-extra-${i}`}
					onClick={() => onExtraColClick(btn.onClick)}
				>
					{btn.icon}
				</td>
			))}
			{ expandable && 
				<ExpandCell
					expanded={expanded}
					onClick={_onExpandClick}
				/>
			}
			{ allowSelection &&
				<td className="table-cell-view">
					<div className="pretty p-icon">
						<input
							checked={!!rowSelected}
							onChange={_onRowSelect}
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

	return tableRow;
};

TableRow.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object),
	customClasses: PropTypes.object,
	customColumns: PropTypes.object,
	draggable: PropTypes.shape({
		dragType: PropTypes.string,
		dragCb: PropTypes.func
	}),
	expandable: PropTypes.bool,
	expanded: PropTypes.bool,
	rowSelected: PropTypes.bool,
	row: PropTypes.object,
	rowId: PropTypes.string,
	_onExpandClick: PropTypes.func
};

TableRow.defaultProps = {
	columns: [],
	customClasses: {},
	customColumns: {},
	draggable: {},
	expandable: false,
	rowButtons: [],
	row: {}
};
