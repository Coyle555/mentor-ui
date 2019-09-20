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

test('Clicking a node', async () => {
	const node = { name: 'foo' };
	const onClick = jest.fn();

	const { container } = render(
		<Node node={node} onNodeClick={onClick} />);

	fireEvent.click(container.querySelector('div.mui-node-content'));
	expect(onClick).toHaveBeenCalledWith({ name: 'foo' });
});
