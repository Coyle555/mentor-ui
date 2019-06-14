import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncDropdown } from 'mentor-inputs';

export class AsyncDropdownCell extends Component {

	static propTypes = {
		colId: PropTypes.string,
		inputClass: PropTypes.string,
		onBlur: PropTypes.func,
		lookup: PropTypes.shape({
			getOptionLabel: PropTypes.func,
		 	getOptionValue: PropTypes.func,
		 	route: PropTypes.string
		}),
		options: PropTypes.arrayOf(PropTypes.string),
		required: PropTypes.bool,
		rowId: PropTypes.string,
		value: PropTypes.string
	}

	static defaultProps = {
		lookup: {}
	}

	_onBlur = (error, value, name) => {
		const updateData = { [name]: value };
		this.props.onBlur(this.props.rowId, updateData);
	}

	render() {
		const {
			colId,
			inputClass,
			lookup,
			required,
			value
		} = this.props;
		
		return (
			<AsyncDropdown
				className={inputClass}
				name={colId}
				onBlur={this._onBlur}
				route={lookup.route}
				required={required}
				value={value}
				
			/>
		);
	}
}
