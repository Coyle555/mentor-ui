import React from 'react';
import { ListFilter } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

describe('Renders of list filters', () => {
	test('Default render of list filter', () => {
		const tree = renderer.create(<ListFilter />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Render with a custom css class', () => {
		const tree = renderer.create(<ListFilter className="foo" />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Mounting a list filter', () => {
	const options = ['foo', 'bar', 'baz'];

	test('List of options', async () => {
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('List of options with an initial value', async () => { 
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} value="b" />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Mount list of options with a custom filter', async () => {
		const filter = jest.fn((value) => Promise.resolve([value]));

		const tree = renderer.create(
			<ListFilter filter={filter} options={options} value="foo" />
		);

		expect(filter).toHaveBeenCalledWith('foo');
	});

	test('Required with no value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Required with partial value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} value="b" />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Required with valid value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} value="bar" />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Required with custom validation', async () => {
		const validation = jest.fn();
		const tree = renderer.create(
			<ListFilter
				autoFocus={true}
				name="test"
				options={options}
				required={true}
				validation={validation}
				value="bar"
			/>
		);

		expect(validation).toHaveBeenCalledWith('bar', 'test', ['bar']);
	});
});

describe('List filter receiving new props', () => {
	const options = ['foo', 'bar', 'baz'];
	const newOptions = ['new', 'options', 'list'];

	test('New list of options', async () => {
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
		tree.update(<ListFilter options={newOptions} />);

		await wait(async () => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

});
