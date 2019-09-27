jest.mock('react-virtualized-auto-sizer', () => {
	return props => <div>{JSON.stringify(props)}</div>;
});

import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import { Tree } from '../index';

const tree = {
	children: [
		{
			children: [
				{
					expanded: false,
					id: '1-1-1',
					title: '1-1-1',
					subtitle: 'Bar child 2 subtitle',
					data: {},
					children: []
				},
				{
					children: [{
						expanded: true,
						id: '1-1-2-1',
						title: '1-1-2-1',
						data: {},
						children: [{
							id: '1-1-2-1-1',
							title: '1-1-2-1-1',
							children: [],
							expanded: false
						}]
					}],
					expanded: true,
					id: '1-1-2',
					title: '1-1-2',
					subtitle: 'Bar child subtitle',
					data: {}
				},
				{
					id: '1-1-3',
					title: '1-1-3',
					children: [],
					expanded: false,
					children: []
				}
			],
			expanded: true,
			id: 'bar',
			title: '1-1',
			subtitle: 'Bar subtitle',
			data: {}
		},
		{
			children: [{
				id: '1-2-1',
				expanded: true,
				title: '1-2-1',
				children: []
			}],
			expanded: true,
			id: 'baz',
			title: '1-2',
			subtitle: 'Baz subtitle',
			data: {}
		}
	],
	expanded: true,
	id: '1',
	title: '1',
	subtitle: 'Foo subtitle',
	data: { sample: 'data' }
};

afterEach(cleanup);

test('Rendering hierarchy that is not virtualized', () => {
	const json = renderer.create(<Tree isVirtualized={false} tree={tree} />).toJSON();

	expect(json).toMatchSnapshot();
});

test('Rendering hierarchy that is virtualized', () => {
	const json = renderer.create(<Tree isVirtualized={true} tree={tree} />).toJSON();

	expect(json).toMatchSnapshot();
});

test('Passing in a new tree', async () => {
	const newTree = { id: 'foo', title: 'New Tree', children: [] };
	const { queryByText, rerender } = render(<Tree tree={tree} />);

	rerender(<Tree tree={newTree} />);

	await wait(() => {
		expect(queryByText('New Tree')).toBeTruthy();
	});
});

test('Collapsing a node in the tree', () => {
	const { container, queryByText } = render(<Tree isVirtualized={false} tree={tree} />);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	// all nodes under root are collapsed
	expect(queryByText('1')).toBeTruthy();
	expect(queryByText('1-1')).toBeNull();
	expect(queryByText('1-2')).toBeNull();
});

test('Expanding a node in the tree', () => {
	const { container, queryByText } = render(<Tree isVirtualized={false} tree={tree} />);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	fireEvent.click(container.querySelector('button.node-expand-button'));

	expect(queryByText('1')).toBeTruthy();
	expect(queryByText('1-1')).toBeTruthy();
	expect(queryByText('1-2')).toBeTruthy();
});

test('Expanding a node in the tree w/ an async expand node function', async () => {
	const onExpandNode = jest.fn((node) => {
		return [{
			expanded: false,
			id: 'expand1',
			title: 'expand1',
			children: []
		}, {
			expanded: false,
			id: 'expand2',
			title: 'expand2',
			children: []
		}];
	});

	const { container, queryByText } = render(
		<Tree isVirtualized={false} onExpandNode={onExpandNode} tree={tree} />
	);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	fireEvent.click(container.querySelector('button.node-expand-button'));

	await wait(() => {
		expect(queryByText('1')).toBeTruthy();
		expect(queryByText('expand1')).toBeTruthy();
		expect(queryByText('expand2')).toBeTruthy();
	});
});

test('Custom buttons opened menu', async () => {
	const customButtons = [<button type="button">Example Button</button>];

	const { container, queryByText } = render(
		<Tree customButtons={customButtons} isVirtualized={false} tree={tree} />
	);

	fireEvent.click(container.querySelector('button.node-buttons'));

	await wait(() => {
		expect(queryByText('Example Button')).toBeTruthy();
	});
});

