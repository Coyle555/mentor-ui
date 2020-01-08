jest.mock('../components/Portal', () => {
	return { Portal: props => <div>{props.children}</div> };
});

import React from 'react';
import InsertForm from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

const TAB_KEYSTROKE = 9;
const ESCAPE_KEYSTROKE = 27;

afterEach(cleanup);

describe('Rendering the insert form', () => {
	test('Default render of the insert form', () => {
		const tree = renderer.create(<InsertForm />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Rendering with a submit button', () => {
		const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

		const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Rendering with a list of fields', () => {
		const formFields = [
			{ label: 'Bar', id: 'foo', type: 'string' },
			{ label: 'Baz', id: 'ttt', type: 'string' }
		];

		const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Rendering a required field that has no data', () => {
		const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

		const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Rendering a required field that has data', () => {
		const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];
		const initInsertData = { foo: 'test' };

		const tree = renderer.create(
			<InsertForm formFields={formFields} initInsertData={initInsertData} />
		).toJSON();
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

		fireEvent.keyDown(baseElement, { keyCode: ESCAPE_KEYSTROKE });
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

			fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
			expect(getAllByText('Baz')).toHaveLength(2);
		});

		test('Insert form shift-tab keystroke goes to previous', () => {
			const formFields = [
				{ label: 'Bar', id: 'foo', type: 'string' },
				{ label: 'Baz', id: 'ttt', type: 'string' }
			];

			const { baseElement, getAllByText } = render(<InsertForm formFields={formFields} />);

			fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
			fireEvent.keyUp(baseElement);
			expect(getAllByText('Bar')).toHaveLength(1);
			expect(getAllByText('Baz')).toHaveLength(2);

			fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
			expect(getAllByText('Bar')).toHaveLength(2);
			expect(getAllByText('Baz')).toHaveLength(1);
		});
	});
});

describe('Submitting an insert form', () => {
	describe('Submitting using the button', () => {
		test('Submit button renders on no errors', () => {
			const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

			const { getByText } = render(<InsertForm formFields={formFields} />);

			expect(getByText('Submit')).toBeTruthy();
		});

		test('onSubmit callback', () => {
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

		test('onSubmit with a parsed field of objects', () => {
			const onSubmit = jest.fn();
			const formFields = [{
				label: 'Bar',
				id: 'foo',
				options: [{ name: 'foo' }],
				parse: val => val.name,
				type: 'listfilter'
			}];

			const { getByTestId, getByText } = render(
				<InsertForm formFields={formFields} onSubmit={onSubmit} />
			);

			fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
			fireEvent.click(getByText('Submit'));
			expect(onSubmit).toHaveBeenCalledWith({ foo: { name: 'foo' } });
		});

		test('onSubmit with a parsing a matched field', () => {
			const parseMatchedValue = jest.fn(val => val.id);
			const onSubmit = jest.fn();
			const formFields = [{
				label: 'Bar',
				id: 'foo',
				options: [{ id: 'foo', name: 'Foo' }],
				parse: val => val.name,
				parseMatchedValue,
				type: 'listfilter'
			}];

			const { getByTestId, getByText } = render(
				<InsertForm formFields={formFields} onSubmit={onSubmit} />
			);

			fireEvent.change(getByTestId('field-input'), { target: { value: 'Foo' } });
			fireEvent.click(getByText('Submit'));
			expect(parseMatchedValue).toHaveBeenCalledWith({ id: 'foo', name: 'Foo' });
			expect(onSubmit).toHaveBeenCalledWith({ foo: 'foo' });
		});

		test('Resetting after a submission', () => {
			const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];
			
			const { getByDisplayValue, getByTestId, getByText } = render(
				<InsertForm formFields={formFields} resetForm={true} />);

			fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
			expect(getByTestId('field-input').value).toBe('Test');

			fireEvent.click(getByText('Submit'));
			expect(getByTestId('field-input').value).toBe('');
		});
	});

	describe('Submitting using tab keystroke', () => {
		test('Using tab keystroke to submit', () => {
			const onSubmit = jest.fn();
			const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

			const { baseElement, getByTestId } = render(
				<InsertForm
					formFields={formFields}
					onSubmit={onSubmit}
				/>
			);

			fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
			fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
			expect(onSubmit).toHaveBeenCalledWith({ foo: 'Test' });
		});
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

describe('Form stepper interaction', () => {
	test('Clicking on a stepper step', async () => {
		const formFields = [
			{ label: 'Foo', id: 'foo', type: 'string' },
			{ label: 'Bar', id: 'bar', type: 'string' },
			{ label: 'Baz', id: 'baz', type: 'string' }
		];

		const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

		expect(getAllByText('Foo')).toHaveLength(2);
		// click the second step
		fireEvent.click(getByText('2'));

		await wait(() => {
			expect(getAllByText('Foo')).toHaveLength(1);
			expect(getAllByText('Bar')).toHaveLength(2);
		});
	});

	test('Clicking on the currently active step on the stepper', async () => {
		const formFields = [
			{ label: 'Foo', id: 'foo', type: 'string' },
			{ label: 'Bar', id: 'bar', type: 'string' },
			{ label: 'Baz', id: 'baz', type: 'string' }
		];

		const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

		expect(getAllByText('Foo')).toHaveLength(2);
		expect(getAllByText('Bar')).toHaveLength(1);
		// click the second step
		fireEvent.click(getByText('1'));

		await wait(() => {
			expect(getAllByText('Foo')).toHaveLength(2);
			expect(getAllByText('Bar')).toHaveLength(1);
		});
	});
});

describe.only('Dependency errors', () => {
	const formFields = [
		{ id: 'text', label: 'Text Input' },
		{
			id: 'dependentField',
			label: 'Dependent field',
			dependencies: ['text'],
		}
	];

	test('Checking for dependencies on mount', () => {
		const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Checking for dependencies on mount 2', () => {
		const tree = renderer.create(<InsertForm formFields={formFields.slice().reverse()} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('No dependency error when input is filled in', async () => {
		const { container, debug, getByTestId } = await render(
			<InsertForm formFields={formFields} />
		);

		fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
		const el = container.querySelector('div.stepper-step-circle.stepper-error');
		console.log(el.className);
		expect(el.className).toEqual(expect.not.stringContaining('stepper-error'));
	});
});
