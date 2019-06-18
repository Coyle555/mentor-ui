import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddSingleRecord extends PureComponent {

	static propTypes = {
		disabled: PropTypes.bool,
		onClick: PropTypes.func
	}

	onClick = () => {
		this.props.onClick('single');
	}

	render() {
		const { disabled } = this.props;

		return (
			<span 
				data-for="table-tooltip"
				data-tip="Add Record"
			>
				<button
					className="btn-table"
					onClick={this.onClick}
					type="button"
					disabled={disabled}
				>
					<i className="fal fa-file-plus" />
				</button>
			</span>
		);
	}
};
