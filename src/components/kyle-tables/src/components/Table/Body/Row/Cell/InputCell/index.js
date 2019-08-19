import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getMentorInput } from 'mentor-inputs';

const EPSILON = 0.00000001;

// edit a regular text input cell
// updated data is sent to server when the input box loses focus or the user
// hits enter
export class EditInputCell extends PureComponent {

	static propTypes = {
		colId: PropTypes.string,
		inputClass: PropTypes.string,
		onBlur: PropTypes.func,
		required: PropTypes.bool,
		rowId: PropTypes.string,
		type: PropTypes.string,
		value: PropTypes.string,
	}

	static defaultProps = {
		type: 'string',
		value: ''
	}

	constructor(props) {
		super(props);
		
		// original value loaded into input
		this.origValue = this.props.value;
	}

	_onBlur = (error, value, name) => {
		if (error) return;

		// add an epsilon check to deal with floating point arithmetic
		// to make sure a change in float input is large enough to update
		if (this.props.type === 'float'
			&& Math.abs(value - this.origValue) < EPSILON) {

			return;
		}

		this.origValue = value;
		this.props.onBlur(this.props.rowId, name, value);
	}

	render() {
		const { colId, inputClass, required, type, value } = this.props;

		const Input = getMentorInput(type);

		return (
			<Input
				className={inputClass}
				data-testid="edit-input"
				name={colId}
				onBlur={this._onBlur}
				required={required}
				value={value}
			/>
		);
	}
}
