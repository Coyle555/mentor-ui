import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

export const TableHeaderCheckboxCell = ({ allRowsSelected, _onRowSelectAll }) => (
	<th className="table-heading-cell table-checkbox-cell">
		<div className="pretty p-icon">
			<input
				checked={allRowsSelected}
				onChange={_onRowSelectAll}
				type="checkbox"
			/>
			<div className="state p-info">
				<i className="icon fal fa-check" />
				<label />
			</div>
		</div>
	</th>
);

TableHeaderCheckboxCell.propTypes = {
	allRowsSelected: PropTypes.bool,
	_onRowSelectAll: PropTypes.func
};
