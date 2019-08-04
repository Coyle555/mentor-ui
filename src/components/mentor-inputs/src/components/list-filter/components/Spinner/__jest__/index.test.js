import React from 'react';
import { Spinner } from '../index';
import renderer from 'react-test-renderer';

test('Default render of spinner', () => {
	const tree = renderer.create(<Spinner />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of spinner with a custom class', () => {
	const tree = renderer.create(<Spinner className="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});
