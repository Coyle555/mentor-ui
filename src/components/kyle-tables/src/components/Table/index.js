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
	expandable,
	generateCustomFilter,
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

	let portalRef = useRef(null);

	return (
		<div
			className="table-main-container"
			ref={portalRef}
		>
			<div className="table-content">
				{ pageProperties.recordCount > 0 && rowProperties.data.length > 0
					? <table className={tableClass} id={id}>
						<TableHeader
							allowSelection={rowProperties.allowSelection}
							allRowsSelected={numRowsSelected === rowProperties.data.length}
							columns={columns}
							customClasses={customClasses}
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
							dragProperties={dragProperties}
							dropType={dropType}
							editMode={rowProperties.editMode}
							rowButtons={rowButtons}
							ExpandComponent={rowProperties.ExpandComponent}
							expandEditable={rowProperties.expandEditable}
							expandable={expandable}
							generateCustomFilter={rowProperties.generateCustomFilter}
							portalRef={portalRef.current}
							rowData={rowProperties.data}
							selectedRows={selectedRows}
							uploadFileCb={rowProperties.uploadFileCb}
							_onBlur={rowProperties._editOnBlur}
							_onOptionMatch={rowProperties._editOnOptionMatch}
							_onColorChange={rowProperties._editOnColorChange}
							_onDeleteImageClick={rowProperties._editOnDeleteImageClick}
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
	dragProperties: PropTypes.shape({
		draggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				dragType: PropTypes.string,
				dragCb: PropTypes.func
			})
		]),
		editDraggable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				editDragType: PropTypes.string,
				editDragCb: PropTypes.func
			})
		])
	}),
	recordProperties: PropTypes.shape({
		entriesViewable: PropTypes.number,
		count: PropTypes.number,
		currentPage: PropTypes.number
	}),
	sort: PropTypes.shape({
		icons: PropTypes.object,
		properties: PropTypes.object
	}),
	events: PropTypes.shape({
		onNext: PropTypes.func,
		onPrevious: PropTypes.func,
		onGetPage: PropTypes.func,
		onSort: PropTypes.func
	}),
	rowProperties: PropTypes.shape({
		data: PropTypes.arrayOf(PropTypes.object),
		insertRowCb: PropTypes.func,
		ExpandComponent: PropTypes.element,
		expandEditable: PropTypes.bool,
		customColumns: PropTypes.object,
		_onBlur: PropTypes.func,
		_onChange: PropTypes.func
	}),
	pageProperties: PropTypes.shape({
		enabled: PropTypes.bool,
		currentPage: PropTypes.number,
		pageSize: PropTypes.number,
		recordCount: PropTypes.number
	})
};

TableMain.defaultProps = {
	columns: [],
	customClasses: {},
	dragProperties: {},
	events: {},
	pageProperties: {
		enabled: true,
		recordCount: 0
	},
	recordProperties: {
		count: 0,
		currentPage: 1,
		entriesViewable: 25
	},
	rowProperties: {
		data: []
	},
	sort: {}
};
