import React from 'react';
import { TypeaheadSelector } from '../index';
import renderer from 'react-test-renderer';

describe('Rendering the selector', () => {
	test('Default render of selector', () => {
		const tree = renderer.create(<TypeaheadSelector />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Custom results class', () => {
		const tree = renderer.create(<TypeaheadSelector customClasses={{ results: 'foo' }} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Header label rendered', () => {
		const tree = renderer.create(<TypeaheadSelector header="header foo" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('List of options rendered', () => {
		const tree = renderer.create(<TypeaheadSelector options={['foo', 'bar', 'baz']} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
