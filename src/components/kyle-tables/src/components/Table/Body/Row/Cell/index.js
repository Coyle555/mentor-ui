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
	colId,
	customClasses,
	customColumn,
	parse,
	row,
	rowSelected,
	type,
	uploadFileCb,
	value
}) => {
	const cellClass = classNames({
		'table-cell-view': true,
		[customClasses.tableCell]: !!customClasses.tableCell
	});

	const _origValue = value;
	let cell;
	let title;

	// convert different data types to the proper string
	value = typeof parse === 'function'
		? parse(value)
		: convertCellToString(value, type);
	
	if (type !== 'image' && !!value) {
		title = value;
	}

	if (!!customColumn) {
		cell = customColumn(row, { colId, value, _origValue });

		if (!!cell) {
			return (
				<td className={cellClass} title={title}>
					{cell}
				</td>
			);
		}
	}

	return (
		<td className={cellClass} title={title}>
			{value}
		</td>
       );
};

Cell.propTypes = {
	colId: PropTypes.string,
	customClasses: PropTypes.object,
	customColumn: PropTypes.func,
	parse: PropTypes.func,
	row: PropTypes.object,
	type: PropTypes.string,
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
