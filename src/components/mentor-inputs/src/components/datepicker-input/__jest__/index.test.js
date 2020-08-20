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
	});

	describe('onChange events', () => {
		it('should call onChange props from user input', () => {
			const onChange = jest.fn();
			const date = '2020-06-01';
			const isoDate = new Date('Jun 16, 2020').toISOString();

			const { container } = render(<DatePickerInput
				name="test-datepicker"
				onChange={onChange}
				type="date"
				value={date}
			/>);

			fireEvent.change(container.querySelector('input'), { target: { value: 'Jun 16, 2020' } });
			expect(onChange).toHaveBeenCalledWith(false, isoDate, 'test-datepicker');
		});

		it('Error when user changes to an invalid date', () => {
			const onChange = jest.fn();
			const date = '2020-06-01';

			const { container } = render(<DatePickerInput
				name="test-datepicker"
				onChange={onChange}
				type="date"
				value={date}
			/>);

			fireEvent.change(container.querySelector('input'), { target: { value: 'Jun 16, 202' } });
			expect(container.querySelector('input')).toHaveClass('mui-mi-input-field-has-error');
		});
	});

	describe('onBlur events', () => {
		it('should call onBlur prop if blurred with a valid date', () => {
			const onBlur = jest.fn();
			const date = '2020-06-01';
			const isoDate = new Date('Jun 16, 2020').toISOString();

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

			expect(onBlur).toHaveBeenCalledWith(false, isoDate, 'test-datepicker');
		});

		it('should clear input if blurred with an invalid date', () => {
			const date = '2020-06-01';
			const onBlur = jest.fn();
			const { container, } = render(
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
			const date = '2020-06-01';
			const { container, } = render(
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

	describe('Updating with new prop values', () => {
		it('should update to formatted string if input is valid', () => {
			const date = '';
			const { container, rerender } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

			expect(container.querySelector('input').value).toBe('');

			const newValidDate = '2020-06-01';
			rerender(<DatePickerInput type="date" value={newValidDate} convertToLocal={false} />);

			expect(container.querySelector('input').value).toBe('Jun 01, 2020');
		});
		it('should update empty string if input is invalid', () => {
			const date = '';
			const { container, rerender } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

			expect(container.querySelector('input').value).toBe('');

			const newValidDate = 'invalidDate';
			rerender(<DatePickerInput type="date" value={newValidDate} convertToLocal={false} />);

			expect(container.querySelector('input').value).toBe('');
		});
	});

	it('allows custom class', () => {
		const date = '2020-06-01';
		const tree = renderer.create(
			<DatePickerInput
				type="date"
				value={date}
				convertToLocal={false}
				className="foo"
			/>).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Datepicker user use cases', () => {
	it('allows picking a date by clicking through a ui', () => {
		const date = '2020-06-01';
		const { container, getByText } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

		expect(container.querySelector('input').value).toBe('Jun 01, 2020');

		fireEvent.click(container.querySelector('input'));
		fireEvent.click(getByText('16'));

		expect(container.querySelector('input').value).toBe('Jun 16, 2020');
	});

	it('allows picking a date manually through typing', () => {
		const date = '2020-06-01T10:23:00-00:00';
		const { container } = render(<DatePickerInput
			name="test-datepicker"
			value={date}
		/>);

		expect(container.querySelector('input').value).toBe('Jun 01, 2020, 6:23 AM');

		fireEvent.change(container.querySelector('input'), { target: { value: 'Mar 15, 2020, 6:22 PM' } });
		fireEvent.blur(container.querySelector('input'));

		expect(container.querySelector('input').value).toBe('Mar 15, 2020, 6:22 PM');
	});

	it('closes the datepicker ui when the tab button is pressed', () => {
		const date = '2020-06-01';
		const { container, getByText, queryByText } = render(<DatePickerInput type="date" value={date} convertToLocal={false} />);

		expect(container.querySelector('input').value).toBe('Jun 01, 2020');

		fireEvent.click(container.querySelector('input'));

		expect(getByText('16')).toBeInTheDocument();

		const TAB_KEYCODE = 9;
		fireEvent.keyDown(container.querySelector('input'), { keyCode: TAB_KEYCODE });

		expect(queryByText('16')).toBeNull();
	});
});


