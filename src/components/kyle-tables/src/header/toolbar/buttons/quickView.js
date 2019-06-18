import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class QuickView extends Component {

	onClick = () => {
		this.props.onClick(this.props.view.columns);
	}
	
	render() {
		const { disabled, view } = this.props;

		return (
			<span 
				data-for="table-tooltip"
				data-tip={view.tip}
			>
				<button
					className="btn-table"
					onClick={this.onClick}
					type="button"
					disabled={disabled}
				>
					<i className={view.icon} />
				</button>
			</span>
	       );
	}
};

QuickView.propTypes = {
	disabled: PropTypes.bool,
	view: PropTypes.object
};

QuickView.defaultProps = {
	view: {}
};
