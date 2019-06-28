import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tether from 'react-tether';

export class DeleteRecords extends PureComponent {

	static propTypes = {
		disabled: PropTypes.bool,
		numRowsSelected: PropTypes.number,
		onDeleteClick: PropTypes.func
	}

	static defaultProps = {
		numRowsSelected: 0
	}

	constructor(props) {
		super(props);

		this.state = {
			deleteWarning: false
		};
	}

	onDeleteWarnToggle = () => {
		this.setState({ deleteWarning: !this.state.deleteWarning });
	}

	onDeleteClick = () => {
		this.setState({ deleteWarning: false });

		if (typeof this.props.onDeleteClick === 'function') {
			this.props.onDeleteClick();
		}
	}

	render () {
		const { disabled, numRowsSelected } = this.props;
		const { deleteWarning } = this.state;

		return (
			<Tether
				attachment="top center"
				targetAttachment="bottom center"
				constraints={[{ to: 'scrollParent' }]}
				style={{ zIndex: 4 }}
				renderTarget={ref => (
					<span 
						data-for="table-tooltip"
						data-tip="Delete Rows"
						ref={ref}
					>
						<button
							className="btn-table"
							disabled={numRowsSelected === 0}
							onClick={this.onDeleteWarnToggle}
							type="button"
						>
							<i className="fal fa-trash-alt" />
						</button>
					</span>
				)}
				renderElement={ref => (
					deleteWarning && 
						<div ref={ref}>
							<div className="table-header-delete-warning-arrow" />
							<div className="table-header-delete-warning">
								<p>
									Delete {numRowsSelected} {numRowsSelected > 1
										? 'records?'
										: 'record?'}
								</p>
								<button
									className="btn btn-danger btn-sm btn-block"
									onClick={this.onDeleteClick}
									type="button"
								>
									Yes
								</button>
							</div>
						</div>
				)}
			/>
		);
	}
}