test('Selecting a node', () => {
	const newTree = {
		id: '1',
		expanded: false,
		title: 'Root',
		children: []
	};

	const onNodeClick = jest.fn();
	const { container, queryByText } = render(
		<Tree isVirtualized={false} onNodeClick={onNodeClick} tree={newTree} />
	);

	fireEvent.click(queryByText('Root'));
	expect(container.querySelector('div.mui-node-selected')).toBeTruthy();
	expect(onNodeClick).toHaveBeenCalledWith({
		id: '1',
		expanded: false,
		title: 'Root',
		childrenCount: 0,
		descendants: 0,
		hasSibling: false,
		level: 0,
		parent: null
	});
});

test('Selecting and deselecting a node', () => {
	const onNodeClick = jest.fn();
	const { container, queryByText } = render(
		<Tree isVirtualized={false} onNodeClick={onNodeClick} tree={tree} />
	);

	fireEvent.click(queryByText('1'));
	fireEvent.click(queryByText('1'));
	expect(onNodeClick).toHaveBeenCalledTimes(2);
	expect(onNodeClick).toHaveBeenLastCalledWith(null);
});

test('Selecting a node and collapsing its ancestor', () => {
	const { container, queryByText } = render(<Tree isVirtualized={false} tree={tree} />);

	fireEvent.click(queryByText('1-1-1'));
	fireEvent.click(container.querySelector('button.node-collapse-button'));
	expect(container.querySelector('div.mui-node-selected')).toBeNull();
});

// the following tests are very brittle; changing the tree structure will break it
test('Selecting a node and collapsing another branch after the node in the list', () => {
	const { container, queryByText } = render(<Tree isVirtualized={false} tree={tree} />);

	fireEvent.click(queryByText('1-2'));
	// dont want to collapse root
	fireEvent.click(container.querySelectorAll('button.node-collapse-button')[1]);

	// the third node should still be selected
	expect(container.querySelector('div.mui-node-selected')).toBeTruthy();
});

test('Handling on tree change after initial conversion', () => {
	const tree = { id: 'foo', children: [], title: 'Foo' };
	const onTreeChange = jest.fn();

	renderer.create(<Tree onTreeChange={onTreeChange} tree={tree} />);

	expect(onTreeChange).toHaveBeenCalledWith([{
		childrenCount: 0,
		descendants: 0,
		hasSibling: false,
		id: 'foo',
		level: 0,
		parent: null,
		title: 'Foo'
	}]);
});

test('Handling on tree change after collapsing a node', () => {
	const onTreeChange = jest.fn();
	const { container } = render(<Tree onTreeChange={onTreeChange} tree={tree} />);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	expect(onTreeChange).toHaveBeenCalled();
});

test('Handling on tree change after expanding a node', () => {
	const onTreeChange = jest.fn();
	const { container } = render(<Tree onTreeChange={onTreeChange} tree={tree} />);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	fireEvent.click(container.querySelector('button.node-expand-button'));
	expect(onTreeChange).toHaveBeenCalled();
});

test('Expanding a node in the tree w/ an async expand node function', async () => {
	const onTreeChange = jest.fn();
	const onExpandNode = jest.fn((node) => {
		return [{
			expanded: false,
			id: 'expand1',
			title: 'expand1',
			children: []
		}, {
			expanded: false,
			id: 'expand2',
			title: 'expand2',
			children: []
		}];
	});

	const { container, queryByText } = render(
		<Tree onExpandNode={onExpandNode} onTreeChange={onTreeChange} tree={tree} />
	);

	fireEvent.click(container.querySelector('button.node-collapse-button'));
	fireEvent.click(container.querySelector('button.node-expand-button'));

	await wait(() => {
		expect(onTreeChange).toHaveBeenCalled();
	});
});
