jest.mock('react-dropzone', () => {
	return (props) => <div>{JSON.stringify(props)}</div>;
});

import React from 'react';
import { FileCell } from '../index';
import renderer from 'react-test-renderer';

test('Default render of file cell', () => {
	const tree = renderer.create(<FileCell value="/foo" />);

	expect(tree).toMatchSnapshot();
});

test('Render of file cell with no value', () => {
	const tree = renderer.create(<FileCell value="" />);

	expect(tree).toMatchSnapshot();
});
