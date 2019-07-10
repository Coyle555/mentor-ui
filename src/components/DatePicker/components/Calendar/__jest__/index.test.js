jest.mock('../components/CalendarDay', () => ({
	CalendarDay: (props) => (
		<button
			data-testid="calendar-day"
			onClick={props.onClick}>
			CalendarDay
		</button>
	)
}));

jest.mock('../components/CalendarControls', () => ({
	CalendarControls: (props) => (
		<div>
			<button
				data-testid='left-button'
				disabled={props.isLeftButtonDisabled}
			/>
			<button
				data-testid='right-button'
				disabled={props.isRightButtonDisabled}
			/>
		</div>
	)
}));

import React from 'react';
import {
	cleanup,
	render,
	fireEvent,
} from '@testing-library/react';
import Moment from 'moment';

import {
	Calendar,
	isNextMonthDisabled,
	isPreviousMonthDisabled,
	rightButtonCallback,
	leftButtonCallback,
	selectDate,
	getDays,
	buttonCallback
} from '../';

beforeEach(cleanup);

describe('Calendar Component', () => {
	const getMoment = () => new Moment('2000-01-01');

	it('Should render with base props', () => {
		const m = getMoment();
		const { container } = render(
			<Calendar
				moment={m}
				onChange={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should should have className from prop', () => {
		const m = getMoment();
		const className = 'pulse';
		const { getByTestId } = render(
			<Calendar
				className={className}
				moment={m}
				onChange={() => {}}
			/>
		);

		const classes = JSON.stringify(
			getByTestId('calendar').classList
		);

		expect(classes).toMatch(/pulse/);
	});

	it('Should start with APM in className', () => {
		const m = getMoment();
		const { getByTestId } = render(
			<Calendar
				moment={m}
				onChange={() => {}}
			/>
		);

		const classes = getByTestId('calendar').classList[0];
		expect(classes).toMatch(/^(APM).*/);
	});

	it('Should start with APM in className', () => {
		const m = getMoment();
		const { getByTestId } = render(
			<Calendar
				moment={m}
				onChange={() => {}}
			/>
		);

		const classes = getByTestId('calendar').classList[0];
		expect(classes).toMatch(/^(APM).*/);
	});

	it('Clicking on CalendarDay should fire onChange callback', () => {
		const m = getMoment();
		const mockOnChange = jest.fn(oof => 'bar');
		const { container } = render(
			<Calendar
				moment={m}
				onChange={mockOnChange}
			/>
		);
		const s = container.querySelectorAll(
			'[data-testid="calendar-day"]'
		)[0];
		fireEvent.click(s);

		expect(mockOnChange).toHaveBeenCalledTimes(1);
		expect(mockOnChange.mock.results[0].value).toBe('bar');
	});

	describe('Calendar methods', () => {
		describe('isNextMonthDisabled', () => {
			it('Should return false if no maxDate', () => {
				const m = getMoment();
				expect(isNextMonthDisabled(m)).toBe(false);
			});

			it('Should return true if moment is greater than minDate', () => {
				const m = getMoment();
				expect(isNextMonthDisabled(m, '1999-01-01'))
					.toBe(true);
			});

			it('Should return false if date is the same as moment', () => {
				const m = getMoment();
				expect(isNextMonthDisabled(m, '2000-01-01'))
					.toBe(false);
			});
		});

		describe('isPreviousMonthDisabled', () => {
			it('Should return false if no minDate', () => {
				const m = getMoment();
				expect(isPreviousMonthDisabled(m)).toBe(false);
			});

			it('Should return true if moment is less than minDate', () => {
				const m = getMoment();
				expect(isPreviousMonthDisabled(
					m,
					'2001-01-01',
				))
					.toBe(true);
			});

			it('Should return false if date is the same as moment', () => {
				const m = getMoment();
				expect(isPreviousMonthDisabled(
					m, '2000-01-01',
				))
					.toBe(false);
			});
		});

		describe('rightButtonCallback', () => {
			const mockEvent = {
				preventDefault: jest.fn(oof => 'foo'),
			};
			const maxDate = '2000-02-15';

			it('Should return a function', () => {
				const func = rightButtonCallback();
				expect(typeof func === 'function').toBe(true);
			});

			test('Returned function should invoke callback', () => {
				const m = getMoment();
				const mockCallback = jest.fn(right => 'left');
				const n = m.clone();

				rightButtonCallback(
					n,
					maxDate,
					mockCallback,
				)(mockEvent);

				expect(mockCallback).toHaveBeenCalledTimes(1);
				expect(mockCallback.mock.results[0].value)
					.toBe('left');
			});

			test('Should add a month to cloned moment', () => {
				const m = getMoment();
				const n = m.clone();

				rightButtonCallback(
					n,
					maxDate,
					() => {},
				)(mockEvent);

				expect(m.add(1, 'month').isSame(n))
					.toBe(true);
			});

			test('Should change moment to start of month if day is past maxDate', () => {
				const m = getMoment();
				const n = m
					.clone()
					.add(20, 'day');

				rightButtonCallback(
					n,
					maxDate,
					() => {},
				)(mockEvent);

				expect(m
					.add(1, 'month')
					.startOf('month')
					.isSame(n)
				)
					.toBe(true);
			});

			test('Returned function should envoke event.preventDefault', () => {
				const m = getMoment();
				const n = m.clone();
				mockEvent.preventDefault.mockReset();

				rightButtonCallback(
					n,
					maxDate,
					() => {},
				)(mockEvent);

				expect(mockEvent.preventDefault)
					.toHaveBeenCalledTimes(1);

				mockEvent.preventDefault.mockReset();
			});
		});

		describe('leftButtonCallback', () => {
			const mockEvent = {
				preventDefault: jest.fn(oof => 'foo'),
			};
			const minDate = '1999-12-31';

			it('Should return a function', () => {
				const func = leftButtonCallback();
				expect(typeof func === 'function').toBe(true);
			});

			test('Returned function should invoke callback', () => {
				const m = getMoment();
				const mockCallback = jest.fn(right => 'left');
				const n = m.clone();

				leftButtonCallback(
					n,
					minDate,
					mockCallback,
				)(mockEvent);

				expect(mockCallback).toHaveBeenCalledTimes(1);
				expect(mockCallback.mock.results[0].value)
					.toBe('left');
			});

			test('Should subtract a month to cloned moment', () => {
				const m = getMoment();
				const n = m.clone();

				leftButtonCallback(
					n,
					'1999-10-10',
					() => {},
				)(mockEvent);

				expect(m.subtract(1, 'month').isSame(n))
					.toBe(true);
			});

			test('Should change moment to end of month if day is past minDate', () => {
				const m = getMoment();
				const n = m
					.clone();

				leftButtonCallback(
					n,
					minDate,
					() => {},
				)(mockEvent);

				expect(m
					.clone()
					.subtract(1, 'month')
					.endOf('month')
					.isSame(n)
				)
					.toBe(true);
			});

			test('Returned function should envoke event.preventDefault', () => {
				const m = getMoment();
				const n = m.clone();
				mockEvent.preventDefault.mockReset();

				leftButtonCallback(
					n,
					minDate,
					() => {},
				)(mockEvent);

				expect(mockEvent.preventDefault)
					.toHaveBeenCalledTimes(1);

				mockEvent.preventDefault.mockReset();
			});
		});

		describe('selectDate', () => {
			it('Should return a function', () => {
				const func = selectDate();
				expect(typeof func === 'function').toBe(true);
			});

			test('Returned function should invoke first callback', () => {
				const m = getMoment();
				const mockCallback = jest.fn(foo => 'bar');
				const handler = selectDate(
					m,
					mockCallback,
					() => {}
				);

				handler(10, 0);

				expect(mockCallback).toHaveBeenCalledTimes(1);
				expect(mockCallback.mock.results[0].value)
					.toBe('bar');
			});

			test('Returned function should invoke second callback', () => {
				const m = getMoment();
				const mockCallback = jest.fn(foo => 'bar');
				const handler = selectDate(
					m,
					() => {},
					mockCallback,
				);

				handler(10, 0);

				expect(mockCallback).toHaveBeenCalledTimes(1);
				expect(mockCallback.mock.results[0].value)
					.toBe('bar');
			});

			test('Should set the moment to the selected date if date is within current month', () => {
				const m = getMoment();
				const handler = selectDate(
					m,
					() => {},
					() => {},
				);

				handler(4, 0);

				expect(m.format('YYYY-MM-DD'))
					.toMatch(/2000-01-04/);
			});

			test('Should subtract a month and set to input day if day is in previous month', () => {
				const m = getMoment();
				const handler = selectDate(
					m,
					() => {},
					() => {},
				);

				handler(31, 0);

				expect(m.format('YYYY-MM-DD'))
					.toMatch(/1999-12-31/);
			});

			test('Should add a month and set to input day if day is in next month', () => {
				const m = getMoment();
				const handler = selectDate(
					m,
					() => {},
					() => {},
				);

				handler(14, 4);

				expect(m.format('YYYY-MM-DD'))
					.toMatch(/2000-02-14/);
			});
		});

		describe('getDays', () => {
			it('Should return an array of 42 integers', () => {
				const m = getMoment();
				const days = getDays(m);

				expect(days.length).toEqual(42);
			});

			it('Should return the correct days for the given date', () => {
				const m = getMoment(); // 2000-01-01
				const days = getDays(m);

				expect(days[5]).toEqual(31);
				expect(days[6]).toEqual(1);
				expect(days[0]).toEqual(26);
				expect(days[41]).toEqual(5);
				expect(days[36]).toEqual(31);
			});
		});

		describe('buttonCallback', () => {
			it('Should return a function', () => {
				const func = buttonCallback();
				expect(typeof func === 'function').toBe(true);
			});

			it('Should invoke both callbacks in returned function', () => {
				const mockMoment = 'foo';
				const mockCallbackA = jest.fn(mockCallBackB => 'bar');
				const mockCallbackB = jest.fn(mockMoment => 'baz');

				const handler = buttonCallback(
					mockMoment,
					mockCallbackA,
					mockCallbackB,
				)();

				expect(mockCallbackA).toHaveBeenCalledTimes(1);
				expect(mockCallbackA).toHaveBeenCalledWith('baz');

				expect(mockCallbackB).toHaveBeenCalledTimes(1);
				expect(mockCallbackB).toHaveBeenCalledWith('foo');

				expect(mockCallbackA.mock.results[0].value)
					.toEqual('bar');
				expect(mockCallbackB.mock.results[0].value)
					.toEqual('baz');
			})
		});
	});
});
