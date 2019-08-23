import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SwatchesPicker } from 'react-color';

export class ColorField extends Component {

	state = { color: '#fff' }

	onChangeComplete = (color) => {
		this.setState({ color: color.hex });
					//props.onColorChange(props.rowId, props.colId, color.hex);
	}

	//const [color, setColor] = useState('#ccc');//props.color);
	//console.log('color in color field', color);

	render() {
		const { color } = this.state;
		console.log('color to render', color);

		return (
			<SwatchesPicker
				color={color}
				disableAlpha={true}
				width="100%"
				height="100px"
				onChangeComplete={this.onChangeComplete}
			/>
		);
	}
};

ColorField.propTypes = {
	colId: PropTypes.string,
	color: PropTypes.string,
	onColorChange: PropTypes.func,
	rowId: PropTypes.string
};

ColorField.defaultProps = {
	color: '#ccc'
};
