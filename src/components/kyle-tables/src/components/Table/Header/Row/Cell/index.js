import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Stickyfill from 'stickyfilljs';

const SORT_ICONS = {
	ascending: <i className="fas fa-sort-up" />,
	descending: <i className="fas fa-sort-down" />,
};

export class TableHeaderCell extends Component {

	static propTypes = {
		customClasses: PropTypes.object,
		id: PropTypes.string,
		onClick: PropTypes.func,
		sortIcon: PropTypes.element,
		sorted: PropTypes.bool,
		title: PropTypes.string,
		type: PropTypes.string
	}

	static defaultProps = {
		customClasses: {},
		sorted: false,
		sortIcon: null,
		title: ''
	}

	componentDidMount() {
		Stickyfill.add(this.headerCellRef);
	}

	_onSortClick = () => {
		this.props.onClick(this.props.id);
	}

	render() {
		const { customClasses, sort, title, type } = this.props;

		const classList = classNames({
			'table-heading-cell': true,
			[customClasses.tableHeaderCell]: !!customClasses.tableHeaderCell
		});

		return (
			<th
				className={classList}
				ref={ref => this.headerCellRef = ref}
			>
				<span onClick={this._onSortClick}>
					{title} { sort && SORT_ICONS[sort] }
				</span>
			</th>
		);
	}
};
