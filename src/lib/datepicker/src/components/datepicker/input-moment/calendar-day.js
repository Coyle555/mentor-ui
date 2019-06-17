import React, { Component } from 'react';
import cx from 'classnames';
import moment from 'moment';

export function isDateAfterMaxDate(m, maxDate, offset, nextMonth) {
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
		if (m.isSame(maxDate, 'month') && m.isSame(maxDate, 'year')) {
			return true;
		}

		// checking next month
		// if the max date is in the rendered days of the next month, 
		// disable the corresponding days
		clone.endOf('month').add(offset, 'days')

		return clone.isSameOrAfter(maxDate);
	}
}

export function isDateBeforeMinDate(m, minDate, offset, prevMonth) {
	const clone = m.clone();
	const currentDay = m.date();
	minDate = moment(minDate);

	// current month
	if (!prevMonth) {
		clone.date(offset);

		return clone.isSameOrBefore(minDate);
	// check behind to prev month
	} else {
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
}

// checks if rendered days of the previous month are disabled
export function isDayDisabledInPrevMonth(m, minDate, offset) {
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
export function isDayDisabledInNextMonth(m, maxDate, offset) {
	const clone = m.clone();

	// if the max date is the same month-year as current date, disable
	// all days rendered in the next month
	if (m.isSame(maxDate, 'month') && m.isSame(maxDate, 'year')) {
		return true;
	}

	// checking next month
	// if the max date is in the rendered days of the next month, 
	// disable the corresponding days
	clone.endOf('month').add(offset, 'days')

	return clone.isSameOrAfter(maxDate);
}

function isDayDisabled(m, minDate, maxDate, offset, prevMonth, nextMonth) {
	let disabled = false;

	// check after max date
	if (!prevMonth && maxDate) {
		disabled = isDateAfterMaxDate(m, maxDate, offset, nextMonth);
	}

	// check before min date
	if (!nextMonth && minDate) {
		disabled = isDateBeforeMinDate(m, minDate, offset, prevMonth);
	}

	return disabled;
}

class CalendarDay extends Component {

	noOp = () => {
		return null;
	}

	onClick = () => {
		this.props.onClick(this.props.i, this.props.week);
	}

	render() {
		const { i, week, currentDate, currentMoment } = this.props;
		const prevMonth = week === 0 && i > 7;
		const nextMonth = week >= 4 && i <= 14;

		/*const currentMomentCopy = moment(currentMoment);

		if (prevMonth) {
			currentMomentCopy.subtract(1, 'month');
		}

		if (nextMonth) {
			currentMomentCopy.add(1, 'month');
		}*/

		const disabled = isDayDisabled(
			currentMoment,
			this.props.minDate,
			this.props.maxDate,
			i,
			prevMonth,
			nextMonth
		);

		const cls = cx({
			'prev-month': prevMonth,
			'next-month': nextMonth,
			'current-day': !prevMonth
				&& !nextMonth
				&& !disabled
				&& i === currentDate,
			'disabled-day': disabled
		});

		if (disabled) {
			return (
				<td className={cls} onClick={this.noOp}>
					{i}
				</td>
			);
		} else {
			return (
				<td className={cls} onClick={this.onClick}>
					{i}
				</td>
			);
		}
	}
}

export default CalendarDay;
