import React, {
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeNamespace } from 'compose-namespace';

import './style.less';

const KNOB_SIZE = 38;
const BORDER_OFFSET = 2;

export const Slider = (props) => {
	const {
		className,
		onChange,
		defaultPercentage,
	} = props;

	const [ percentage, setPercentage ] = useState(
		defaultPercentage
	);
	const [ sliderRect, setSliderRect ] = useState({ width: 0 });

	const handleRef = useRef();
	const handleGrabListener = useRef();
	const sliderRef = useRef();

	useEffect(() => {
		onChange(percentage);
	}, [percentage]);

	useLayoutEffect(() => {
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
				KNOB_SIZE,
				normalizer,
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

	const [handlePos, operator] = calcHandlePos(
		percentage,
		KNOB_SIZE,
		sliderRect.width,
		BORDER_OFFSET,
	);

	const styles = {
		valueWidth: {
			width: getValueWidthStyle(handlePos, KNOB_SIZE),
		},
		handle: {
			left: getHandleStyle(
				handlePos,
				operator,
				BORDER_OFFSET
			),
			height: `${KNOB_SIZE}px`,
			width: `${KNOB_SIZE}px`,
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
				style={styles.handle}
			/>
		</div>
	);
};

export function calcHandlePos(
	percentage,
	knobSize,
	width,
) {
	if (!percentage)
		percentage = 0;

	const knob_percentage = knobSize / width * 50;

	const scalar = percentage * knobSize / width;
	const operator = percentage + knob_percentage >= 100
		? '+'
		: '-';

	return [percentage - scalar, operator];
};

export function getHandleStyle(pos, operator, offset) {
	return `calc(${pos}% ${operator}  ${offset}px)`
}

export function getValueWidthStyle(pos, knobSize) {
	return `calc(${pos}% + ${KNOB_SIZE / 2}px)`
}

export function normalizer(value, min, max) {
	if (value > max) return max
	if (value < min) return min
	return value
}

export function onMove(
	sliderRect,
	callback,
	knobSize,
	normalizer,
	event,
) {
	const sliderX = sliderRect.x;
	const sliderWidth = sliderRect.width - knobSize;
	const mouseX = event.clientX;

	const x =  mouseX - sliderX - knobSize / 2;

	const newPercentage = Math.round(normalizer(
		x / sliderWidth * 100,
		0,
		100,
	));

	callback(newPercentage);
}

Slider.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	defaultPercentage: PropTypes.number,
};
