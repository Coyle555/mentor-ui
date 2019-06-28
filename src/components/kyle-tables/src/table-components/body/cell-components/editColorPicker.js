import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

export class EditColorPicker extends PureComponent {

	static propTypes = {
		colId: PropTypes.string,
		color: PropTypes.string,
		onColorChange: PropTypes.func,
		rowId: PropTypes.string
	}

	static defaultProps = {
		color: '#fff'
	}

	constructor(props) {
		super(props);

		// @color: current color in picker
		this.state = {
			color: this.props.color
		};
	}

	onColorChange = (color) => {
		const { onColorChange, colId, rowId } = this.props;

		this.setState({ color });
		this.props.onColorChange(rowId, colId, color.hex);
	}

	render() {
		const { color } = this.state;

		return (
			<SliderPicker
				color={color}
				disableAlpha={true}
				onChangeComplete={this.onColorChange}
			/>
		);
	}
};
