import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableHeaderRow } from './tableHeaderRow';
import './styles.less';

export const TableHeader = ({
	allowSelection,
	allRowsSelected,
	columns,
	customClasses,
	editMode,
	expandable,
	extraColumns,
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
				cells={columns}
				customClasses={customClasses}
				editMode={editMode}
				expandable={expandable}
				extraColumns={extraColumns}
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
