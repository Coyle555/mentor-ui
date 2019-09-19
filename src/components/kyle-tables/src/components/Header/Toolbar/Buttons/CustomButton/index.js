import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class CustomButton extends PureComponent {

	static propTypes = {
		className: PropTypes.string,
		disabled: PropTypes.bool,
		icon: PropTypes.element,
		onClick: PropTypes.func,
		selectedRows: PropTypes.object,
		tip: PropTypes.string,
		validation: PropTypes.func
	}

	static defaultProps = {
		icon: null
	}

	onClick = () => {
		this.props.onClick(this.props.selectedRows);
	}

	render() {
		const {
			className,
			disabled,
			icon,
			selectedRows,
			tip,
			validation
		} = this.props;

		const isDisabled = disabled
			|| (typeof validation === 'function' && !validation(selectedRows));

		return (
			<span 
				data-for="table-tooltip"
				data-tip={tip}
			>
				<button
					className="btn-table"
					disabled={isDisabled}
					onClick={this.onClick}
					type="button"
				>
					{icon}
				</button>
			</span>
		);
	}
}
