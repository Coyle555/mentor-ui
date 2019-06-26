import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tether from 'react-tether';
import onClickOutside from 'react-onclickoutside';

import { FilterItem } from './FilterItem';

export class ActiveFiltersClass extends Component {

	static propTypes = {
		clearSearch: PropTypes.func,
		disabled: PropTypes.bool,
		onRemove: PropTypes.func,
		searchTokens: PropTypes.arrayOf(PropTypes.shape({
			category: PropTypes.string,
			id: PropTypes.string,
			operator: PropTypes.string,
			value: PropTypes.string
		}))
	}

	static defaultProps = {
		searchTokens: []
	}

	constructor(props) {
		super(props);

		// @filtersActive: true when the user has opened the list of
		// 	all applied filters; false otherwise
		this.state = {
			filtersActive: false
		};
	}

	toggleFilterList = () => {
		this.setState({ filtersActive: !this.state.filtersActive });
	}

	handleClickOutside = (event) => {
		this.setState({ filtersActive: false });
	}

	renderFilters = (ref) => {
		const { clearSearch, disabled, onRemove, searchTokens } = this.props;

		if (searchTokens.length === 0) {
			return null;
		}

		return (
			<table
				className="active-filters-list ignore-react-onclickoutside"
				ref={ref}
			>
				<thead>
					<tr>
						<td>Field</td>
						<td>Operator</td>
						<td>Value</td>
						<td>
							{ !disabled &&
								<button
									className="clear-all-filters"
									onClick={clearSearch}
									type="button"
								>
									Clear All
								</button>
							}
						</td>
					</tr>
				</thead>
				<tbody>
					{ searchTokens.map(token => (
						<FilterItem
							disabled={disabled}
							key={token.id + token.operator + token.value}
							onRemove={onRemove}
							type={token.type}
						>
							{token}
						</FilterItem>
					))}
				</tbody>
			</table>
		);
	}
	
	render() {
		const { searchTokens } = this.props;
		const { filtersActive } = this.state;

		return (
			<Tether
				attachment="top left"
				targetAttachment="bottom left"
				constraints={[{ to: 'scrollParent' }]}
				style={{zIndex: 4}}
				renderTarget={ref => (
					<span
						className="input-group-addon left-addon"
						data-for="structured-query-tooltip"
						data-tip="View Filters"
						onClick={this.toggleFilterList}
						ref={ref}
						style={{
							background: searchTokens.length === 0
								? 'lightgrey'
								: 'white',
							borderRadius: 0,
							position: 'relative',
							cursor: searchTokens.length === 0
								? 'not-allowed'
								: 'pointer'
						}}
					>
						<i className="far fa-list" />
						<span className="active-filter-count">
							{searchTokens.length}
						</span>
					</span>
				)}
				renderElement={ref => (
					filtersActive
						? this.renderFilters(ref)
						: null
				)}
			/>
		);
	}
};

export const ActiveFilters = onClickOutside(ActiveFiltersClass);
