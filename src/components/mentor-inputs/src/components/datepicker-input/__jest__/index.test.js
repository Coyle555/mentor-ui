import React from 'react';
import DatePickerInput from '../DatePickerInput';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Datepicker default render', () => {
	it('Default datetime render -- not required', () => {
		const tree = renderer.create(
			<DatePickerInput type="datetime" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('Default date render -- not required', () => {
		const tree = renderer.create(
			<DatePickerInput type="datetime" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('Default datetime render -- required', () => {
		const tree = renderer.create(
			<DatePickerInput required={true} type="datetime" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('Default date render -- required', () => {
		const tree = renderer.create(
			<DatePickerInput required={true} type="datetime" />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Datepicker passed props conditions', () => {
	describe('initialized with date', () => {
		it('should render valid formatted date with valid date initialization', () => {
			// Date input needs to be YYYY-MM-DD format
			//    YYYY-M-DD will fail!
			const date = '1999-08-31';

			// Can't convert to local for this to pass
			//   converting to local will shift by 1 day
			const { container } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);
			expect(container.querySelector('input').value).toBe('Aug 31, 1999');
		});
		it('should render an empty string with invalid date initialization', () => {
			const date = 'invalid';

			const { container } = render(<DatePickerInput type="date" value={date} />);
			expect(container.querySelector('input').value).toBe('');
		});
	});
	describe('initialized with datetime', () => {
		it('should render valid formatted date with valid datetime initialization', () => {
			const datetime = '1999-08-31T10:23:00-00:00';

			const { container } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(container.querySelector('input').value).toBe('Aug 31, 1999, 6:23 AM');
		});
		it('should render an empty string with invalid datetime initialization', () => {
			const datetime = 'invalid';

			const { container } = render(<DatePickerInput type="datetime" value={datetime} />);
			expect(container.querySelector('input').value).toBe('');
		});
	})
	describe('onChange events', () => {
		it('should call onChange props from user input', () => {
			const onChange = jest.fn(() => null);
			// Initialize with a valid date
			const date = '2020-06-01';
			const { container } = render(<DatePickerInput
				name="test-datepicker"
				value={date}
				onChange={onChange}
			/>);

			fireEvent.change(container.querySelector('input'), { target: { value: 'Jun 16, 2020' } });

			// Assert the input value changed correctly
			expect(onChange).toHaveBeenCalledWith(true, 'Jun 16, 2020', 'test-datepicker');

		})
	});

	describe('onBlur events', () => {
		it('should call onBlur prop if blurred with a valid date', () => {
			const onBlur = jest.fn();
			// Initialize with a valid date
			const date = '2020-06-01';
			const { container } = render(
				<DatePickerInput
					name="test-datepicker"
					onBlur={onBlur}
					type="date"
					value={date}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: 'Jun 16, 2020' } });
			fireEvent.blur(container.querySelector('input'));

			expect(onBlur).toHaveBeenCalledWith(false, 'Jun 16, 2020', 'test-datepicker');
		});

		it('should clear input if blurred with an invalid date', () => {
			// Initialize with a valid date
			const date = '2020-06-01';
			const onBlur = jest.fn();
			const { container, getByText } = render(
				<DatePickerInput
					name="test-datepicker"
					onBlur={onBlur}
					type="date"
					value={date}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: 'invalid date' } });
			fireEvent.blur(container.querySelector('input'));

			expect(onBlur).toHaveBeenCalledWith(false, '', 'test-datepicker');
			expect(container.querySelector('input').value).toBe('');
		});

		it('Input renders with required class if input blurred with an invalid date', () => {
			// Initialize with a valid date
			const date = '2020-06-01';
			const { container, getByText } = render(
				<DatePickerInput
					name="test-datepicker"
					required={true}
					type="date"
					value={date}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: 'invalid date' } });
			fireEvent.blur(container.querySelector('input'));

			expect(container.querySelector('input')).toHaveClass('mui-mi-input-field-has-error');
		});
	});

	describe('prop value updates', () => {
		it('should update to formatted string if input is valid', () => {
			// Initialize with a valid date
			const date = '';
			const { container, rerender } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

			// Assert the input value changed correctly
			expect(container.querySelector('input').value).toBe('');

			const newValidDate = '2020-06-01'
			rerender(<DatePickerInput type="date" value={newValidDate} convertToLocal={false} />)

			// Assert the input value changed correctly
			expect(container.querySelector('input').value).toBe('Jun 01, 2020');
		})
		it('should update empty string if input is invalid', () => {
			// Initialize with a valid date
			const date = '';
			const { container, rerender } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

			// Assert the input value changed correctly
			expect(container.querySelector('input').value).toBe('');

			const newValidDate = 'invalidDate'
			rerender(<DatePickerInput type="date" value={newValidDate} convertToLocal={false} />)

			// Assert the input value changed correctly
			expect(container.querySelector('input').value).toBe('');
		})
	})
	it('allows custom class', () => {
		// Initialize with a valid data
		const date = '2020-06-01';
		const tree = renderer.create(
			<DatePickerInput
				type="date"
				value={date}
				convertToLocal={false}
				className="foo"
			/>).toJSON();

		// Assert the date initialized correctly
		expect(tree).toMatchSnapshot();
	})
});

describe('Datepicker user use cases', () => {
	it('allows picking a date by clicking through a ui', () => {
		// Initialize with a valid date
		const date = '2020-06-01';
		const { container, getByText } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

		// Assert the date initialized correctly
		expect(container.querySelector('input').value).toBe('Jun 01, 2020');

		// Open the ui date picker
		fireEvent.click(container.querySelector('input'));

		// and click on another day that DOES NOT CONFLICT with test date
		fireEvent.click(getByText('16'))

		// Assert the input value changed correctly
		expect(container.querySelector('input').value).toBe('Jun 16, 2020');
	})
	it('allows picking a date manually through typing', () => {
		// Initialize with a valid date
		const date = '2020-06-01T10:23:00-00:00';
		const { container } = render(<DatePickerInput
			name="test-datepicker"
			value={date}
		/>);

		// Assert the date initialized correctly
		expect(container.querySelector('input').value).toBe('Jun 01, 2020, 6:23 AM');

		fireEvent.change(container.querySelector('input'), { target: { value: 'Mar 15, 2020, 6:22 PM' } });

		// Blur the input to make sure the input was valid
		fireEvent.blur(container.querySelector('input'));

		// Assert the input value changed correctly
		expect(container.querySelector('input').value).toBe('Mar 15, 2020, 6:22 PM');
	})
	it('closes the datepicker ui when the tab button is pressed', () => {
		// Initialize with a valid date
		const date = '2020-06-01';
		const { baseElement, container, getByText, queryByText } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

		// Assert the date initialized correctly
		expect(container.querySelector('input').value).toBe('Jun 01, 2020');

		// Open the ui date picker
		fireEvent.click(container.querySelector('input'));

		// Assert that a day element in the datepicker is shown
		expect(getByText('16')).toBeInTheDocument()

		// press the tab key
		const TAB_KEYCODE = 9;
		fireEvent.keyDown(container.querySelector('input'), { keyCode: TAB_KEYCODE });

		// Assert that a day element in the datepicker is hidden
		expect(queryByText('16')).toBeNull()
	})
});


