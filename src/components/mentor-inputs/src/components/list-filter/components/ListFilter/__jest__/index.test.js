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
	test('List of options', async () => {
		const options = ['foo', 'bar', 'baz'];
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('List of options with an initial value', async () => { 
		const options = ['foo', 'bar', 'baz'];
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} value="b" />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});
});
