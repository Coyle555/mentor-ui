import React, {
	useState,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import { range, chunk } from 'lodash';
import { composeNamespace } from 'compose-namespace';

import { CalendarDay } from './components/CalendarDay';
import { CalendarControls } from './components/CalendarControls';

import './style.less';

const DAYS = Object.freeze([
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
]);

export function Calendar(props) {
	const {
		className,
		moment: m,
		minDate,
		maxDate,
		onChange,
	} = props;

	const [days, setDays] = useState(getDays(m));
	const [
		isLeftButtonDisabled,
		setIsLeftButtonDisabled,
	] = useState(isPreviousMonthDisabled(m, minDate));

	const [
		isRightButtonDisabled,
		setIsRightButtonDisabled,
	] = useState(isNextMonthDisabled(m, maxDate));

	/**
	 * Set isRight / isLeftButtonDisabled state
	 * when day state is modified.
	 */
	useEffect(() => {
		if (isPreviousMonthDisabled(m, minDate))
			setIsLeftButtonDisabled(true);
		else if (isLeftButtonDisabled) {
			setIsLeftButtonDisabled(false);
		}

		if (isNextMonthDisabled(m, maxDate))
			setIsRightButtonDisabled(true);
		else if (isRightButtonDisabled) {
			setIsRightButtonDisabled(false);
		}
	}, [days]);

	const currentDay = m.date();
	const cc = composeNamespace('APMCalendar', className);

	return (
		<div className={cc()} data-testid='calendar'>
			<CalendarControls
				title={m.format('MMMM YYYY')}
				leftButtonOnClick={leftButtonCallback(
					m,
					minDate,
					buttonCallback(m, setDays, getDays),
				)}
				leftButtonDisabled={isLeftButtonDisabled}
				rightButtonOnClick={rightButtonCallback(
					m,
					maxDate,
					buttonCallback(m, setDays, getDays),
				)}
				rightButtonDisabled={isRightButtonDisabled}
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
									onClick={selectDate(
										m,
										onChange,
										buttonCallback(
											m,
											setDays,
											getDays
										),
									)}
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
};

/**
 * callback invoked by right / leftbuttonCallback functions
 */
export function buttonCallback(
	m,
	setDays,
	getDays
) {
	return () => {
		setDays(getDays(m));
	}
}

/**
 * returns an array of integers representing the
 * days in the month.
 *
 * m: moment instance
 */
export function getDays(m) {
	const d1 = m
		.clone()
		.subtract(1, 'month')
		.endOf('month')
		.date();

	const d2 = m.clone().date(1).day();
	const d3 = m.clone().endOf('month').date();

	return [].concat(
		range(d1 - d2 + 1, d1 + 1), // previous month
		range(1, d3 + 1), // current month
		range(1, 42 - d3 - d2 + 1) // next month
	);
}

export function	selectDate(
	m, // moment object
	onChange,
	buttonCallback
) {
	return (day, week) => {
		const prevMonth = week === 0 && day > 7;
		const nextMonth = week >= 4 && day <= 14;

		if (prevMonth) m.subtract(1, 'month');
		if (nextMonth) m.add(1, 'month');

		m.date(day);
		onChange(m);
		buttonCallback();
	};
};

export function leftButtonCallback(
	m, // moment object
	minDate,
	callback
) {
	return (evt) => {
		evt.preventDefault();

		m.subtract(1, 'month');

		if (m.isBefore(minDate, 'day')) {
			m.endOf('month');
		}

		callback();
	}
}

export function	rightButtonCallback(
	m, // moment object
	maxDate,
	callback
) {
	return (evt) => {
		evt.preventDefault();

		m.add(1, 'month');

		if (m.isAfter(maxDate, 'day')) {
			m.startOf('month');
		}

		callback();
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

Calendar.propTypes = {
	className: PropTypes.string,
	moment: PropTypes.object.isRequired,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}
