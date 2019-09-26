import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import { Node } from '../index';

afterEach(cleanup);

test('Default node render', () => {
	const tree = renderer.create(<Node />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Selected node render', () => {
	const tree = renderer.create(<Node selected={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Clickable node', () => {
	const tree = renderer.create(<Node clickable={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Node with a title', () => {
	const tree = renderer.create(<Node title="Foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Node with a subtitle string', () => {
	const tree = renderer.create(<Node subtitle="Bar" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Node with a subtitle function', () => {
	const node = { name: 'baz' };
	const subtitle = jest.fn(node => node.name);

	const tree = renderer.create(<Node node={node} subtitle={subtitle} />).toJSON();

	expect(tree).toMatchSnapshot();
	expect(subtitle).toHaveBeenCalledWith({ name: 'baz' });
});

test('Clicking a node', () => {
	const dispatch = jest.fn();

	const { container } = render(
		<Node nodeIndex={1} dispatch={dispatch} />);

	fireEvent.click(container.querySelector('div.mui-node-content'));
	expect(dispatch).toHaveBeenCalledWith({ type: 'selectNode', nodeIndex: 1 });
});

test('Rendering custom buttons', () => {
	const tree = renderer.create(<Node buttonMenuIndex={-1} customButtons={[<i />]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering with invalid custom buttons object', () => {
	const tree = renderer.create(<Node buttonMenuIndex={-1} customButtons={{}} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering custom buttons with a function', () => {
	const node = { id: 'foo' };
	const customButtons = jest.fn(() => []);

	renderer.create(<Node buttonMenuIndex={-1} customButtons={customButtons} node={node} />);

	expect(customButtons).toHaveBeenCalledWith({id: 'foo' });
});

test('Opening a button menu', () => {
	const dispatch = jest.fn();
	const { container } = render(<Node customButtons={[<i />]} dispatch={dispatch} nodeIndex={1} />);

	fireEvent.click(container.querySelector('button.node-buttons'));
	expect(dispatch).toHaveBeenCalledWith({ type: 'openButtonMenu', nodeIndex: 1 });
});

test('Having a button menu open', () => {
	const customButtons = [<div role="role1" />, <div role="role2" />];
	const node = { id: 'foo' };
	const { getByRole } = render(
		<Node buttonMenuIndex={0} customButtons={customButtons} node={node} nodeIndex={0} />
	);

	expect(getByRole('role1')).toBeTruthy();
	expect(getByRole('role2')).toBeTruthy();
});
