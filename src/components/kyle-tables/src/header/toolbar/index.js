import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import Tether from 'react-tether';

import { AddSingleRecord } from './buttons/addSingleRecord';
import { AddMultipleRecords } from './buttons/addMultipleRecords';
import { CustomButton } from './buttons/customButton';
import { DeleteRecords } from './buttons/deleteRecords';
import { EditRecords } from './buttons/editRecords';
import { ExportCSV } from './buttons/exportCSV';
import { QuickView } from './buttons/quickView';
import { ViewColumns } from './buttons/viewColumns';

export class Toolbar extends Component {

	static propTypes = {
		isToolbarCollapsed: PropTypes.bool,
		columns: PropTypes.arrayOf(PropTypes.object),
		customToolbarButtons: PropTypes.arrayOf(PropTypes.object),
		deletable: PropTypes.bool,
		editable: PropTypes.bool,
		editMode: PropTypes.bool,
		csvURL: PropTypes.string,
		id: PropTypes.string,
		insertable: PropTypes.bool,
		loading: PropTypes.bool,
		multipleInsertion: PropTypes.bool,
		numRowsSelected: PropTypes.number,
		onDisplayColChange: PropTypes.func,
		onDeleteClick: PropTypes.func,
		onEditClick: PropTypes.func,
		onInsertClick: PropTypes.func,
		onQuickViewColChange: PropTypes.func,
		quickViews: PropTypes.arrayOf(PropTypes.object),
		singleInsertion: PropTypes.bool,
		viewColumns: PropTypes.bool
	}

	static defaultProps = {
		columns: [],
		customToolbarButtons: [],
		insertable: true,
		multipleInsertion: true,
		quickViews: [],
		singleInsertion: true,
		viewColumns: true
	}

	constructor(props) {
		super(props);

		// @collapseMenuOpen: true when toolbar buttons are collapsed
		// 	into a single button and is active; false otherwise
		this.state = {
			collapseMenuOpen: false
		};
	}

	toggleCollapsedMenu = () => {
		this.setState({ collapseMenuOpen: !this.state.collapseMenuOpen });
	}

	renderCollapsedButtons = () => {
		const { loading } = this.props;
		const { collapseMenuOpen } = this.state;

		const collapseBtnClasses = classNames({
			'btn-table': true,
			'active': collapseMenuOpen
		});

		return (
			<Tether
				attachment="top right"
				targetAttachment="bottom right"
				constraints={[{ to: 'scrollParent' }]}
				style={{ zIndex: 4 }}
			>
				<button
					className={collapseBtnClasses}
					disabled={loading}
					onClick={this.toggleCollapsedMenu}
					type="button"
				>
					<i className="far fa-list-ul" />
				</button>
				{ collapseMenuOpen &&
					<div
						className="table-header-collapsed-menu"
						data-testid="collapsedMenu"
					>
						{ this.renderButtons() }
					</div>
				}
			</Tether>
		);
	}

	renderButtons() {
		const {
			columns,
			csvURL,
			customToolbarButtons,
			deletable,
			editable,
			editMode,
			tableId,
			insertable,
			loading,
			multipleInsertion,
			numRowsSelected,
			onDisplayColChange,
			onDeleteClick,
			onEditClick,
			onInsertClick,
			onQuickViewColChange, 
			quickViews,
			selectedRows,
			singleInsertion,
			viewColumns
		} = this.props;

		return (
			<Fragment>
				{ quickViews.length > 0 &&
					<Fragment>
						<div className="table-header-icon m-r-sm">
							{ quickViews.map((view, i) => (
								<QuickView
									view={view}
									onClick={onQuickViewColChange}
									disabled={loading}
									key={i}
								/>
							))}
						</div>
						<span className="table-header-icon-divider m-r-md" />
					</Fragment>
				}
				{ customToolbarButtons.map(btn => (
					<CustomButton
						className={btn.className || "btn-table"}
						disabled={loading}
						icon={btn.icon}
						key={btn.tip}
						onClick={btn.onClick}
						selectedRows={selectedRows}
						tip={btn.tip}
						validation={btn.validation}
					/>
				))}
				{ insertable && singleInsertion &&
					<AddSingleRecord
						onClick={onInsertClick}
						disabled={loading}
					/>
				}
				{ insertable && multipleInsertion &&
					<AddMultipleRecords
						onClick={onInsertClick}
						disabled={loading}
					/>
				}
				{ viewColumns && 
					<ViewColumns
						disabled={loading}
						onDisplayColChange={onDisplayColChange}
						viewColumns={columns}
					/>
				}
				{ editable &&
					<EditRecords
						disabled={loading}
						editMode={editMode}
						onClick={onEditClick}
					/>
				}
				{ deletable &&
					<DeleteRecords
						disabled={loading}
						numRowsSelected={numRowsSelected}
						onDeleteClick={onDeleteClick}
					/>
				}
				{ !!csvURL &&
					<ExportCSV
						csvURL={csvURL}
						disabled={loading}
						tableId={tableId}
					/>
				}
				<ReactTooltip
					id="table-tooltip"
					place="top"
					type="dark"
					effect="solid"
					multiline={false}
				/>
			</Fragment>
		);
	}

	render() {
		const { isToolbarCollapsed } = this.props;

		console.log(this.props);
		return (
			<div className="table-header-toolbar">
				{ isToolbarCollapsed
					? this.renderCollapsedButtons()
					: this.renderButtons()
				}
			</div>
		);
	}
}
