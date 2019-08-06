import React from 'react';
import InsertForm from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Rendering the insert form', () => {
	test('Default render of the insert form', () => {
		const tree = renderer.create(<InsertForm />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Turning off insert form', () => {
	test('Disabling the insert form', () => {
		const onDisable = jest.fn();
		const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

		const { getByTestId } = render(
			<InsertForm formFields={formFields} onDisable={onDisable} />);

		fireEvent.click(getByTestId('disable-form'));
		expect(onDisable).toHaveBeenCalled();
	});

	test('Disabling the insert form by escape keystroke', () => {
		const onDisable = jest.fn();
		const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

		const { baseElement } = render(
			<InsertForm formFields={formFields} onDisable={onDisable} />);

		fireEvent.keyDown(baseElement, { keyCode: 27 });
		expect(onDisable).toHaveBeenCalled();
	});
});

describe('Going forwards and backwards through the fields', () => {

	describe('Using buttons to traverse the form', () => {
		test('Go to the next field', () => {
			const formFields = [
				{ label: 'Bar', id: 'foo', type: 'string' },
				{ label: 'Baz', id: 'ttt', type: 'string' }
			];

			const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

			fireEvent.click(getByText('Next'));
			// stepper and field label are both Baz
			expect(getAllByText('Baz')).toHaveLength(2);
		});

		test('Go to the previous field', () => {
			const formFields = [
				{ label: 'Bar', id: 'foo', type: 'string' },
				{ label: 'Baz', id: 'ttt', type: 'string' }
			];

			const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

			fireEvent.click(getByText('Next'));
			fireEvent.click(getByText('Back'));
			expect(getAllByText('Bar')).toHaveLength(2);
		});
	});

	describe('Using keystrokes to traverse the form', () => {
		test('Insert form tab keystroke goes to next', () => {
			const formFields = [
				{ label: 'Bar', id: 'foo', type: 'string' },
				{ label: 'Baz', id: 'ttt', type: 'string' }
			];

			const { baseElement, getAllByText } = render(<InsertForm formFields={formFields} />);

			fireEvent.keyDown(baseElement, { keyCode: 9 });
			expect(getAllByText('Baz')).toHaveLength(2);
		});

		test('Insert form shift-tab keystroke goes to previous', () => {
			const formFields = [
				{ label: 'Bar', id: 'foo', type: 'string' },
				{ label: 'Baz', id: 'ttt', type: 'string' }
			];

			const { baseElement, getAllByText } = render(<InsertForm formFields={formFields} />);

			fireEvent.keyDown(baseElement, { keyCode: 9 });
			fireEvent.keyUp(baseElement);
			expect(getAllByText('Bar')).toHaveLength(1);
			expect(getAllByText('Baz')).toHaveLength(2);

			fireEvent.keyDown(baseElement, { keyCode: 9, shiftKey: true });
			expect(getAllByText('Bar')).toHaveLength(2);
			expect(getAllByText('Baz')).toHaveLength(1);
		});
	});
});

describe('Submitting an insert form', () => {
	test('Insert form submit renders on no errors', () => {
		const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

		const { getByText } = render(<InsertForm formFields={formFields} />);

		expect(getByText('Submit')).toBeTruthy();
	});

	test('Insert form submit callback', () => {
		const onSubmit = jest.fn();
		const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

		const { getByTestId, getByText } = render(
			<InsertForm
				formFields={formFields}
				onSubmit={onSubmit}
			/>
		);

		fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
		fireEvent.click(getByText('Submit'));
		expect(onSubmit).toHaveBeenCalledWith({ foo: 'Test' });
	});

	test('Insert form resets after a submission', () => {
		const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];
		
		const { getByDisplayValue, getByTestId, getByText } = render(
			<InsertForm formFields={formFields} resetForm={true} />);

		fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
		expect(getByTestId('field-input').value).toBe('Test');

		fireEvent.click(getByText('Submit'));
		expect(getByTestId('field-input').value).toBe('');
	});
});

describe('Initializing the form with data', () => {
	test('Insert form gets initial insertion data', () => {
		const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];
		const initInsertData = { foo: 'Test' };

		const { getByDisplayValue, getByTestId } = render(
			<InsertForm formFields={formFields} initInsertData={initInsertData} />);


		expect(getByTestId('field-input').value).toBe('Test');
	});
});
