import React from 'react';
import { LinkedFields } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, waitForDomChange } from '@testing-library/react';

afterEach(cleanup);

test('Linked fields with no fields', () => {
	const tree = renderer.create(<LinkedFields fields={[]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Linked field with a list of fields', () => {
	const fields = [
		{
			label: 'Original Field',
			id: 'origField',
			type: 'string',
		},
		{
			label: 'Linked Field',
			id: 'linkedField',
			type: 'string',
			onLink: () => {},
		}
	];

	const tree = renderer.create(<LinkedFields fields={[]} />).toJSON();
	expect(tree).toMatchSnapshot();
});

describe.only('Behavior where original field changes the linked field value', () => {
	const fields = [
		{
			label: 'Original Field',
			id: 'origField',
			type: 'string',
		},
		{
			label: 'Linked Field',
			id: 'linkedField',
			type: 'string',
			onLink: () => {},
		}
	];

	test('Linked fields are disabled if the original field has no value', () => {
		const data = { id: 'data-id', origField: '' };
		const { container } = render(<LinkedFields data={data} fields={fields} />);

		expect(container.querySelector('input[name="linkedField"]').disabled).toEqual(true);
	});

	test.skip('Linked fields are editable if the original field has a value', async () => {
		const data = { id: 'data-id', origField: '' };
		const { container, debug } = render(<LinkedFields data={data} fields={fields} />);

		fireEvent.change(
			container.querySelector('input[name="origField"]'),
			{ target: { value: 'foo' } }
		);

		await waitForDomChange({ container }).then(mutationsList => {
			console.log('mutation list', mutationsList);
			expect(container.querySelector('input[name="linkedField"]').disabled)
				.toEqual(false);
		});
	});

	test('Linked fields are mount properly with data', () => {
		const data = { id: 'data-id', origField: 'foo', linkedField: 'test' };
		const { container, } = render(<LinkedFields data={data} fields={fields} />);

		expect(container.querySelector('input[name="linkedField"]').disabled)
			.toEqual(false);
		expect(container.querySelector('input[name="linkedField"]').value)
			.toEqual('test');
	});

	test.skip('Linked fields are cleared if the original field value changes', () => {
		const data = { id: 'data-id', origField: 'foo', linkedField: 'test' };
		const { container, } = render(<LinkedFields data={data} fields={fields} />);

		expect(container.querySelector('input[name="linkedField"]').value)
			.toEqual('test');

		fireEvent.change(
			container.querySelector('input[name="origField"]'),
			{ target: { value: 'bar' } }
		);

		expect(container.querySelector('input[name="linkedField"]').value)
			.toEqual('');
	});

	test.skip('Linked fields are disabled if the original field value changes', () => {
		const data = { id: 'data-id', origField: 'foo', linkedField: 'test' };
		const { container, } = render(<LinkedFields data={data} fields={fields} />);

		expect(container.querySelector('input[name="linkedField"]').disabled)
			.toEqual(false);

		fireEvent.change(
			container.querySelector('input[name="origField"]'),
			{ target: { value: 'bar' } }
		);

		expect(container.querySelector('input[name="linkedField"]').disabled)
			.toEqual(true);
	});

	test('Linked fields are cleared if the original field throws an error', () => {

	});

	test('Linked fields are disabled if the original field throws an error', () => {

	});
});
