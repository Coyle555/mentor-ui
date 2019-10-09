import React from 'react';
import DatePickerInput from '../DatePickerInput';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Datepicker input with initial date', () => {
	describe('Datetime', () => {
		it('Date time initialization with valid datetime', () => {
			const datetime = '1999-08-31T10:23:00-00:00';

			const { getByTestId } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(getByTestId('datepicker-input-').value).toBe('Aug 31, 1999 - 06:23 am');
		});

		it('Date time initialization with invalid datetime', () => {
			const datetime = '1999';

			const { getByTestId } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(getByTestId('datepicker-input-').value).not.toBe(datetime);
		});
	});

	describe('Date initialization', () => {
		it('Valid date', () => {
			const date = '1999-8-31';

			const { getByTestId } = render(<DatePickerInput type="date" value={date} />);
			expect(getByTestId('datepicker-input-').value).toBe('Aug 31, 1999');
		});

		it('Invalid date', () => {
			const date = '1999';

			const { getByTestId } = render(<DatePickerInput type="date" value={date} />);
			expect(getByTestId('datepicker-input-').value).not.toBe('Aug 31, 1999');
		});
	});
});
