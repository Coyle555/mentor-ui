import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';

import { ExpandCell } from './Cell/ExpandCell';
import { Cell } from './Cell';

const ROW_DRAG_TYPE = 'TABLE_ROW_DRAG';

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
	_onExpandClick,
	_onRowSelect
}) => {

	const rowClass = {
		'table-row': true,
		'table-row-selected': rowSelected,
		[customClasses.tableRow]: !!customClasses.tableRow
	};

	let collectedProps;
	let dragRef;

	if (draggable) {
		[collectedProps, dragRef] = useDrag({ item: { id: rowId, row, type: ROW_DRAG_TYPE } });
	}

	// table row to display
	return (
		<tr
			className={classNames(rowClass)}
			ref={dragRef}
		>
			{ draggable &&
				<td className={classNames({
					'table-cell-view table-drag-icon': true,
					'table-btn-border': !expandable && rowButtons.length === 0
				})}>
					<i className="fas fa-grip-vertical" />
				</td>
			}
			{ expandable && 
				<ExpandCell
					expanded={expanded}
					lastBtn={rowButtons.length === 0}
					onClick={useCallback((event) => {
						event.stopPropagation();
						_onExpandClick(rowId);
					}, [rowId])}
				/>
			}
			{ rowButtons.map((btn, i) => (
				<td
					className={classNames({
						'table-cell-view table-row-button': true,
						'table-btn-border': rowButtons.length === i + 1
					})}
					key={`${rowId}-extra-${i}`}
					onClick={() => typeof btn.onClick === 'function'
						? btn.onClick(row)
						: null
					}
				>
					{btn.icon}
				</td>
			))}
			{ allowSelection &&
				<td className="table-cell-view">
					<div className="pretty p-icon">
						<input
							checked={!!rowSelected}
							onChange={useCallback(() => {
								_onRowSelect(row);
							}, [row])}
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
					key={col.id}
					parse={col.parse}
					row={row}
					type={col.type}
					value={row[col.id]}
				/>
			))}
		</tr>
	);
}

TableRow.propTypes = {
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

TableRow.defaultProps = {
	columns: [],
	customClasses: {},
	customColumns: {},
	draggable: false,
	expandable: false,
	rowButtons: [],
	row: {}
};
