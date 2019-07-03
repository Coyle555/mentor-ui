import React, { Component } from 'react';
import cn from 'classnames';
import { composeNamespace } from 'compose-namespace';
import moment from 'moment';

import './style.less';


export class CalendarDay extends Component {
	noOp = () => {
		return null;
	}

	onClick = () => {
		const {
			day,
			week,
			onClick,
		} = this.props;

		onClick(day, week);
	}

	render() {
		const {
			day,
			week,
			currentDate,
			currentMoment,
			className,
			minDate,
			maxDate,
		} = this.props;

		const prevMonth = week === 0 && day > 7;
		const nextMonth = week >= 4 && day <= 14;

		const currentDay = createMomentFrom(
			week,
			day,
			currentMoment,
		);

		const isDisabled = testIsDayDisabled(
			currentDay,
			minDate,
			maxDate,
		);

		const disabled = isDayDisabled(
			currentMoment,
			minDate,
			maxDate,
			day,
			prevMonth,
			nextMonth
		);

		const cc = composeNamespace(
			'APMCalendarDay',
			className
		);

		return (
			<td
				className={cn(
					cc(),
				{   [cc('not-present-month')]: prevMonth
						|| nextMonth,
					[cc('current-day')]: !prevMonth
						&& !nextMonth
						&& !isDisabled
						&& day === currentDate,
					[cc('disabled-day')]: isDisabled },
				)}
				onClick={disabled
					? this.noOp
					: this.onClick
			}>
				{day}
			</td>
		);
	}
}

export function isDateAfterMaxDate(
	m,
	maxDate,
	offset,
	nextMonth
) {
	const clone = m.clone();
	const currentDay = m.date();
	maxDate = moment(maxDate);

	// current month being processed
	if (!nextMonth) {
		clone.add(offset - currentDay, 'days');
		// console.log(clone.format());
		// console.log(maxDate.format());

		return clone.isSameOrAfter(maxDate);
	// check ahead to next month
	} else {
		// if the max date is the same month-year as current date, disable
		// all days rendered in the next month
		if (m.isSame(maxDate, 'month')
			&& m.isSame(maxDate, 'year')) {
			return true;
		}

		// checking next month
		// if the max date is in the rendered days of the next month,
		// disable the corresponding days
		clone.endOf('month').add(offset, 'days')

		return clone.isSameOrAfter(maxDate);
	}
}

export function isDateBeforeMinDate(
	m,
	minDate,
	offset,
	prevMonth
) {
	const clone = m.clone();
	const currentDay = m.date();
	minDate = moment(minDate);

	// current month
	if (!prevMonth) {
		clone.date(offset);

		return clone.isSameOrBefore(minDate);
	}

	// check behind to prev month
	// if the min date is the same month-year as current date, disable
	// all days rendered in the prev month
	if (m.isSame(minDate, 'month') && m.isSame(minDate, 'year')) {
		return true;
	}

	let monthDay = moment(minDate);
	monthDay = monthDay.endOf('month').date();

	// checking prev month
	// if min date is in the rendered days of prev month,
	// disable the corresponding days
	clone.startOf('month').subtract(monthDay - offset + 1, 'days');

	return clone.isSameOrBefore(minDate);
}

// checks if rendered days of the previous month are disabled
export function isDayDisabledInPrevMonth(
	m,
	minDate,
	offset
) {
	const clone = m.clone();

	// if the min date is the same month-year as current date, disable
	// all days rendered in the prev month
	if (m.isSame(minDate, 'month') && m.isSame(minDate, 'year')) {
		return true;
	}

	let monthDay = moment(minDate);
	monthDay = monthDay.endOf('month').date();

	// checking prev month
	// if min date is in the rendered days of prev month,
	// disable the corresponding days
	clone.startOf('month').subtract(monthDay - offset + 1, 'days');

	return clone.isSameOrBefore(minDate);
}

// checks if rendered days of the next month are disabled
export function isDayDisabledInNextMonth(
	m,
	maxDate,
	offset
) {
	const clone = m.clone();

	// if the max date is the same month-year as current date, disable
	// all days rendered in the next month
	if (m.isSame(maxDate, 'month')
		&& m.isSame(maxDate, 'year')) {
		return true;
	}

	// checking next month
	// if the max date is in the rendered days of the next month,
	// disable the corresponding days
	clone.endOf('month').add(offset, 'days')

	return clone.isSameOrAfter(maxDate);
}


function isDayDisabled(
	m,
	minDate,
	maxDate,
	offset,
	prevMonth,
	nextMonth
) {
	let disabled = false;

	// check after max date
	if (!prevMonth && maxDate) {
		disabled = isDateAfterMaxDate(
			m,
			maxDate,
			offset,
			nextMonth
		);
	}

	// check before min date
	if (!nextMonth && minDate) {
		disabled = isDateBeforeMinDate(
			m,
			minDate,
			offset,
			prevMonth
		);
	}

	return disabled;
}

function testIsDayDisabled(
	currentDay,
	minDate,
	maxDate,
) {
	debugger
	const isAfter = currentDay.isAfter(maxDate)
	const isBefore = currentDay.isBefore(minDate);

	return isAfter || isBefore
}

function createMomentFrom(
	week,
	day,
	currentMoment
) {
	const outMoment = currentMoment.clone();
	outMoment.day(day);

	if (week === 0 && day > 7) {
		outMoment.subtract(1, 'month');
		return outMoment;

	} else if (week >= 4 && day <= 14) {
		outMoment.add(1, 'month');
		return outMoment;

	} else {
		return outMoment;
	};
};
