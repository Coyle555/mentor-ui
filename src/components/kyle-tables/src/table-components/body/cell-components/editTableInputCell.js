import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TableInput } from 'mentor-inputs';

export class EditTableInputCell extends PureComponent {

	static propTypes = {
		apiInfo: PropTypes.object,
		onChange: PropTypes.func,
		colId: PropTypes.string,
		rowId: PropTypes.string,
		row: PropTypes.object,
		inputClass: PropTypes.string,
		onBlur: PropTypes.func,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
	}

	static defaultProps = {
		value: ''
	}

	onSelectData = (data, name) => {
		const updateData = { [name]: { id: data.id, name: data.name } };
		this.props.onBlur(this.props.rowId, updateData);
	}

	render() {
		const { apiInfo, colId, inputClass, required, value } = this.props;

		return (
			<TableInput
				apiInfo={apiInfo}
				className={inputClass}
				name={colId}
				onSelectData={this.onSelectData}
				required={required}
				value={value}
			/>
		);
	}
};
