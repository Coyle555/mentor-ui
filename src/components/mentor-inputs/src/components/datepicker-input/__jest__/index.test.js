import React from 'react';
import DatePickerInput from '../DatePickerInput';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Datepicker input with initial date', () => {
	describe('Datetime', () => {
		it('Date time initialization with valid datetime', () => {
			const datetime = '1999-08-31T10:23:00-00:00';

			const { container } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(container.querySelector('input').value).toBe('Aug 31, 1999, 6:23 AM');
		});

		it('Date time initialization with invalid datetime', () => {
			const datetime = '1999';

			const { container } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(container.querySelector('input').value).toBe('');
		});
	});

	describe('Date initialization', () => {
		it('Valid date', () => {
			// Date input needs to be YYYY-MM-DD format
			//    YYYY-M-DD will fail!
			const date = '1999-08-31';

			// Can't convert to local for this to pass
			//   converting to local will shift by 1 day
			const { container } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);
			expect(container.querySelector('input').value).toBe('Aug 31, 1999');
		});

		it('Invalid date', () => {
			const date = '1999';

			const { container } = render(<DatePickerInput type="date" value={date} />);
			expect(container.querySelector('input').value).toBe('');
		});
	});
});
