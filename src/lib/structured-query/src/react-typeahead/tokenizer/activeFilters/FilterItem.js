import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';

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

			return (
				<Fragment>
					<FormattedDate
						value={date}
						year="numeric"
						month="long"
						day="numeric"
					/>
					{' - '}
					<FormattedTime
						value={date}
						hour="numeric"
						minute="numeric"
					/>
				</Fragment>
			);
		} else if (this.props.type === 'date') {
			const date = new Date(val);

			return (
				<FormattedDate
					value={date}
					year="numeric"
					month="long"
					day="numeric"
				/>
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
						<button
							className="clear-filter"
							onClick={this.onRemove}
							type="button"
						>
							Clear
						</button>
					}
				</td>
			</tr>
		);
	}
};
