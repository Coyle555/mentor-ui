import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

import './styles.less';

export const ColorCell = (props) => {

	const [color, setColor] = useState(props.color);

	if (!props.editMode) {
		return (
			<div
				className="mui-table-color"
				style={{ backgroundColor: props.color }}
			/>
		);
	}

	return (
		<SliderPicker
			color={color}
			disableAlpha={true}
			onChangeComplete={(color) => {
				setColor(color);
				props.onColorChange(props.rowId, props.colId, color.hex);
			}}
		/>
	);
};

ColorCell.propTypes = {
	colId: PropTypes.string,
	color: PropTypes.string,
	editMode: PropTypes.bool,
	onColorChange: PropTypes.func,
	rowId: PropTypes.string
};

ColorCell.defaultProps = {
	color: '#fff',
	editMode: false
};
