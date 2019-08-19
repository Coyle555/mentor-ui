import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { convertCellToString } from './utils/utils';
import { ColorCell } from './ColorCell';
import { DateCell } from './DateCell';
import { DefaultCell } from './DefaultCell';
import { FileCell } from './FileCell';
import { ImageCell } from './ImageCell';
import { ListFilterCell } from './ListFilterCell';
import { EditTableInputCell } from './TableInputCell';
import { SelectCell } from './SelectCell';

export const Cell = ({
	asyncFilter,
	cellOptions,
	cellType,
	colId,
	color,
	customClasses,
	customColumn,
	editMode,
	file,
	image,
	multiline,
	onBlur,
	onColorChange,
	onOptionMatch,
	onDeleteImageClick,
	portalRef,
	required,
	row,
	rowId,
	rowSelected,
	tableOnInsert,
	type,
	updatable,
	uploadFileCb,
	value
}) => {
	const cellClass = classNames({
		'table-cell-view': !editMode
			|| (editMode && !rowSelected)
			|| updatable === false
			|| multiline,
		'table-cell-edit': editMode
			&& rowSelected
			&& updatable !== false
			&& !multiline,
		[customClasses.tableCell]: !!customClasses.tableCell
	});

	const editInputClass = classNames({
		'table-cell-edit-input': true,
		[customClasses.tableEditCell]: !!customClasses.tableEditCell
	});

	const _origValue = value;
	let cell;
	let title;

	// convert different data types to the proper string
	value = convertCellToString(value, type);
	editMode = rowSelected && editMode && updatable !== false && !multiline;
	
	if (!image && !!value) {
		title = value;
	}

	if (!!customColumn) {
		cell = customColumn(row, { colId, editMode, rowSelected, value, _origValue });

		if (!!cell) {
			return (
				<td className={cellClass} title={title}>
					{cell}
				</td>
			);
		}
	}

	if (!!image && !!value) {
		cell = (
			<ImageCell
				colId={colId}
				editMode={editMode}
				onDeleteClick={onDeleteImageClick}
				rowId={rowId}
				value={value}
			/>
		);
	} else if ((!!file && !!value) || (editMode && !!image && !value)) {
		cell = (
			<FileCell
				colId={colId}
				editMode={editMode}
				rowId={rowId}
				uploadFileCb={uploadFileCb}
			/>
		);
	} else if (!!color && !!value) {
		cell = (
			<ColorCell
				colId={colId}
				color={value}
				editMode={editMode}
				onColorChange={onColorChange}
				rowId={rowId}
			/>
		);
	} else if (cellOptions) {
		cell = (
			<SelectCell
				colId={colId}
				editMode={editMode}
				inputClass={editInputClass}
				onBlur={onBlur}
				options={cellOptions}
				required={required}
				rowId={rowId}
				value={value}
			/>
		);
	} else if (type === 'datetime' || type === 'date') {
		cell = (
			<DateCell
				editMode={editMode}
				inputClass={editInputClass}
				name={colId}
				onBlur={onBlur}
				portalRef={portalRef}
				required={required}
				rowId={rowId}
				value={value}
			/>
		);
	} else {
		cell = (
			<DefaultCell
				colId={colId}
				editMode={editMode}
				inputClass={editInputClass}
				onBlur={onBlur}
				required={required}
				row={row}
				rowId={rowId}
				type={cellType}
				value={value}
			/>
		);
	}

	/*} else if (!!tableOnInsert) {

		cell = (
			<EditTableInputCell
				apiInfo={tableOnInsert}
				colId={colId}
				inputClass={editInputClass}
				onBlur={onBlur}
				required={required}
				row={row}
				rowId={rowId}
				type={cellType}
				value={value}
			/>
		);*/

	if (asyncFilter) {
		cell = (
			<TableListFilter
				clearInputAfterMatch={false}
				customFilter={asyncFilter}
				inputClass={editInputClass}
				matchOnEmpty={!required}
				name={colId}
				onMatch={onOptionMatch}
				options={cellOptions}
				portalRef={portalRef}
				required={required}
				rowId={rowId}
				value={value}
			/>
		);
	}

	return (
		<td className={cellClass} title={title}>
			{cell}
		</td>
       );
};

Cell.propTypes = {
	asyncFilter: PropTypes.func,
	cellClass: PropTypes.string,
	cellOptions: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	),
	colId: PropTypes.string,
	customClasses: PropTypes.object,
	customColumn: PropTypes.func,
	editMode: PropTypes.bool,
	onBlur: PropTypes.func,
	onOptionMatch: PropTypes.func,
	row: PropTypes.object,
	rowId: PropTypes.string,
	updatable: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.bool,
		PropTypes.array
	])
};

Cell.defaultProps = {
	customClasses: {}
};
