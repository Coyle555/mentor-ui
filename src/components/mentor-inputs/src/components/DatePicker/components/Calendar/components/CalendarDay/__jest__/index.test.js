import React from 'react';
import {
	cleanup,
	render,
	fireEvent,
} from '@testing-library/react';
import moment from 'moment';

import {
	CalendarDay,
	createMomentFrom,
	getIsDayDisabled,
} from '../';

beforeEach(cleanup);

describe('CalendarDay component', () => {
	const m = new moment('2020-12-05 12:12');

	it('Should should match snapshot with base props', () => {
		const { container } = render(
			<CalendarDay
				day={1}
				week={0}
				currentDay={5}
				currentMoment={m}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should have "current-day" class if day matches currentDay prop', () => {
		const { getByText } = render(
			<CalendarDay
				day={5}
				week={0}
				currentDay={5}
				currentMoment={m}
			/>
		);
		const classes = JSON.stringify(getByText('5').classList);
		expect(classes).toMatch(/current-day/);
	});

	it('Should have "not-present-month" class if day is in previousMonth', () => {
		const { getByText } = render(
			<CalendarDay
				day={30}
				week={0}
				currentDay={5}
				currentMoment={m}
			/>
		);
		const classes = JSON.stringify(getByText('30').classList);
		expect(classes).toMatch(/not-present-month/);
	});

	it('Should have "not-present-month" class if day is in next month', () => {
		const { getByText } = render(
			<CalendarDay
				day={14}
				week={4}
				currentDay={5}
				currentMoment={m}
			/>
		);
		const classes = JSON.stringify(getByText('14').classList);
		expect(classes).toMatch(/not-present-month/);
	});

	it('Shouldn\'t be clickable when disabled', () => {
		const mockOnClick = jest.fn((day, week) => [day, week]);
		const { getByText } = render(
			<CalendarDay
				minDate='2020-12-01'
				day={10}
				week={0}
				currentDay={5}
				currentMoment={m}
			/>
		);

		fireEvent.click(getByText('10'));

		expect(mockOnClick).toHaveBeenCalledTimes(0);
	});

	it('Should invoke onClick callback when clicked', () => {
		const mockOnClick = jest.fn((day, week) => [day, week]);
		const { getByText } = render(
			<CalendarDay
				onClick={mockOnClick}
				day={14}
				week={4}
				currentDay={5}
				currentMoment={m}
			/>
		);
		fireEvent.click(getByText('14'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
		expect(JSON.stringify(
			mockOnClick.mock.results[0].value
		)).toMatch(/["14","4"]/);
	});

	it('Should be disabled if day is before minDate', () => {
		const { getByText } = render(
			<CalendarDay
				minDate='2020-12-01'
				day={10}
				week={0}
				currentDay={5}
				currentMoment={m}
			/>
		);

		const classes = JSON.stringify(getByText('10').classList);

		expect(classes).toMatch('disabled-day');
	});

	it('Should be disabled if day is after maxDate', () => {
		const { getByText } = render(
			<CalendarDay
				maxDate='2020-12-06'
				day={10}
				week={2}
				currentDay={5}
				currentMoment={m}
			/>
		);

		const classes = JSON.stringify(getByText('10').classList);

		expect(classes).toMatch('disabled-day');
	});

	it('Should have overriding className', () => {
		const className = 'circularSquares';
		const { getByText } = render(
			<CalendarDay
				className={className}
				day={10}
				week={2}
				currentDay={5}
				currentMoment={m}
			/>
		);

		const classes = JSON.stringify(getByText('10').classList);

		expect(classes).toMatch(/circularSquares/);
	});

	describe('CalandarDay methods', () => {
		describe('getIsDayDisabled function', () => {
			it('Should return true if currentDay is lower than minDate', () => {
				const m = new moment('2019-01-01');
				const minDate = '2019-12-30';

				expect(getIsDayDisabled(m, minDate))
					.toBe(true);
			});

			it('Should return true if currentDay is higher than maxDate', () => {
				const m = new moment('2019-01-01');
				const maxDate = '2018-12-30';

				expect(getIsDayDisabled(m, null, maxDate))
					.toBe(true);
			});

			it('Should return false if date is within min/maxDate paramerters', () => {
				const minDate = '2018-12-30';
				const maxDate = '2019-12-30';
				const m = new moment('2019-01-01');
				const n = new moment(minDate);
				const o = new moment(maxDate);

				expect(getIsDayDisabled(m, minDate, maxDate))
					.toBe(false);
				expect(getIsDayDisabled(n, minDate, maxDate))
					.toBe(false);
				expect(getIsDayDisabled(o, minDate, maxDate))
					.toBe(false);
			});

			it('Should return false if no min/maxDate args', () => {
				const m = new moment('2019-01-01');
				expect(getIsDayDisabled(m)).toBe(false);
			});
		});

		describe('createMomentFrom function', () => {
			it('Should create a moment object with a date in the previous month', () => {
				const m = new moment('2019-01-01');
				const dayMoment = createMomentFrom(1, -1, m);

				expect(dayMoment.add(1, 'month').isSame(m))
					.toBe(true);
			});

			it('Should create a moment object with a date in the next month', () => {
				const m = new moment('2019-01-01');
				const dayMoment = createMomentFrom(1, 1, m);

				expect(
					dayMoment.subtract(1, 'month')
					.isSame(m)
				).toBe(true);
			});

			it('Should create a moment object within the current month', () => {
				const m = new moment('2019-01-01');
				const dayMoment = createMomentFrom(1, 0, m);

				expect(dayMoment.isBetween('2018-12-31', '2019-02-01')).toBe(true);
			});

			it('Should create a moment with the correct day', () => {
				const m = new moment('2019-01-01');
				const dayMoment = createMomentFrom(1, 0, m);

				expect(dayMoment.date()).toEqual(1);
			});

			it('Should create a moment within the same year of the input moment', () => {
				const m = new moment('2019-01-01');
				const dayMoment = createMomentFrom(20, 0, m);

				expect(dayMoment.year()).toEqual(2019);
			});
		});
	});
});
