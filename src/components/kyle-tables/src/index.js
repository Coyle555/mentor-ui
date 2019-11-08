import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

import { Header } from './components/Header';
import { TableMain } from './components/Table';
import { Loading } from './components/Loading';
import { EditModal } from './components/EditModal';
import InsertForm from 'insert-popup-form';

import './styles.less';

// switch sorts
const sortMap = {
	ASC: 'DESC',
	DESC: 'ASC'
};

const DEFAULT_PAGE = 1;

// Table with filters to be rendered after data is loaded
export class Table extends Component {

	static propTypes = {
		allowSelection: PropTypes.bool,
		csvURL: PropTypes.string,
		columns: PropTypes.arrayOf(PropTypes.shape({
			display: PropTypes.bool,
			id: PropTypes.string.isRequired,
			insertable: PropTypes.bool,
			label: PropTypes.string,
			options: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.string)]),
			required: PropTypes.bool,
			type: PropTypes.oneOf([
				'string', 'integer', 'float', 'multiline',
				'email', 'money', 'url', 'datetime',
				'date', 'image', 'listfilter',
				'file', 'color', 'boolean', 'select',
				'textarea'
			]),
			updateable: PropTypes.bool
		})),
		currentPage: PropTypes.number,
		customClasses: PropTypes.shape({
			container: PropTypes.string,
			table: PropTypes.string,
			tableBody: PropTypes.string,
			tableHeader: PropTypes.string,
			tableHeaderRow: PropTypes.string,
			tableHeaderCell: PropTypes.string,
			tableRow: PropTypes.string,
			tableCell: PropTypes.string
		}),
		customColumns: PropTypes.object,
		customLayout: PropTypes.func,
		customToolbarButtons: PropTypes.arrayOf(PropTypes.shape({
			icon: PropTypes.element.isRequired,
			onClick: PropTypes.func.isRequired,
			tip: PropTypes.string.isRequired
		})),
		data: PropTypes.arrayOf(PropTypes.object),
		deleteCb: PropTypes.func,
		displayCols: PropTypes.arrayOf(PropTypes.string),
		draggable: PropTypes.shape({
			dragType: PropTypes.string,
			dragCb: PropTypes.func
		}),
		dropType: PropTypes.string,
		ExpandComponent: PropTypes.element,
		exportTable: PropTypes.func,
		formFields: PropTypes.arrayOf(PropTypes.object),
		getRowName: PropTypes.func,
		id: PropTypes.string.isRequired,
		initInsertData: PropTypes.object,
		insertCb: PropTypes.func,
		loading: PropTypes.bool,
		multipleInsertion: PropTypes.bool,
		onRowSelect: PropTypes.func,
		pagination: PropTypes.bool,
		quickViews: PropTypes.arrayOf(PropTypes.object),
		recordCount: PropTypes.number,
		rowButtons: PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.element.isRequired,
				onClick: PropTypes.func.isRequired
			})
		),
		singleInsertion: PropTypes.bool,
		sortDir: PropTypes.oneOf(['ASC', 'DESC']),
		sortId: PropTypes.string,
		updateCb: PropTypes.func,
		uploadFileCb: PropTypes.func,
		viewColumns: PropTypes.bool
	}

	static defaultProps = {
		allowSelection: true,
		csvURL: '',
		columns: [],
		customClasses: {
			container: '',
			table: '',
			tableBody: '',
			tableHeader: '',
			tableHeaderRow: '',
			tableHeaderCell: '',
			tableRow: '',
			tableCell: '',
			tableEditCell: ''
		},
		customColumns: {},
		customToolbarButtons: [],
		customLayout: null,
		currentPage: DEFAULT_PAGE,
		data: [],
		deleteCb: null,
		displayCols: [],
		draggable: null,
		dropType: '',
		ExpandComponent: null,
		exportTable: null,
		filters: [],
		formFields: null,
		getRowName: null,
		id: '',
		initInsertData: null,
		insertCb: null,
		multipleInsertion: true,
		onRowSelect: null,
		pagination: true,
		quickViews: [],
		rowButtons: [],
		singleInsertion: true,
		updateCb: null,
		uploadFileCb: null,
		viewColumns: true
	}

	constructor(props) {
		super(props);

		this.lastSelectedRowIndexStack = [];

		this.el = document.createElement('div');
		this.el.id = 'mui-table-edit-root';
		this.el.className = 'table-edit-mode';
		document.body.appendChild(this.el);

		// @columns{[object]) - list of fields describing the columns in the table
		// @editMode(bool) - toggle for edit mode of table
		// @insertMode(bool) - toggle for insertion mode of table
		// @insertType(string) - type of insertion to use when
		// 	inserting records; either single or multiple
		// @numRowsSelected: number of rows currently selected
		// @selectedRows: map of all the rows the user has selected
		this.state = {
			columns: cloneDeep(this.props.columns),
			editMode: false,
			insertMode: false,
			insertType: 'single',
			numRowsSelected: 0,
			selectedRows: {}
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {

			const { selectedRows } = this.state;

			const newSelectedRows = {};
			let numRowsSelected = 0;

			// need to cycle through the new data and turn off any
			// selected rows that were selected from the old data
			// and are not in the new data
			this.props.data.forEach(row => {
				// if selected row is in new data add it to new
				// selected rows
				if (row && selectedRows[row.id]) {
					newSelectedRows[row.id] = row;
					numRowsSelected++;
				}
			});

			this.setState({
				numRowsSelected,
				selectedRows: newSelectedRows
			});
			this.lastSelectedRowIndex = -1;
		}

		if (this.props.columns !== prevProps.columns) {
			this.setState({ columns: cloneDeep(this.props.columns) });
		}
	}

	componentWillUnmount() {
		document.body.removeChild(this.el);
	}

	// Retrieve next page of records
	_loadNextPage = () => {
		this.props.handleTableChange({
			pageSize: this.props.pageSize,
			currentPage: this.props.currentPage + 1,
			sortId: this.props.sortId,
			sortDir: this.props.sortDir, 
			filters: this.props.filters
		});
	}

	// Retrieve previous page of records
	_loadPrevPage = () => {
		this.props.handleTableChange({
			pageSize: this.props.pageSize,
			currentPage: this.props.currentPage - 1, 
			sortId: this.props.sortId,
			sortDir: this.props.sortDir, 
			filters: this.props.filters
		});
	}

	// Load a page of records with the page given by user
	// @pageNum(number) - Page number to load
	_loadGetPage = (pageNum) => {
		this.props.handleTableChange({
			pageSize: this.props.pageSize,
			currentPage: pageNum, 
			sortId: this.props.sortId, 
			sortDir: this.props.sortDir,
			filters: this.props.filters
		});
	}

	// Load a page of records properly sorted by a column
	// @sortCol(Object) - an object with an id property signifying
	// 			the column name
	_loadSort = (sortColId) => {
		let sortId = this.props.sortId;
		let sortDir;

		// If same column send back opposite direction
		if (sortId === sortColId) {
			sortDir = sortMap[this.props.sortDir] || 'ASC';
		// else if new column, start with desc ordering
		} else {
			sortId = sortColId
			sortDir = sortMap.ASC;
		}

		this.props.handleTableChange({
			pageSize: this.props.pageSize, 
			currentPage: this.props.currentPage, 
			sortId,
			sortDir,
			filters: this.props.filters
		});
	}

	// @filters([object]) - list of objects describing each filter to apply
	_loadFilterChange = (filters) => {
		this.props.handleTableChange({
			pageSize: this.props.pageSize,
			currentPage: DEFAULT_PAGE,
			sortId: this.props.sortId,
			sortDir: this.props.sortDir,
			filters
		});
	}

	exportTableInsert = () => {
		const { exportTable, filters } = this.props;

		if (typeof exportTable === 'function') {
			exportTable(filters);
		}
	}

	// Toggle edit mode when clicked
	_onEditClick = () => {
		this.setState({ editMode: !this.state.editMode });
	}

	// Toggle insert mode when clicked
	_onInsertClick = (insertType) => {
		this.setState({
			insertMode: !this.state.insertMode,
			insertType
		});
	}

	// user deletes row(s)
	_onDeleteClick = () => {
		const { deleteCb } = this.props;
		const { selectedRows } = this.state;

		if (typeof deleteCb === 'function') {

			deleteCb(Object.keys(selectedRows));

			this.setState({
				numRowsSelected: 0,
				selectedRows: {}
			});
		}
	}

	// Either show hidden columns or hide visible columns
	// @event(user event)
	// 	event.target.name: column id to show/hide
	// 	event.target.checked: toggle to show/hide column
	_onDisplayColChange = (event) => {
		const colId = event.target.name;
		const isChecked = event.target.checked;
		const columns = this.state.columns.slice();
		const colIndex = columns.findIndex(col => col.id === colId);

		columns[colIndex].display = isChecked;

		this.setState({ columns }, () => {
			this.afterColDisplayChange();
		});
	}

	// Show a quick view of preset columns
	// @colIds(object): columns that are to be displayed; if it is
	// 	to be displayed, it will have a field entry
	_onQuickViewColChange = (colIds) => {
		const columns = this.state.columns.slice();

		columns.forEach(col => {
			col.display = colIds.includes(col.id);
		});

		this.setState({ columns }, () => {
			this.afterColDisplayChange();
		});
	}

	afterColDisplayChange = () => {
		if (typeof this.props.onDisplayColChange === 'function') {
			const displayCols = [];

			this.state.columns.forEach(col => {
				if (col.display !== false) {
					displayCols.push(col.id);
				}
			});

			this.props.onDisplayColChange(displayCols);
		}
	}

	// update when an input text goes out of focus
	_onBlur = (rowId, colId, value) => {
		const { updateCb } = this.props;

		if (typeof updateCb === 'function') {
			updateCb(rowId, colId, value);
		}
	}

	// update when a select input field has changed
	_onOptionMatch = (rowId, colId, option) => {
		const { updateCb } = this.props;

		if (typeof updateCb === 'function') {
			updateCb(rowId, colId, option);
		}
	}

	_uploadFile = (rowId, colId, files) => {
		const { uploadFileCb } = this.props;

		if (typeof uploadFileCb === 'function') {
			uploadFileCb(rowId, colId, files);
		}
	}

	// handle deletion when user deletes a file
	_onDeleteFileClick = (rowId, colId) => {
		const { updateCb } = this.props;

		if (typeof updateCb === 'function') {
			updateCb(rowId, colId, null);
		}
	}

	// Handle submit for record insertion(s)
	_onSubmitInsertion = (insertData) => {
		const { insertCb } = this.props;

		if (typeof insertCb === 'function') {
			insertCb(insertData, this.state.insertType);
		}

		if (this.state.insertType === 'single') {
			this.setState({ insertMode: false });
		}
	}

	_onRowSelect = (row, event) => {
		const isRowSelected = !!this.state.selectedRows[row.id];

		if (isRowSelected) {
			this.handleRowDeselection(row, event);
		} else {
			this.handleRowSelection(row, event);
		}
	}

	handleRowSelection = (row, event) => {
		const { data } = this.props;
		const rowIndex = data.findIndex(d => d.id === row.id);
		const newSelectedRows = Object.assign({}, this.state.selectedRows);

		// when the user holds shift select all rows between the selected row and the last
		// row that the user selected
		if (event.nativeEvent.shiftKey && this.lastSelectedRowIndexStack.length > 0) {
			let currentIndex = this.lastSelectedRowIndexStack[this.lastSelectedRowIndexStack.length - 1];

			while (currentIndex !== rowIndex) {
				newSelectedRows[data[currentIndex].id] = data[currentIndex];

				currentIndex = rowIndex > currentIndex
					? currentIndex + 1
					: currentIndex - 1;
			}
		} 

		newSelectedRows[row.id] = row;
		this.lastSelectedRowIndexStack.push(rowIndex);

		this.setState({
			numRowsSelected: Object.keys(newSelectedRows).length,
			selectedRows: newSelectedRows
		}, () => {
			if (typeof this.props.onRowSelect === 'function') {
				this.props.onRowSelect(Object.values(this.state.selectedRows));
			}
		});
	}

	handleRowDeselection = (row, event) => {
		const { data } = this.props;
		const rowIndex = data.findIndex(d => d.id === row.id);
		const newSelectedRows = Object.assign({}, this.state.selectedRows);

		// when the user holds shift deselect all rows between the selected row and the last
		// row that the user selected
		if (event.nativeEvent.shiftKey && this.lastSelectedRowIndexStack.length > 0) {
			let currentIndex = this.lastSelectedRowIndexStack[this.lastSelectedRowIndexStack.length - 1];

			while (currentIndex !== rowIndex) {
				delete newSelectedRows[data[currentIndex].id];

				currentIndex = rowIndex > currentIndex
					? currentIndex + 1
					: currentIndex - 1;
			}

			const lastSelectedRowIndex = this.lastSelectedRowIndexStack.pop();

			// clear out all saved selected row indices between the deselected row
			// and the last selected row
			this.lastSelectedRowIndexStack = this.lastSelectedRowIndexStack.filter(idx => (
				rowIndex > lastSelectedRowIndex
					? idx > rowIndex || idx < lastSelectedRowIndex
					: idx < rowIndex || idx > lastSelectedRowIndex
			));
		}

		delete newSelectedRows[row.id];
		this.lastSelectedRowIndexStack = this.lastSelectedRowIndexStack.filter(idx => idx !== rowIndex);

		this.setState({
			numRowsSelected: Object.keys(newSelectedRows).length,
			selectedRows: newSelectedRows
		}, () => {
			if (typeof this.props.onRowSelect === 'function') {
				this.props.onRowSelect(Object.values(this.state.selectedRows));
			}
		});
	}

	// when user clicks checkbox in header row, select all rows or turn
	// them all off
	_onRowSelectAll = (event) => {
		event.stopPropagation();

		const { data } = this.props;
		const allRowsSelected = this.state.numRowsSelected === data.length;
		const newSelectedRows = {};

		if (!allRowsSelected) {
			data.forEach(row => {
				newSelectedRows[row.id] = row;
			});
		} else {
			this.lastSelectedRowIndexStack = [];
		}

		this.setState({
			numRowsSelected: !allRowsSelected ? data.length : 0,
			selectedRows: newSelectedRows
		}, () => {
			if (typeof this.props.onRowSelect === 'function') {
				this.props.onRowSelect(Object.values(this.state.selectedRows));
			}
		});
	}

	sortFilterFields = (filterFields) => {
		filterFields.sort((col1, col2) => {
			if (col1.label < col2.label) {
				return -1;
			}

			if (col1.label > col2.label) {
				return 1;
			}

			return 0;
		});

		return filterFields;
	}

	prepColumnsForHeader = (columns) => {
		return columns.filter(col => !!col.label)
			.map(col => ({
				id: col.id,
				label: col.label,
				display: col.display !== false
			}))
			.sort((col1, col2) => {
				if (col1.label < col2.label) return -1;
				if (col1.label > col2.label) return 1;

				return 0;
			});
	}

	renderLayout = () => {
		const { customClasses } = this.props;

		let filterFields = cloneDeep(this.props.columns);
		filterFields = this.sortFilterFields(filterFields);

		const HeaderComponent = (
			<Header
				filter={{
					exportSearch: typeof this.props.exportTable === 'function'
						? this.exportTableInsert
						: null,
					fields: filterFields,
					initTokens: this.props.filters,
					onTokenAdd: this._loadFilterChange,
					onTokenRemove: this._loadFilterChange,
				}}
				toolbar={{
					columns: this.prepColumnsForHeader(this.state.columns),
					csvURL: this.props.csvURL,
					customToolbarButtons: this.props.customToolbarButtons,
					deletable: typeof this.props.deleteCb === 'function',
					editable: typeof this.props.updateCb === 'function',
					editMode: this.state.editMode,
					tableId: this.props.id,
					insertable: typeof this.props.insertCb === 'function',
					loading: this.props.loading,
					multipleInsertion: this.props.multipleInsertion,
					numRowsSelected: this.state.numRowsSelected,
					onDeleteClick: this._onDeleteClick,
					onDisplayColChange: this._onDisplayColChange,
					onEditClick: this._onEditClick,
					onInsertClick: this._onInsertClick,
					onQuickViewColChange: this._onQuickViewColChange,
					quickViews: this.props.quickViews,
					selectedRows: this.state.selectedRows,
					singleInsertion: this.props.singleInsertion,
					viewColumns: this.props.viewColumns,
				}}
			/>
		);

		let TableComponent = null;

		if (this.props.loading) {
			TableComponent = <Loading />;
		} else {
			TableComponent = (
				<TableMain
					columns={this.state.columns.filter(col => {
						return col.display !== false;
					})}
					customClasses={this.props.customClasses}
					id={this.props.id}
					expandable={!!this.props.ExpandComponent}
					rowButtons={this.props.rowButtons}
					rowProperties={{
						allowSelection: this.props.allowSelection,
						customColumns: this.props.customColumns,
						data: this.props.data,
						ExpandComponent: this.props.ExpandComponent,
					}}
					dragProperties={{
						draggable: this.props.draggable,
					}}
					dropType={this.props.dropType}
					pageProperties={{
						currentPage: this.props.currentPage,
						enabled: this.props.pagination,
						entriesViewable: this.props.data.length,
						pageSize: this.props.pageSize,
						recordCount: this.props.recordCount
					}}
					events={{
						onNext: this._loadNextPage,
						onGetPage: this._loadGetPage,
						onPrevious: this._loadPrevPage,
						onSort: this._loadSort
					}}
					sort={{
						id: this.props.sortId,
						ascending: this.props.sortDir === 'ASC'
					}}
					numRowsSelected={this.state.numRowsSelected}
					selectedRows={this.state.selectedRows}
					_onRowSelect={this._onRowSelect}
					_onRowSelectAll={this._onRowSelectAll}
				/>
			);
		}

		const containerClasses = classNames({
			'table-container': true,
			[customClasses.container]: !!customClasses.container
		});

		return (
			<div className={containerClasses}>
				{ typeof this.props.customLayout === 'function'
					? this.props.customLayout(HeaderComponent, TableComponent)
					: <Fragment>
						{ HeaderComponent }
						{ TableComponent }
					</Fragment>
				}
			</div>
	       );
	}

	render() {
		const { data, formFields, getRowName, initInsertData } = this.props;
		const { columns, editMode, insertMode, insertType, selectedRows } = this.state;

		return (
			<React.Fragment>
				{ insertMode && 
					<InsertForm
						initInsertData={initInsertData}
						formFields={!!formFields
							? cloneDeep(formFields.filter(field => field.insertable !== false))
							: cloneDeep(columns.filter(col => col.insertable !== false))}
						onDisable={this._onInsertClick}
						onSubmit={this._onSubmitInsertion}
						resetForm={insertType === 'multiple'}
					/>
				}
				<EditModal
					closeEditMode={this._onEditClick}
					data={Object.keys(selectedRows).length > 0
						? data.filter(d => selectedRows[d.id])
						: data
					}
					editMode={editMode}
					fields={cloneDeep(columns)}
					getRowName={getRowName}
					onBlur={this._onBlur}
					onDeleteFileClick={this._onDeleteFileClick}
					onOptionMatch={this._onOptionMatch}
					uploadFile={this._uploadFile}
				/>
				{ this.renderLayout() }
			</React.Fragment>
		);
	}
}
