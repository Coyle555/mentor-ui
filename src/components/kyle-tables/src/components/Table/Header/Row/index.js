import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableHeaderCell } from './Cell';
import { TableHeaderCheckboxCell } from './CheckboxCell';

const sortDescendingIcon = <i className="fas fa-sort-down" />;
const sortAscendingIcon = <i className="fas fa-sort-up" />;

export const TableHeaderRow = ({
	allowSelection,
	allRowsSelected,
	columns,
	customClasses,
	expandable,
	rowButtons,
	sort,
	_onRowSelectAll,
	_onSort
}) => {

	const headerRowClasses = classNames({
		[customClasses.tableHeaderRow]: !!customClasses.tableHeaderRow
	});

	const headerCellClasses = classNames({
		'table-heading-cell': true,
		[customClasses.tableHeaderCell]: !!customClasses.tableHeaderCell
	});

	return (
		<tr className={headerRowClasses}>
			{ expandable &&
				<th className={classNames({
					'table-heading-cell table-expand-cell': true,
					'table-btn-border': rowButtons.length === 0
				})} />
			}
			{ rowButtons.map((btn, i) => (
				<th
					className={classNames({
						'table-heading-cell table-expand-cell': true,
						'table-btn-border': rowButtons.length === i + 1
					})}
					key={`table-extra-col-${i}`}
				/>
			))}
			{ allowSelection && 
				<TableHeaderCheckboxCell
					allRowsSelected={allRowsSelected}
					_onRowSelectAll={_onRowSelectAll}
				/>
			}
			{ columns.map((col, i, arr) => (
				<TableHeaderCell
					customClasses={customClasses}
					id={col.id}
					key={col.label}
					link={col.linkToNext || col.linkToPrev}
					onClick={_onSort}
					sort={sort.id === col.id
						? sort.ascending
							? 'ascending'
							: 'descending'
						: null
					}
					title={col.label}
					type={col.type}
				/>
			))}
		</tr>
	);
}

TableHeaderRow.propTypes = {
	allRowsSelected: PropTypes.bool,
	allowSelection: PropTypes.bool,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	customClasses: PropTypes.object,
	expandable: PropTypes.bool,
	rowButtons: PropTypes.arrayOf(PropTypes.object),
	sort: PropTypes.shape({
		id: PropTypes.string,
		ascending: PropTypes.bool
	}),
	_onRowSelectAll: PropTypes.func,
	_onSort: PropTypes.func
};

TableHeaderRow.defaultProps = {
	columns: [],
	customClasses: {},
	rowButtons: [],
	sort: {}
};
