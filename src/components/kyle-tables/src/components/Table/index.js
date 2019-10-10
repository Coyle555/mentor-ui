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
	draggable,
	dropType,
	events,
	expandable,
	id,
	numRowsSelected,
	pageProperties,
	recordProperties,
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
				{ pageProperties.recordCount > 0 && rowProperties.data.length > 0
					? <table className={tableClass} id={id}>
						<TableHeader
							allowSelection={rowProperties.allowSelection}
							allRowsSelected={numRowsSelected === rowProperties.data.length}
							columns={columns}
							customClasses={customClasses}
							draggable={draggable}
							editMode={rowProperties.editMode}
							expandable={expandable}
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
							draggable={draggable}
							dropType={dropType}
							rowButtons={rowButtons}
							ExpandComponent={rowProperties.ExpandComponent}
							expandable={expandable}
							rowData={rowProperties.data}
							selectedRows={selectedRows}
							_onRowSelect={_onRowSelect}
						/>
					</table>
					: <NoResults />
				}
			</div>
			<TableFooter
				entriesViewable={recordProperties.entriesViewable}
				currentPage={recordProperties.currentPage}
				recordCount={recordProperties.count}
				currentPage={pageProperties.currentPage}
				pageSize={pageProperties.pageSize}
				recordCount={pageProperties.recordCount}
				onNext={events.onNext}
				onPrevious={events.onPrevious}
				onGetPage={events.onGetPage}
			/>
		</div>
	);
};

TableMain.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object),
	customClasses: PropTypes.object,
	draggable: PropTypes.bool,
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
	recordProperties: PropTypes.shape({
		entriesViewable: PropTypes.number,
		count: PropTypes.number,
		currentPage: PropTypes.number
	}),
	rowProperties: PropTypes.shape({
		customColumns: PropTypes.object,
		data: PropTypes.arrayOf(PropTypes.object),
		ExpandComponent: PropTypes.element
	}),
	sort: PropTypes.shape({
		icons: PropTypes.object,
		properties: PropTypes.object
	}),
};

TableMain.defaultProps = {
	customClasses: {}
};
