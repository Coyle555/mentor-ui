import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tether from 'react-tether';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

// view columns is a drop down used by the tables to show all
// the columns in the table - visible and nonvisible
class ViewColumnsComponent extends Component {

	static propTypes = {
		disabled: PropTypes.bool,
		onDisplayColChange: PropTypes.func,
		viewColumns: PropTypes.arrayOf(PropTypes.object)
	}

	static defaultProps = {
		viewColumns: []
	}

	constructor(props) {
		super(props);

		// @btnActive: true when the display columns button
		// 	is active; false otherwise; used to highlight button
		this.state = {
			btnActive: false
		};
	}

	onClick = () => {
		this.setState({ btnActive: !this.state.btnActive });
	}

	handleClickOutside = (event) => {
		this.setState({ btnActive: false });
	}

	render() {
		const { disabled, onDisplayColChange, viewColumns } = this.props;
		const { btnActive } = this.state;

		const btnClasses = classNames({
			'btn-table': true,
			'active': btnActive
		});

		return (
			<Tether
				attachment="top right"
				targetAttachment="bottom right"
				constraints={[{ to: 'scrollParent' }]}
				style={{zIndex: 10}}
				renderTarget={ref => (
					<span
						data-for="table-tooltip"
						data-tip="Toggle Columns"
						ref={ref}
					>
						<button
							className={btnClasses}
							onClick={this.onClick}
							type="button"
							disabled={disabled}
						>
							<i className="fal fa-columns" />
						</button>
					</span>
				)}
				renderElement={ref => (
					btnActive && (
						<ul
							className="table-header-columns-ul ignore-react-onclickoutside"
							ref={ref}
						>
						{ viewColumns.map(col => (
							<li key={col.id} className="table-header-columns-li">
								<div className="pretty p-default">
									<input
										type="checkbox"
										id={col.category}
										checked={col.display}
										name={col.id}
										onChange={onDisplayColChange}
									/>
									<div className="state p-info">
										<label htmlFor={col.category}>
											{col.category}
										</label>
									</div>
								</div>
							</li>
						))}
						</ul>
					)
				)}
			/>
		);
	}
}

export const ViewColumns = onClickOutside(ViewColumnsComponent);
