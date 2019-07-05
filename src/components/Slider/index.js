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

export const KNOB_SIZE = 38;
export const BORDER_OFFSET = 2;

export const Slider = (props) => {
	const {
		className,
		onChange,
		defaultPercentage,
		minPercentage = null,
		maxPercentage = null,
	} = props;

	const [ percentage, setPercentage ] = useState(
		defaultPercentage
	);
	const [ sliderRect, setSliderRect ] = useState({ width: 0 });

	const handleRef = useRef();
	const handleGrabListener = useRef();
	const sliderRef = useRef();

	useEffect(() => {
		if (onChange)
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
			handleGrabListener.current = onMove(
				sliderRect,
				setPercentage,
				KNOB_SIZE,
				normalizer,
				minPercentage,
				maxPercentage,
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
			{ minPercentage &&
				renderLeftConstraint(minPercentage, cc)
			}
			{ maxPercentage &&
				renderRightConstraint(maxPercentage, cc)
			}
			<div
				className={cc('handle')}
				data-testid="slider-handle"
				ref={handleRef}
				onMouseDown={handleGrab}
				onMouseUp={handleRelease}
				onMouseOut={handleRelease}
				style={styles.handle}
			/>
		</div>
	);
};

export function renderLeftConstraint(
	widthPercentage,
	cc,
) {
	return (
		<div
			className={cc('left-constraint')}
			style={{ width: `${widthPercentage}%` }}
		/>
	);
};

export function renderRightConstraint(
	widthPercentage,
	cc,
) {
	return (
		<div
			className={cc('right-constraint')}
			style={{ width: `${100 - widthPercentage}%` }}
		/>
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
	return `calc(${pos}% ${operator} ${offset}px)`
}

export function getValueWidthStyle(pos, knobSize) {
	return `calc(${pos}% + ${knobSize / 2}px)`
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
	minPercentage,
	maxPercentage,
) {
	return (event) => {
		const sliderX = sliderRect.x;
		const sliderWidth = sliderRect.width - knobSize;
		const mouseX = event.clientX;

		const max = maxPercentage ? maxPercentage : 100;
		const min = minPercentage ? minPercentage : 0;
		const x =  mouseX - sliderX - knobSize / 2;

		const newPercentage = Math.floor(normalizer(
			x / sliderWidth * 100,
			min,
			max,
		));

		callback(newPercentage);
	}
}

Slider.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	defaultPercentage: PropTypes.number,
};
