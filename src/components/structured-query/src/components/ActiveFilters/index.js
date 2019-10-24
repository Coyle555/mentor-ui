import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tether from 'react-tether';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';

import { _getParseForOptions } from '../../utils/utils';
import { FilterItem } from './FilterItem';

export class ActiveFiltersComponent extends Component {

	static propTypes = {
		clearSearch: PropTypes.func,
		fields: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string,
			options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
			parse: PropTypes.func,
			type: PropTypes.string
		})),
		onRemove: PropTypes.func,
		searchTokens: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			id: PropTypes.string,
			operator: PropTypes.string,
			value: PropTypes.any
		}))
	}

	static defaultProps = {
		fields: [],
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
		const { clearSearch, fields, onRemove, searchTokens } = this.props;

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
							<a
								className="clear-all-filters"
								onClick={clearSearch}
							>
								Clear All
							</a>
						</td>
					</tr>
				</thead>
				<tbody>
					{ searchTokens.map(token => (
						<FilterItem
							key={token.id + token.operator + token.value}
							onRemove={onRemove}
							parse={_getParseForOptions(fields, token)}
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

		const activeFilterClasses = classNames({
			'left-addon active-filter-container': true,
			'active-filter-enabled': searchTokens.length > 0
		});

		return (
			<Tether
				attachment="top left"
				targetAttachment="bottom left"
				constraints={[{ to: 'scrollParent' }]}
				style={{zIndex: 4}}
				renderTarget={ref => (
					<span
						className={activeFilterClasses}
						data-for="structured-query-tooltip"
						data-tip="View Filters"
						onClick={this.toggleFilterList}
						ref={ref}
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

export const ActiveFilters = onClickOutside(ActiveFiltersComponent);
