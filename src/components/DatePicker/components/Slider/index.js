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

export const Slider = (props) => {
	const [ percentage, setPercentage ] = useState();
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

	const handleGrab = (event) => {
		if (!handleGrabListener.current) {
			handleGrabListener.current = onMove.bind(
				null,
				sliderRef,
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

	const styles = {
		valueWidth: {
			width: `calc(${percentage}% + ${KNOB_SIZE / 4}px)`
		},
		handlePos: {
			left: `calc(${percentage}% - ${KNOB_SIZE / 2}px)`
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

export function normalizer(value, min, max) {
	if (value > max) return max
	if (value < min) return min
	return value
}

export function onMove(sliderRef, callback, event) {
	const sliderRect = sliderRef
		.current
		.getBoundingClientRect();

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
