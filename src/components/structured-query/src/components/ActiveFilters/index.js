import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';

import { FilterItem } from './FilterItem';

export const ActiveFiltersComponent = ({ clearSearch, onRemove, searchTokens }) => {

	// true when the user has opened the list of all applied filters; false otherwise
	const [filtersActive, setFiltersActive] = useState(false);
	const [refElement, setRefElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(refElement, popperElement, { placement: 'bottom-start' });

	const toggleFilterList = useCallback(() => {
		setFiltersActive(!filtersActive);
	}, [filtersActive]);

	ActiveFiltersComponent.handleClickOutside = () => setFiltersActive(false);

	const activeFilterClasses = classNames({
		'left-addon active-filter-container': true,
		'active-filter-enabled': searchTokens.length > 0
	});

	return (
		<>
			<span
				className={activeFilterClasses}
				data-for="structured-query-tooltip"
				data-tip="View Filters"
				onClick={toggleFilterList}
				ref={setRefElement}
			>
				<i className="far fa-list" />
				<span className="active-filter-count">
					{searchTokens.length}
				</span>
			</span>
			{searchTokens.length === 0 || !filtersActive
				? null
				: <table
					className="active-filters-list ignore-react-onclickoutside"
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
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
						{searchTokens.map(token => (
							<FilterItem
								key={token.id + token.operator + token.value}
								onRemove={onRemove}
								type={token.type}
							>
								{token}
							</FilterItem>
						))}
					</tbody>
				</table>
			}
		</>
	);
};

ActiveFiltersComponent.propTypes = {
	clearSearch: PropTypes.func,
	onRemove: PropTypes.func,
	searchTokens: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		id: PropTypes.string,
		operator: PropTypes.string,
		value: PropTypes.any
	}))
};

ActiveFiltersComponent.defaultProps = {
	searchTokens: []
};

const clickOutsideConfig = {
	handleClickOutside: () => ActiveFiltersComponent.handleClickOutside
};

export const ActiveFilters = onClickOutside(ActiveFiltersComponent, clickOutsideConfig);
