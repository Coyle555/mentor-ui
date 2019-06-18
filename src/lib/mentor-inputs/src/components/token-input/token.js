import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Token extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		onDeleteClick: PropTypes.func,
		readOnly: PropTypes.bool
	}

	static defaultProps = {
		onDeleteClick: null,
		readOnly: true
	}

	onDeleteClick = (evt) => {
		this.props.onDeleteClick(this.props.token);
	}

	render() {
		const { name, readOnly } = this.props;

		return (
			<span className="table-token">
				{name}
				{ !readOnly && 
					<i
						className="fa fa-times token-delete"
						onClick={this.onDeleteClick}
					/>
				}
			</span>
		);
	}
}

export default Token;
