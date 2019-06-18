import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SelectedOption extends Component {

	static propTypes = {
		onClick: PropTypes.func,
		option: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	}

	static defaultProps = {
		option: ''
	}

	removeSelectedOption = () => {
		this.props.onClick(this.props.option);
	}

	render() {
		const { option } = this.props;

		return (
			<h2 className="selected-option">
				{ typeof option === 'object' ? option.name : option }
				<i
					className="fa fa-times"
					onClick={this.removeSelectedOption}
				/>
			</h2>
		);
	}
}
