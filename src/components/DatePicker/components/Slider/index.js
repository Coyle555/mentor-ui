import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.less';

const SliderTypes = Object.freeze({
	VERTICAL: 'VERTICAL',
	HORIZONTAL: 'HORIZONTAL',
})

export const Slider = (props) => {
	const {
		type,
		className,
		onChange,
	} = props;

	const valueStyle = {};
	const pos = {};

	if (type === SliderTypes.HORIZONTAL)
		valueStyle.width = pos.left;
	else
		valueStyle.height = pos.top;

	const classes = cn(
		'u-slider',
		`u-slider-${type}`,
		className,
	);

	const handleMouseDown = (event) => {
	}

	return (
		<div className={classes}>
			<div className="value" style={valueStyle} />
			<div
				className="handle"
				onTouchStart={handleMouseDown}
				onMouseDown={handleMouseDown}
				style={pos}
			/>
		</div>
	);
};

Slider.propTypes = {
	axis: PropTypes.string,
	x: PropTypes.number,
	xmax: PropTypes.number,
	xmin: PropTypes.number,
	y: PropTypes.number,
	ymax: PropTypes.number,
	ymin: PropTypes.number,
	xstep: PropTypes.number,
	ystep: PropTypes.number
};

Slider.defaultProps = {
	axis: 'x',
	xmin: 0,
	ymin: 0,
	xstep: 1,
	ystep: 1
};
