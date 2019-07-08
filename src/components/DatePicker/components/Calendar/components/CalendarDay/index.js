import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeNamespace } from 'compose-namespace';

import './style.less';


export function CalendarDay(props) {
	const {
		day,
		week,
		currentDay,
		currentMoment,
		className,
		onClick,
		minDate,
		maxDate,
	} = props;

	const noOp = () => {
		return null;
	}

	const handleClick = () => {
		onClick(day, week);
	}

	const isDayInMonth = getIsDayInMonth(day, week);

	const dayMoment = createMomentFrom(
		day,
		isDayInMonth,
		currentMoment,
	);

	const isDisabled = getIsDayDisabled(
		dayMoment,
		minDate,
		maxDate,
	);

	const cc = composeNamespace(
		'APMCalendarDay',
		className
	);

	return (
		<td
			className={cn(
				cc(),
			{   [cc('not-present-month')]: isDayInMonth !== 0,
				[cc('current-day')]: day === currentDay,
				[cc('disabled-day')]: isDisabled },
			)}
			onClick={isDisabled
				? noOp
				: handleClick
		}>
			{day}
		</td>
	)
}

/**
 * Returns -1 if day is in previous month
 * Returns 1 if day is in next month
 * and finally 0 if day is in current month
 */
export function getIsDayInMonth(day, week) {
	if (week === 0 && day > 7)
		return -1
	if (week >= 4 && day <= 14)
		return 1
	return 0
}

/**
 * currentDay: moment object
 * min/maxDate: formatted strings i.e. '2019-07-04'
 */
export function getIsDayDisabled(
	currentDay,
	minDate,
	maxDate,
) {
	let isAfter = false;
	let isBefore = false;

	if (maxDate)
		isAfter = currentDay.isAfter(maxDate)
	if (minDate)
		isBefore = currentDay.isBefore(minDate);

	return isAfter || isBefore;
};

/**
 * returns a moment object set to the day
 * isDayInMonth determines whether the day is
 * in the previous, current, or next month
 *
 * day: integer
 * isDayInMonth: a number out of -1, 0, 1
 */
export function createMomentFrom(
	day,
	isDayInMonth,
	currentMoment,
) {
	const outMoment = currentMoment.clone();

	switch(isDayInMonth) {
		case -1: // previous month
			outMoment.subtract(1, 'month');
			outMoment.date(day);
			return outMoment;
		case 1: // next month
			outMoment.add(1, 'month');
			outMoment.date(day);
			return outMoment;
		default: // current month
			outMoment.date(day);
			return outMoment;
	}
};

CalendarDay.propTypes = {
	day: PropTypes.number,
	week: PropTypes.number,
	currentDay: PropTypes.number,
	currentMoment: PropTypes.object,
	onClick: PropTypes.func,
	className: PropTypes.string,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
}
