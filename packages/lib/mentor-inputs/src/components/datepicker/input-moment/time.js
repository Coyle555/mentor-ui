import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from './input-slider/input-slider';

export default class extends Component {
	changeHours = pos => {
		const m = this.props.moment;
		m.hours(pos.x);
		this.props.onChange(m);
	};

	changeMinutes = pos => {
		const m = this.props.moment;
		m.minutes(pos.x);
		this.props.onChange(m);
	};

	render() {
		const m = this.props.moment;

		return (
			<div className={cx('m-time', this.props.className)}>
				<div className="showtime">
					<span className="time">{m.format('HH')}</span>
					<span className="separater">:</span>
					<span className="time">{m.format('mm')}</span>
				</div>
				<div className="sliders">
					<div className="time-text">Hours:</div>
					<InputSlider
						className="u-slider-time"
						xmin={this.props.minHour}
						xmax={this.props.maxHour}
						x={m.hour()}
						onChange={this.changeHours}
					/>
					<div className="time-text">Minutes:</div>
					<InputSlider
						className="u-slider-time"
						xmin={this.props.minMinute}
						xmax={this.props.maxMinute}
						x={m.minute()}
						onChange={this.changeMinutes}
					/>
				</div>
			</div>
		);
	}
}
