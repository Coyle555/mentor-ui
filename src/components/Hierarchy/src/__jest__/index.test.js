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

test('Rendering hierarchy that is not virtualized', () => {
	const json = renderer.create(<Tree isVirtualized={false} tree={tree} />).toJSON();

	expect(json).toMatchSnapshot();
});

test('Rendering hierarchy that is virtualized', () => {
	const json = renderer.create(<Tree isVirtualized={true} tree={tree} />).toJSON();

	expect(json).toMatchSnapshot();
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

test.only('Expanding a node in the tree w/ an async expand node function', async () => {
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
