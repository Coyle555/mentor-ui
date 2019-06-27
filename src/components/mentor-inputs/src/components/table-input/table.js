import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Portal from './portal';
import { Table } from 'components/kyle-tables/src/index';
import { constructQuery } from './constructQuery';


class TableInput extends Component {

	static propTypes = {
		apiInfo: PropTypes.shape({
			apiPath: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}),
		closeTableModal: PropTypes.func,
		selectData: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.tableSettingsId = this.props.apiInfo.name;
		this.extraColumns = [{
			header: <th className="table-heading-cell table-expand-cell" />,
			cell: <i className="far fa-bullseye-pointer apm-color-dark-green" />,
			onClick: this.props.selectData
		}];

		this.state = {
			count: 0,
			filters: [],
			limit: 0,
			loading: true,
			loadingModel: true,
			model: {},
			page: 1,
			sortDir: null,
			sortId: null,
			value: []
		};
	}

	componentDidMount() {
		const { apiInfo } = this.props;

		this.getData('?limit=25');
		_api.loadModel(apiInfo.apiPath)
			.then(this.loadModel)
			.catch(err => {
				this.setState({ loadingModel: false });
			});
	}

	getData = (query = '') => {
		const { apiInfo } = this.props;
		_api.unsubscribe(this);

		// if api path has a query included in it, append the new query
		if (apiInfo.apiPath.includes('?')) {
			query = '&' + query.substr(1);
		}

		_api.get(apiInfo.apiPath + query, this)
			.then(this.loadTableData)
			.catch(err => {
				this.setState({ loading: false });
			});
	}

	updateListener = (data) => {
		this.setState({
			value: this.state.value.map(val => {
				if (val.id === data.id) {
					return data;
				}

				return val;
			})
		});
	}

	addListener = this.updateListener
	removeListener = this.updateListener
	deleteListener = this.reloadData

	loadModel = (model) => {

		this.setState({
			columns: convertModel(model),
			loadingModel: false,
			model
		});
	}

	loadTableData = (response) => {
		const { Count, Limit, Page, Value } = response;
		let sortId = null;
		let sortDir = null;

		if (response.Sort) {
			[sortId, sortDir] = response.Sort.split(' ');
		}
	
		this.setState({
			count: Count,
			limit: Limit,
			loading: false,
			page: Page,
			sortDir,
			sortId,
			value: Value
		});
	}

	customLayout = (Header, Table) => {
		return (
			<Fragment>
				<div className="subheader">
					{Header}
				</div>
				{Table}
			</Fragment>
		);
	}

	handleTableChange = (
		limit = 0,
		page = 0,
		sortId = null,
		sortDir = null,
		filters = []
	) => {
		const query = constructQuery({
			limit: 25,
			page,
			sortId,
			sortDir,
			filters
		});

		this.setState({
			filters,
			loading: true
		}, () => {
			this.getData(query);
		});
	}

	handleClickOutside = (event) => {
		this.props.closeTableInput();
	}

	render() {
		const { apiInfo } = this.props;
		const {
			columns,
			count,
			filters,
			limit,
			loading,
			loadingModel,
			model,
			page,
			sortDir,
			sortId,
			value
		} = this.state;

		return (
			<Portal>
				<div style={{
					position: 'absolute',
					width: '75%',
					height: '75%',
					boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
					left: '12.5%',
					top: '12.5%',
					zIndex: 10,
					background: 'white'
				}}>
					<Table
						allowSelection={false}
						columns={columns}
						currentPage={page}
						customLayout={this.customLayout}
						data={value}
						deletable={false}
						editable={false}
						extraColumns={this.extraColumns}
						filters={filters}
						handleTableChange={this.handleTableChange}
						id={apiInfo.name}
						insertable={false}
						loading={loadingModel || loading}
						model={model}
						pageSize={limit}
						recordCount={count}
						sortDir={sortDir}
						sortId={sortId}
					/>
				</div>
			</Portal>
		);
	}
}

export default onClickOutside(TableInput);
