import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableHeaderRow } from './Row';
import './styles.less';

export const TableHeader = ({
	allowSelection,
	allRowsSelected,
	columns,
	customClasses,
	draggable,
	expandable,
	rowButtons,
	sort,
	_onRowSelectAll,
	_onSort
}) => {
	const classList = classNames({
		[customClasses.tableHeader]: !!customClasses.tableHeader
	});

	return (
		<thead className={classList}>
			<TableHeaderRow
				allowSelection={allowSelection}
				allRowsSelected={allRowsSelected}
				columns={columns}
				customClasses={customClasses}
				draggable={draggable}
				expandable={expandable}
				rowButtons={rowButtons}
				sort={sort}
				_onRowSelectAll={_onRowSelectAll}
				_onSort={_onSort}
			/>
		</thead>
       );
};

TableHeader.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object),
	sort: PropTypes.shape({
		id: PropTypes.string,
		ascending: PropTypes.bool
	}),
	_onSort: PropTypes.func
};

TableHeader.defaultProps = {
	customClasses: {}
};
