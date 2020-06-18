import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DATETIME_FORMAT = 'MMM DD, YYYY, h:mm A';
const DATE_FORMAT = 'MMM DD, YYYY';

export class FilterItem extends Component {

	static propTypes = {
		children: PropTypes.shape({
			label: PropTypes.string,
			operator: PropTypes.string,
			value: PropTypes.any
		}),
		onRemove: PropTypes.func,
		type: PropTypes.oneOf(['date', 'datetime'])
	}

	static defaultProps = {
		children: {},
	}

	onRemove = () => {
		this.props.onRemove(this.props.children);
	}

	renderValue = (val) => {
		const { type } = this.props;

		if (type === 'datetime' && !!val) {

			return moment.utc(val).local().format(DATETIME_FORMAT);

		} else if (type === 'date' && !!val) {

			return new moment.utc(val).format(DATE_FORMAT);

		}

		return val;
	}

	render() {
		const { children } = this.props;

		return (
			<tr>
				<td>{children.label}</td>
				<td>{children.operator}</td>
				<td className="filter-value">
					{this.renderValue(children.value)}
				</td>
				<td>
					<a
						className="clear-filter"
						onClick={this.onRemove}
					>
						Clear
					</a>
				</td>
			</tr>
		);
	}
}
