import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableHeader } from './Header';
import { TableBody } from './Body';
import { NoResults } from './NoResults';
import { RecordCount } from './Footer/RecordCount';
import { TableFooter } from './Footer';

// Main entry point to the table
// Describes the layout of the table
export const TableMain = ({
	columns,
	customClasses,
	dragProperties,
	dropType,
	events,
	id,
	numRowsSelected,
	pageProperties,
	rowButtons,
	rowProperties,
	selectedRows,
	sort,
	_onRowSelect,
	_onRowSelectAll
}) => {
	const tableClass = classNames({
		'table-main': true,
		[customClasses.table]: !!customClasses.table
	});

	return (
		<div className="table-main-container">
			<div className="table-content">
				{ rowProperties.data.length > 0
					? <table className={tableClass} id={id}>
						<TableHeader
							allowSelection={rowProperties.allowSelection}
							allRowsSelected={rowProperties.allowSelection
								&& numRowsSelected === rowProperties.data.length}
							columns={columns}
							customClasses={customClasses}
							draggable={dragProperties.draggable}
							expandable={!!rowProperties.ExpandComponent}
							rowButtons={rowButtons}
							sort={sort}
							_onRowSelectAll={_onRowSelectAll}
							_onSort={events.onSort}
						/>
						<TableBody
							allowSelection={rowProperties.allowSelection}
							columns={columns}
							customClasses={customClasses}
							customColumns={rowProperties.customColumns}
							dragProperties={dragProperties}
							dropType={dropType}
							rowButtons={rowButtons}
							ExpandComponent={rowProperties.ExpandComponent}
							expandable={!!rowProperties.ExpandComponent}
							rowData={rowProperties.data}
							selectedRows={selectedRows}
							_onRowSelect={_onRowSelect}
						/>
					</table>
					: <NoResults />
				}
			</div>
			{ pageProperties.enabled &&
				<TableFooter
					currentPage={pageProperties.currentPage}
					entriesViewable={rowProperties.data.length || 0}
					onNext={events.onNext}
					onPrevious={events.onPrevious}
					onGetPage={events.onGetPage}
					pageSize={pageProperties.pageSize}
					recordCount={pageProperties.recordCount}
				/>
			}
		</div>
	);
};

TableMain.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object),
	customClasses: PropTypes.object,
	dragProperties: PropTypes.shape({
		draggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				dragType: PropTypes.string,
				dragCb: PropTypes.func
			})
		])
	}),
	events: PropTypes.shape({
		onNext: PropTypes.func,
		onPrevious: PropTypes.func,
		onGetPage: PropTypes.func,
		onSort: PropTypes.func
	}),
	pageProperties: PropTypes.shape({
		enabled: PropTypes.bool,
		currentPage: PropTypes.number,
		pageSize: PropTypes.number,
		recordCount: PropTypes.number
	}),
	rowProperties: PropTypes.shape({
		customColumns: PropTypes.object,
		data: PropTypes.arrayOf(PropTypes.object),
		ExpandComponent: PropTypes.element
	}),
	sort: PropTypes.shape({
		id: PropTypes.string,
		ascending: PropTypes.bool
	}),
	_onRowSelect: PropTypes.func,
	_onRowSelectAll: PropTypes.func
};

TableMain.defaultProps = {
	customClasses: {},
	dragProperties: {},
	events: {},
	numRowsSelected: 0,
	pageProperties: {
		enabled: false
	},
	selectedRows: {},
	sort: {},
	rowProperties: {
		allowSelection: false,
		data: []
	},
	_onRowSelect: null,
	_onRowSelectAll: null
};
