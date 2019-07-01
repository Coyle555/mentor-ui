import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SelectInput } from 'mentor-inputs';

export class SelectCell extends Component {

	static propTypes = {
		colId: PropTypes.string,
		inputClass: PropTypes.string,
		onBlur: PropTypes.func,
		options: PropTypes.arrayOf(PropTypes.string),
		required: PropTypes.bool,
		rowId: PropTypes.string,
		value: PropTypes.string
	}

	static defaultProps = {
		options: []
	}

	_onBlur = (error, value, name) => {
		this.props.onBlur(this.props.rowId, name, value);
	}

	render() {
		const { colId, inputClass, options, required, value } = this.props;

		return (
			<SelectInput
				className={inputClass}
				data-testid="select-cell"
				name={colId}
				onBlur={this._onBlur}
				options={options}
				required={required}
				value={value}
			/>
		);
	}
};
