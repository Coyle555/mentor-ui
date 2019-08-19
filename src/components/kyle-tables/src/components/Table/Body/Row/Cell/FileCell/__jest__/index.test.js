jest.mock('react-dropzone', () => {
	return (props) => <div>{JSON.stringify(props)}</div>;
});

import React from 'react';
import { FileCell } from '../index';
import renderer from 'react-test-renderer';

test('Default render of file cell', () => {
	const tree = renderer.create(<FileCell colId="foo" rowId="bar" value="/foo" />);

	expect(tree).toMatchSnapshot();
});

test('Render of file cell in edit mode', () => {
	const tree = renderer.create(<FileCell colId="foo" editMode={true} rowId="bar" value="/foo" />);

	expect(tree).toMatchSnapshot();
});
