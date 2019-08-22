import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { convertCellToString } from './utils/utils';
import { ColorCell } from './ColorCell';
import { FileCell } from './FileCell';
import { ImageCell } from './ImageCell';

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
	let title;

	// convert different data types to the proper string
	value = typeof parse === 'function'
		? parse(value)
		: convertCellToString(value, type);

	let cell = value;
	
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

	if (type === 'color') {
		cell = <ColorCell color={value} />;
	} else if (type === 'file') {
		cell = <FileCell value={value} />;
	} else if (type === 'image') {
		cell = <ImageCell value={value} />;
	}

	return (
		<td className={cellClass} title={title}>
			{cell}
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
