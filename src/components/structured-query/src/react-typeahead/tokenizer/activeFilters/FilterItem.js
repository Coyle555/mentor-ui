import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { convertToTimeZone } from 'date-fns-timezone';

export class FilterItem extends Component {

	static propTypes = {
		children: PropTypes.shape({
			category: PropTypes.string,
			operator: PropTypes.string,
			value: PropTypes.string
		}),
		disabled: PropTypes.bool,
		onRemove: PropTypes.func,
		type: PropTypes.oneOf(['date', 'datetime'])
	}

	static defaultProps = {
		children: {}
	}

	onRemove = () => {
		this.props.onRemove(this.props.children);
	}

	renderValue = (val) => {
		if (this.props.type === 'datetime') {

			const date = Date.parse(new Date(val));
			const region = new Intl.DateTimeFormat().resolvedOptions();
			const convertedDate = convertToTimeZone(date, { timeZone: region.timeZone });
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			};

			return (
				<span>
					{ new Intl.DateTimeFormat('default', options).format(convertedDate) }
				</span>
			);

		} else if (this.props.type === 'date') {

			const date = Date.parse(new Date(val));
			const region = new Intl.DateTimeFormat().resolvedOptions();
			const convertedDate = convertToTimeZone(date, { timeZone: region.timeZone });
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			};

			return (
				<span>
					{ new Intl.DateTimeFormat('default', options).format(convertedDate) }
				</span>
			);
		}

		return val;
	}

	render() {
		const { children, disabled } = this.props;

		return (
			<tr>
				<td>{children.category}</td>
				<td>{children.operator}</td>
				<td className="filter-value">
					{this.renderValue(children.value)}
				</td>
				<td>
					{ !disabled &&
						<a
							className="clear-filter"
							onClick={this.onRemove}
						>
							Clear
						</a>
					}
				</td>
			</tr>
		);
	}
};
