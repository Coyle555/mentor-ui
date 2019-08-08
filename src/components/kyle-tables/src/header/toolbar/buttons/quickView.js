import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tether from 'react-tether';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class QuickViewsComponent extends Component {

	static propTypes = {
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
		quickViews: PropTypes.arrayOf(PropTypes.shape({
			columns: PropTypes.arrayOf(PropTypes.string),
			name: PropTypes.string,
		}))
	}

	static defaultProps = {
		quickViews: []
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

	onViewClick = (columns) => {
		this.props.onClick(columns);
	}

	render() {
		const { disabled, quickViews } = this.props;
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
						data-tip="Quickviews"
						ref={ref}
					>
						<button
							className={btnClasses}
							onClick={this.onClick}
							type="button"
							disabled={disabled}
						>
							<i className="fal fa-clipboard-list" />
						</button>
					</span>
				)}
				renderElement={ref => (
					btnActive && (
						<ul
							className="table-header-columns-ul ignore-react-onclickoutside"
							ref={ref}
						>
							{ quickViews.map(view => (
								<li
									className="table-header-columns-li table-quickview"
									key={view.name}
									onClick={() => this.onViewClick(view.columns)}
								>
									<i className="far fa-eye" />
									{view.name}
								</li>
							))}
						</ul>
					)
				)}
			/>
	       );
	}
};

export const QuickViews = onClickOutside(QuickViewsComponent);
