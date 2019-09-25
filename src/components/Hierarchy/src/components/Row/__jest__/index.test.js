jest.mock('../Handler', () => {
	return { Handler: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../Node', () => {
	return { Node: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../Scaffold', () => {
	return { Scaffold: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import { Row } from '../index';

afterEach(cleanup);

const tree = [{
	childrenCount: 0,
	expanded: false,
	id: 'foo',
	level: 0,
	parent: null,
	title: 'Foo',
	subtitle: 'Foo subtitle'
}];

test('Default render of a row', () => {
	const json = renderer.create(<Row index={0} tree={tree} />).toJSON();

	expect(json).toMatchSnapshot();
});

test('Render of row with custom style', () => {
	const json = renderer.create(
		<Row index={0} style={{ width: '10px' }} tree={tree} />
	).toJSON();

	expect(json).toMatchSnapshot();
});

test('Toggling child visibility callback', () => {
	const tree = [{ id: 'foo' }];
	const toggleChildVisibility = jest.fn();
	const { container } = render(
		<Row
			index={0}
			toggleChildVisibility={toggleChildVisibility}
			tree={tree}
		/>
	);

	fireEvent.click(container.querySelector('button'));
	expect(toggleChildVisibility).toHaveBeenCalledWith({
		index: 0,
		node: { id: 'foo' }
	});
});
