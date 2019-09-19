import React from 'react';
import { ImageCell } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of image cell', () => {
	const tree = renderer.create(<ImageCell value="/foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of image cell with no value', () => {
	const tree = renderer.create(<ImageCell value="" />).toJSON();

	expect(tree).toMatchSnapshot();
});
