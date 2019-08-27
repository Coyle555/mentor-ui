import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';

const COLORS = [
	'#000000', '#FFFFFF', '#B80000',
	'#DB3E00', '#FCCB00', '#008B02',
	'#006B76', '#1273DE', '#004DCF',
	'#5300EB', '#EB9694', '#FAD0C3',
	'#FEF3BD', '#C1E1C5', '#BEDADC',
	'#C4DEF6', '#BED3F3', '#D4C4FB',
	'#3D4B54', '#001528', '#008860',
	'#004437', '#EE104E', '#A5F944',
	'#003366', '#F6A230', '#4F054F',
	'#008000', '#0000FF', '#FFFF00'
];

export class ColorField extends Component {

	state = { color: this.props.value };

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({ color: this.props.value });
		}
	}

	onChangeComplete = (color) => {
		this.setState({ color: color.hex });
		//props.onColorChange(props.rowId, props.colId, color.hex);
	}

	render() {
		const { color } = this.state;

		return (
			<div className="color-input-container">
				<div className="color-circle" style={{ backgroundColor: color }} />
				<GithubPicker
					color={color}
					colors={COLORS}
					onChangeComplete={this.onChangeComplete}
					width="75%"
					triangle="hide"
				/>
			</div>
		);
	}
};

ColorField.propTypes = {
	colId: PropTypes.string,
	onColorChange: PropTypes.func,
	rowId: PropTypes.string
};
