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
		const hours = calcDx(percentage, 100, 24);

		moment.hours(hours);
		onChange(moment);
	};

	const changeMinutes = percentage => {
		const minutes = calcDx(percentage, 100, 59);;

		moment.minutes(minutes);
		onChange(moment);
	};

    const cc = composeNamespace('APMTime', className);

	return (
		<div className={cn(
			cc(),
			className,
		)}>
			<div className={cc('display')}>
				<div className={cc('display-panel')}>
					<div className={cc('display-panel-label')}>
						<span
							className={cc('display-panel-number')}>
							{moment.format('HH')}
						</span>
						<span
							className={cc('display-panel-letter')}>
							h
						</span>
					</div>
				</div>
				<div className={cc('separator')}>
					<div className={cc('separator-stroke')} />
					<div className={cc('separator-stroke')} />
				</div>
				<div className={cc('display-panel')}>
					<div className={cc('display-panel-label')}>
						<span
							className={cc('display-panel-number')}>
							{moment.format('mm')}
						</span>
						<span
							className={cc('display-panel-letter')}>
							m
						</span>
					</div>
				</div>
			</div>
			<div className={cc('sliders')}>
				<div className={cc('slider')}>
					<div className={cc('slider-label')}>
						Hours
					</div>
					<Slider
						onChange={changeHours}
						defaultPercentage={calcDx(
							moment.hours(),
							24,
							100,
						)}
					/>
				</div>
				<div className={cc('slider')}>
					<div className={cc('slider-label')}>
						Minutes
					</div>
					<Slider
						onChange={changeMinutes}
						defaultPercentage={calcDx(
							moment.hours(),
							24,
							100,
						)}
					/>
				</div>
			</div>
		</div>
	);
};

// transform minutes to a percentage
// or visa-versa
export function calcDx(x, y, dy) {
	const dec = x / y;
	return dec * dy;
}

Time.propTypes = {
	className: PropTypes.string,
	moment: PropTypes.object.isRequired,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	display: PropTypes.boolean,
	onChange: PropTypes.func,
}
