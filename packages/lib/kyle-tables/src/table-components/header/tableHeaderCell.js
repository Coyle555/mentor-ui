import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Stickyfill from 'stickyfilljs';

export class TableHeaderCell extends Component {

	static propTypes = {
		customClasses: PropTypes.object,
		id: PropTypes.string,
		onClick: PropTypes.func,
		sortIcon: PropTypes.element,
		sorted: PropTypes.bool,
		title: PropTypes.string,
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

	_onSortClick = (event) => {
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(this.props.id);
		}
	}

	render() {
		const { customClasses, sortIcon, sorted, title } = this.props;

		const classList = classNames({
			'table-heading-cell': true,
			[customClasses.tableHeaderCell]: !!customClasses.tableHeaderCell
		});

		return (
			<th
				className={classList}
				ref={ref => this.headerCellRef = ref}
			>
				<div
					className="apm-cursor-p"
					onClick={this._onSortClick}
				>
					{title} {sorted && sortIcon}
				</div>
			</th>
		);
	}
};
