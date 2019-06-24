import React, {
	useState,
	useRef,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeNamespace } from 'compose-namespace';

import './style.less';

const KNOB_SIZE = 44;
const BORDER_OFFSET = 2;

export const Slider = (props) => {
	const [ percentage, setPercentage ] = useState();
	const [ sliderRect, setSliderRect ] = useState({ width: 0});

	const handleRef = useRef();
	const handleGrabListener = useRef();
	const sliderRef = useRef();

	const {
		className,
		onChange,
	} = props;

	useEffect(() => {
		onChange(percentage);
	}, [percentage]);

	useEffect(() => {
		setSliderRect(
			sliderRef.current
			.getBoundingClientRect()
		);
	}, [sliderRef.current])

	const handleGrab = (event) => {
		if (!handleGrabListener.current) {
			handleGrabListener.current = onMove.bind(
				null,
				sliderRect,
				setPercentage,
			);
		}

		handleRef.current.addEventListener(
			'mousemove',
			handleGrabListener.current,
		);
	};

	const handleRelease = (event) => {
		handleRef.current.removeEventListener(
			'mousemove',
			handleGrabListener.current,
		);
	};

	const handlePos = calcHandlePos(
		percentage,
		KNOB_SIZE,
		sliderRect.width,
		BORDER_OFFSET,
	);

	const styles = {
		valueWidth: {
			width: `calc(${percentage}% + ${KNOB_SIZE / 4}px)`
		},
		handlePos: {
			left: handlePos
		},
	};

	const cc = composeNamespace('APMSlider', className);

	return (
		<div
			className={cc()}
			ref={sliderRef}
		>
			<div
				className={cc('value')}
				style={styles.valueWidth}
			/>
			<div
				className={cc('handle')}
				ref={handleRef}
				onMouseDown={handleGrab}
				onMouseUp={handleRelease}
				onMouseOut={handleRelease}
				style={styles.handlePos}
			/>
		</div>
	);
};

function calcHandlePos(
	percentage = 0,
	knob_size,
	width,
	offset
) {
	const knob_percentage = Math.floor(knob_size / width * 50);

	if (percentage + knob_percentage >= 100)
		return `calc(100% - ${knob_size - offset}px)`
	else if (percentage - knob_percentage <= 0)
		return `${-offset}px`;

	return `calc(${Math.floor(percentage)}% - ${knob_size / 2}px)`;
};

export function normalizer(value, min, max) {
	if (value > max) return max
	if (value < min) return min
	return value
}

export function onMove(sliderRect, callback, event) {
	const sliderX = sliderRect.x;
	const sliderWidth = sliderRect.width;
	const mouseX = event.clientX;

	const x = Math.abs(sliderX - mouseX);
	const newPercentage = normalizer(
		Math.abs(x / sliderWidth) * 100,
		0,
		100
	);

	callback(newPercentage);
}

Slider.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
};
