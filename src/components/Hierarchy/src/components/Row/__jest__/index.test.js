jest.mock('../Handler', () => {
	return { Handler: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../ToggleButton', () => {
	return { ToggleButton: props => <div role="toggle">{JSON.stringify(props)}</div> };
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
	const tree = renderer.create(<Row index={0} tree={tree} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of row with custom style', () => {
	const tree = renderer.create(
		<Row index={0} style={{ width: '10px' }} tree={tree} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toggling child visibility callback on expanded row', () => {
	const tree = [{ id: 'foo' }];
	const toggleChildVisibility = jest.fn();
	const { getByRole } = render(
		<Row
			expanded={true}
			index={0}
			toggleChildVisibility={toggleChildVisibility}
			tree={tree}
		/>
	);

	fireEvent.click(getByRole('toggle'));
	expect(toggleChildVisibility).toHaveBeenCalledWith({ index: 0, node: { id: 'foo' } });
});

test('Toggling child visibility callback on non expanded row and no custom expand function', () => {
	const tree = [{ id: 'foo' }];
	const toggleChildVisibility = jest.fn();
	const { getByRole } = render(
		<Row
			expanded={false}
			index={0}
			toggleChildVisibility={toggleChildVisibility}
			tree={tree}
		/>
	);

	fireEvent.click(getByRole('toggle'));
	expect(toggleChildVisibility).toHaveBeenCalledWith({ index: 0, node: { id: 'foo' } });
});

test('Toggling child visibility callback on non expanded row and a custom expand function', () => {
	const onExpandNode = () => {};
	const tree = [{ id: 'foo' }];
	const toggleChildVisibility = jest.fn((val) => Promise.resolve(val));
	const { getByRole } = render(
		<Row
			expanded={false}
			index={0}
			toggleChildVisibility={toggleChildVisibility}
			tree={tree}
		/>
	);

	fireEvent.click(getByRole('toggle'));
	expect(toggleChildVisibility).toHaveBeenCalledWith({ index: 0, node: { id: 'foo' } });
});
