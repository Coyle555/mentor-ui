import React from 'react';
import DatePickerInput from '../DatePickerInput';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Datepicker input with initial date', () => {
	describe('Datetime', () => {
		it('Date time initialization with valid datetime', () => {
			const datetime = 'Aug 31, 1999 - 10:23 pm';

			const { getByTestId } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(getByTestId('datepicker-input-').value).toBe(datetime);
		});

		it('Date time initialization with invalid datetime', () => {
			const datetime = 'Aug 31, 1999 - 10: pm';

			const { getByTestId } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(getByTestId('datepicker-input-').value).not.toBe(datetime);
		});
	});

	describe('Date initialization', () => {
		it('Valid date', () => {
			const date = 'Aug 31, 1999';

			const { getByTestId } = render(<DatePickerInput type="date" value={date} />);
			expect(getByTestId('datepicker-input-').value).toBe(date);
		});

		it('Invalid date', () => {
			const date = 'Aug 31, 1999 10:23 pm';

			const { getByTestId } = render(<DatePickerInput type="date" value={date} />);
			expect(getByTestId('datepicker-input-').value).toBe('Aug 31, 1999');
		});
	});

	describe('Time initialization', () => {
		it('Valid time', () => {
			const time = '10:23 pm';

			const { getByTestId } = render(<DatePickerInput type="time" value={time} />);
			expect(getByTestId('datepicker-input-').value).toBe(time);
		});

		it('Invalid time', () => {
			const time = 'Aug 31, 1999 10:23 pm';

			const { getByTestId } = render(<DatePickerInput type="time" value={time} />);
			expect(getByTestId('datepicker-input-').value).toBe('');
		});
	});
});
