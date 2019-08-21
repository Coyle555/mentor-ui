import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

export const ColorField = (props) => {

	const [color, setColor] = useState(props.color);

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

ColorField.propTypes = {
	colId: PropTypes.string,
	color: PropTypes.string,
	onColorChange: PropTypes.func,
	rowId: PropTypes.string
};

ColorField.defaultProps = {
	color: '#fff'
};
