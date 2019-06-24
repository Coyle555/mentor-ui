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
		//moment.hours(pos.x);
		onChange(moment);
	};

	const changeMinutes = percentage => {
		//moment.minutes(pos.x);
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
				<div className={cc('time-text')}>
					Hours:
				</div>
				<Slider
					onChange={changeHours}
				/>
				<div className={cc("time-text")}>
					Minutes:
				</div>
				<Slider
					defaultPercentage={75}
					onChange={changeMinutes}
				/>
			</div>
		</div>
	);
};

Time.propTypes = {
	className: PropTypes.string,
	moment: PropTypes.object.isRequired,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	display: PropTypes.boolean,
	onChange: PropTypes.func,
}
