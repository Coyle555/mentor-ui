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
		excelURL: PropTypes.string,
		pdfURL: PropTypes.string,
		columns: PropTypes.arrayOf(PropTypes.shape({
			display: PropTypes.bool,
			id: PropTypes.string,
			insertable: PropTypes.bool,
			label: PropTypes.string,
			options: PropTypes.arrayOf(PropTypes.string),
			required: PropTypes.bool,
			type: PropTypes.oneOf([
				'string', 'integer', 'float', 'multiline',
				'email', 'money', 'url', 'datetime',
				'date', 'time', 'image', 'listfilter',
				'file', 'color'
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
			tip: PropTypes.string.isRequired,
			validation: PropTypes.func
		})),
		data: PropTypes.arrayOf(PropTypes.object),
		deletable: PropTypes.bool,
		deleteCb: PropTypes.func,
		displayCols: PropTypes.arrayOf(PropTypes.string),
		draggable: PropTypes.shape({
			dragType: PropTypes.string,
			dragCb: PropTypes.func
		}),
		dropType: PropTypes.string,
		editable: PropTypes.bool,
		ExpandComponent: PropTypes.element,
		exportTable: PropTypes.func,
		formFields: PropTypes.arrayOf(PropTypes.object),
		id: PropTypes.string.isRequired,
		initInsertData: PropTypes.object,
		insertable: PropTypes.bool,
		insertCb: PropTypes.func,
		loading: PropTypes.bool,
		multipleInsertion: PropTypes.bool,
		pagination: PropTypes.bool,
		queryDisabled: PropTypes.bool,
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
		excelURL: '',
		pdfURL: '',
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
		deletable: true,
		deleteCb: null,
		displayCols: [],
		draggable: null,
		dropType: '',
		editable: true,
		ExpandComponent: null,
		exportTable: null,
		filters: [],
		formFields: null,
		id: '',
		initInsertData: null,
		insertable: true,
		insertCb: null,
		multipleInsertion: true,
		pagination: true,
		queryDisabled: false,
		quickViews: [],
		rowButtons: [],
		singleInsertion: true,
		updateCb: null,
		uploadFileCb: null,
		viewColumns: true
	}

	constructor(props) {
		super(props);

		this.allRowsSelected = false;

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

	componentWillReceiveProps(nextProps) {
		if (this.props.data !== nextProps.data) {

			const { selectedRows } = this.state;

			const newSelectedRows = {};
			let numRowsSelected = 0;

			// need to cycle through the new data and turn off any
			// selected rows that were selected from the old data
			// and are not in the new data
			nextProps.data.forEach(row => {
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
		}

		if (this.props.columns !== nextProps.columns) {
			this.setState({ columns: cloneDeep(nextProps.columns) });
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

	_onRowSelect = (row) => {
		const { data } = this.props;
		const { numRowsSelected, selectedRows } = this.state;

		const isRowSelected = !selectedRows[row.id];
		const numSelected = isRowSelected
			? numRowsSelected + 1
			: numRowsSelected - 1;
		const newSelectedRows = Object.assign({}, selectedRows);

		if (isRowSelected) {
			newSelectedRows[row.id] = row;
		} else {
			delete newSelectedRows[row.id];
		}

		// user manually selected all rows
		this.allRowsSelected = Object.keys(newSelectedRows).length === data.length;

		this.setState({
			numRowsSelected: numSelected,
			selectedRows: newSelectedRows
		});
	}

	// when user clicks checkbox in header row, select all rows or turn
	// them all off
	_onRowSelectAll = (event) => {
		event.stopPropagation();

		const { data } = this.props;
		this.allRowsSelected = !this.allRowsSelected;
		const newSelectedRows = {};

		if (this.allRowsSelected) {
			data.forEach(row => {
				newSelectedRows[row.id] = row;
			});
		}

		this.setState({
			numRowsSelected: this.allRowsSelected ? data.length : 0,
			selectedRows: newSelectedRows
		});
	}

	sortFilterOptions = (filterOptions) => {
		filterOptions.sort((col1, col2) => {
			if (col1.label < col2.label) {
				return -1;
			}

			if (col1.label > col2.label) {
				return 1;
			}

			return 0;
		});

		return filterOptions;
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

		const recordProperties = {
			entriesViewable: this.props.data.length,
			currentPage: this.props.currentPage,
			count: this.props.recordCount
		};

		let filterOptions = cloneDeep(this.props.columns);
		filterOptions = this.sortFilterOptions(filterOptions);

		const HeaderComponent = (
			<Header
				filter={{
					disabled: this.props.queryDisabled,
					exportSearch: typeof this.props.exportTable === 'function'
						? this.exportTableInsert
						: null,
					initTokens: this.props.filters,
					onTokenAdd: this._loadFilterChange,
					onTokenRemove: this._loadFilterChange,
					options: filterOptions
				}}
				toolbar={{
					columns: this.prepColumnsForHeader(this.state.columns),
					csvURL: this.props.csvURL,
					customToolbarButtons: this.props.customToolbarButtons,
					deletable: this.props.deletable,
					editable: this.props.editable,
					editMode: this.state.editMode,
					excelURL: this.props.excelURL,
					tableId: this.props.id,
					insertable: this.props.insertable,
					loading: this.props.loading,
					multipleInsertion: this.props.multipleInsertion,
					numRowsSelected: this.state.numRowsSelected,
					onDeleteClick: this._onDeleteClick,
					onDisplayColChange: this._onDisplayColChange,
					onEditClick: this._onEditClick,
					onInsertClick: this._onInsertClick,
					onQuickViewColChange: this._onQuickViewColChange,
					pdfURL: this.props.pdfURL,
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
						editMode: this.state.editMode,
						ExpandComponent: this.props.ExpandComponent,
					}}
					recordProperties={recordProperties}
					dragProperties={{
						draggable: this.props.draggable,
					}}
					dropType={this.props.dropType}
					pageProperties={{
						enabled: this.props.pagination,
						currentPage: this.props.currentPage,
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
		const { data, formFields, initInsertData } = this.props;
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
					data={Object.keys(selectedRows).length > 0
						? data.map(d => selectedRows[d.id])
						: data
					}
					editMode={editMode || true}
					fields={cloneDeep(columns)}
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
