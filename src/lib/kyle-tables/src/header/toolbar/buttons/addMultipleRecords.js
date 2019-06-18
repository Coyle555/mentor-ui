import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddMultipleRecords extends PureComponent {

	static propTypes = {
		disabled: PropTypes.bool,
		onClick: PropTypes.func
	}
	
	onClick = () => {
		this.props.onClick('multiple');
	}

	render() {
		const { disabled } = this.props;

		return (
			<span 
				data-for="table-tooltip"
				data-tip="Add Multiple Records"
			>
				<button
					className="btn-table"
					onClick={this.onClick}
					type="button"
					disabled={disabled}
				>
					<i className="fal fa-copy" />
				</button>
			</span>
		);
	}
}
