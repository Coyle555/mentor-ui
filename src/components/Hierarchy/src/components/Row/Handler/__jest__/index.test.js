import React from 'react';
import renderer from 'react-test-renderer';
import { Handler } from '../index';

test('Render nondraggable handle', () => {
	const tree = renderer.create(<Handler canDrag={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render draggable handle', () => {
	const tree = renderer.create(<Handler canDrag={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render loading handle', () => {
	const tree = renderer.create(<Handler loading={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render custom handle', () => {
	const customHandle = jest.fn(() => <img src="/foo" />);
	const tree = renderer.create(
		<Handler customHandle={customHandle} node={{ id: 'foo' }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
	expect(customHandle).toHaveBeenCalledWith({ id: 'foo' });
});

test('Render custom handle that returns null', () => {
	const customHandle = jest.fn(() => null);
	const tree = renderer.create(
		<Handler customHandle={customHandle} node={{ id: 'foo' }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
