import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Slider } from 'components/Slider';
import { composeNamespace } from 'compose-namespace';

import './style.less';


export const Time = (props) => {
    const {
		className,
		moment,
		minHour,
		maxHour,
		onChange,
    } = props;

	const changeHours = percentage => {
		const hours = calcHoursFromPercentage(percentage);

		moment.hours(hours);
		onChange(moment);
	};

	const changeMinutes = percentage => {
		const minutes = calcMinutesFromPercentage(percentage);

		moment.minutes(minutes);
		onChange(moment);
	};

    const cc = composeNamespace('APMTime', className);

	return (
		<div className={cn(
			cc(),
			className,
		)}>
			<div className={cc('showtime')}>
				<span className={cc('time')}>
					{moment.format('HH')}
				</span>
				<span className={cc('separater')}>
					:
				</span>
				<span className={cc('time')}>
					{moment.format('mm')}
				</span>
			</div>
			<div className={cc('sliders')}>
				<div className={cc('slider')}>
					<div className={cc('slider-label')}>
						Hours
					</div>
					<Slider
						onChange={changeHours}
					/>
				</div>
				<div className={cc('slider')}>
					<div className={cc('slider-label')}>
						Minutes
					</div>
					<Slider
						onChange={changeMinutes}
					/>
				</div>
			</div>
		</div>
	);
};

function calcHoursFromPercentage(percentage) {
	const dec = percentage / 100
	return dec * 23
}

function calcMinutesFromPercentage(percentage) {
	const dec = percentage / 100
	return dec * 59
}

Time.propTypes = {
	className: PropTypes.string,
	moment: PropTypes.object.isRequired,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	display: PropTypes.boolean,
	onChange: PropTypes.func,
}
