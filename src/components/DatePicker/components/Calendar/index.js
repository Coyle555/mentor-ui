import moment from 'moment';
import React, { Component } from 'react';
import cn from 'classnames';
import { range, chunk } from 'lodash';
import { composeNamespace } from 'compose-namespace';

import { CalendarDay } from './components/CalendarDay';
import { CalendarControls } from './components/CalendarControls';

import './style.less';

const DAYS = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
];

export class Calendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTime: this.props.moment,
			isPreviousMonthDisabled: false,
			isNextMonthDisabled: false
		};
	}

	componentDidMount() {
		this.updateDisabledMonths();
	}

	selectDate = (i, w) => {
		const prevMonth = w === 0 && i > 7;
		const nextMonth = w >= 4 && i <= 14;
		const m = this.props.moment;

		if (prevMonth) m.subtract(1, 'month');
		if (nextMonth) m.add(1, 'month');

		m.date(i);

		this.props.onChange(m);
		this.updateDisabledMonths();
	};

	updateDisabledMonths = () => {
		const { minDate, maxDate } = this.props;
		const { currentTime } = this.state;

		this.setState({
			isPreviousMonthDisabled: isPreviousMonthDisabled(currentTime, minDate),
			isNextMonthDisabled: isNextMonthDisabled(currentTime, maxDate)
		});
	}

	prevMonth = e => {
		e.preventDefault();
		const momentCopy = this.props.moment;
		const { minDate } = this.props;

		momentCopy.subtract(1, 'month');

		if (momentCopy.isBefore(minDate, 'day')) {
			momentCopy.endOf('month');
		}

		this.updateDisabledMonths();
	}

	nextMonth = e => {
		e.preventDefault();
		const momentCopy = this.props.moment;
		const { maxDate } = this.props;

		momentCopy.add(1, 'month');

		if (momentCopy.isAfter(maxDate, 'day')) {
			momentCopy.startOf('month');
		}

		this.updateDisabledMonths();
	}

	render() {
		const {
			className,
			moment,
			minDate,
			maxDate,
		} = this.props;

		const {
			isNextMonthDisabled,
			isPreviousMonthDisabled,
		} = this.state;

		const m = moment;
		const currentDay = m.date();
		const d1 = m
			.clone()
			.subtract(1, 'month')
			.endOf('month')
			.date();

		const d2 = m.clone().date(1).day();
		const d3 = m.clone().endOf('month').date();
		const days = [].concat(
			range(d1 - d2 + 1, d1 + 1),
			range(1, d3 + 1),
			range(1, 42 - d3 - d2 + 1)
		);

		const cc = composeNamespace('APMCalendar', className);

		return (
			<div className={cc()}>
				<CalendarControls
					title={m.format('MMMM YYYY')}
					leftButtonOnClick={this.prevMonth}
					leftButtonDisabled={isPreviousMonthDisabled}
					rightButtonOnClick={this.nextMonth}
					rightButtonDisabled={isNextMonthDisabled}
				/>
				<table className={cc('table')}>
					<thead>
						<tr>
							{ DAYS.map(d => (
								<td
									key={d}
									className={cc('table-heading')}
								>
									{d}
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{ chunk(days, 7).map((row, week) =>
							<tr key={week}>
								{row.map(i =>
									<CalendarDay
										key={i}
										day={i}
										currentDay={currentDay}
										week={week}
										onClick={this.selectDate}
										currentMoment={m}
										minDate={minDate}
										maxDate={maxDate}
									/>
								)}
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export function isPreviousMonthDisabled(
	currentMoment,
	minDate
) {
	if (!minDate)
		return false
	return !currentMoment.isSameOrAfter(minDate);
}

export function isNextMonthDisabled(
	currentMoment,
	maxDate
) {
	if (!maxDate)
		return false
	return !currentMoment.isSameOrBefore(maxDate);
}
