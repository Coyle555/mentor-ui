import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { convertCellToString } from '../../utils/utils';
import { AsyncDropdownCell } from './cell-components/asyncDropdownCell';
import { EditColorPicker } from './cell-components/editColorPicker';
import { EditInputCell } from './cell-components/editInputCell';
import { EditDropzoneCell } from './cell-components/editDropzoneCell';
import { EditImageCell } from './cell-components/editImageCell';
import { EditTableInputCell } from './cell-components/editTableInputCell';
import { TableListFilter } from './cell-components/listFilter';
import { TableDatePicker } from './cell-components/datePicker';
import { SelectCell } from './cell-components/selectCell';
import { asyncFilter as customFilter } from 'mentor-inputs';

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
	lookup,
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

	// determine the type of cell to render based on column data
	// no edit box if column is not in edit mode or updatable or
	// disable column is enabled and column isn't editable so just display value
	if (!rowSelected || !editMode || updatable === false || multiline) {

		if (!!image && !!value) {

			cell = <img src={value} style={{ maxWidth: '50px' }} />;

		} else if (!!file && !!value) {

			cell = <a download href={value}>{value}</a>;

		} else {
			cell = value;
		}

	} else if (!!tableOnInsert) {

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
		);

	// add a delete button to images in edit mode
	} else if (!!image && !!value) {
		cell = (
			<EditImageCell
				colId={colId}
				onDeleteClick={onDeleteImageClick}
				rowId={rowId}
				value={value}
			/>
		);
	// color picker cell
	} else if (!!color) {
		cell = (
			<EditColorPicker
				colId={colId}
				color={value}
				onColorChange={onColorChange}
				rowId={rowId}
			/>
		);
	// file dropzone cell
	} else if (!!file || !!image) {
		cell = (
			<EditDropzoneCell
				colId={colId}
				rowId={rowId}
				uploadFileCb={uploadFileCb}
			/>
		);
	} else if (!!lookup) {

		cell = (
			<AsyncDropdownCell 
				colId={colId}
				inputClass={editInputClass}
				lookup={lookup}
				onBlur={onBlur}
				required={required}
				rowId={rowId}
				value={value}
			/>
		);

	} else if (cellOptions) {
		cell = (
			<SelectCell
				colId={colId}
				inputClass={editInputClass}
				onBlur={onBlur}
				options={cellOptions}
				required={required}
				row={row}
				rowId={rowId}
				value={value}
			/>
		);
	} else if (asyncFilter) {
		cell = (
			<TableListFilter
				clearInputAfterMatch={false}
				customFilter={customFilter(asyncFilter)}
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
	} else if (type === 'datetime' || type === 'date') {
		cell = (
			<TableDatePicker
				inputClass={editInputClass}
				name={colId}
				onBlur={onBlur}
				portalRef={portalRef}
				required={required}
				row={row}
				rowId={rowId}
				value={value}
			/>
		);
	// regular editable input cell
	} else {
		cell = (
			<EditInputCell
				colId={colId}
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

	return (
		<td className={cellClass} title={title}>
			{cell}
		</td>
       );
};

Cell.propTypes = {
	asyncFilter: PropTypes.string,
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
