import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import Tree from '../index';

const tree = [
	{
		children: [
			{
				children: [
					{
						childrenCount: 0,
						expanded: false,
						id: '1-1-1',
						title: '1-1-1',
						subtitle: 'Bar child 2 subtitle',
						data: {}
					},
					{
						children: [{
							childrenCount: 1,
							expanded: true,
							id: '1-1-2-1',
							title: '1-1-2-1',
							data: {},
							children: [{
								id: '1-1-2-1-1',
								title: '1-1-2-1-1',
								childrenCount: 0,
								children: [],
								expanded: false
							}]
						}],
						childrenCount: 1,
						expanded: true,
						id: '1-1-2',
						title: '1-1-2',
						subtitle: 'Bar child subtitle',
						data: {}
					},
					{
						id: '1-1-3',
						title: '1-1-3',
						childrenCount: 0,
						children: [],
						expanded: false
					}
				],
				childrenCount: 3,
				expanded: true,
				id: 'bar',
				title: '1-1',
				subtitle: 'Bar subtitle',
				data: {}
			},
			{
				childrenCount: 1,
				children: [{
					id: '1-2-1',
					expanded: true,
					childrenCount: 3,
					title: '1-2-1',
					children: [{
						id: '1-2-1-1',
						title: '1-2-1-1',
						childrenCount: 0,
						children: [],
						expanded: false
					}, {
						id: '1-2-1-2',
						title: '1-2-1-2',
						childrenCount: 2,
						expanded: true,
						children: [{
							id: '1-2-1-2-1',
							title: '1-2-1-2-1',
							childrenCount: 0,
							expanded: false,
							children: []
						}, {
							id: '1-2-1-2-2',
							title: '1-2-1-2-2',
							childrenCount: 4,
							expanded: true,
							children: [{
								id: '1-2-1-2-2-1',
								title: '1-2-1-2-2-1',
								childrenCount: 0,
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-2',
								title: '1-2-1-2-2-2',
								childrenCount: 0,
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-3',
								title: '1-2-1-2-2-3',
								childrenCount: 0,
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-4',
								title: '1-2-1-2-2-4',
								childrenCount: 0,
								children: [],
								expanded: false
							}]
						}],
					}, {
						id: '1-2-1-3',
						title: '1-2-1-3',
						expanded: false,
						children: [],
						childrenCount: 0
					}], 
				}],
				expanded: true,
				id: 'baz',
				title: '1-2',
				subtitle: 'Baz subtitle',
				data: {}
			}
		],
		childrenCount: 2,
		expanded: true,
		id: '1',
		title: '1',
		subtitle: 'Foo subtitle',
		data: {}
	},
];

function onExpandNode(node) {
	return [{
		childrenCount: 1,
		expanded: false,
		id: 'expand1',
		title: 'expand1',
		children: [{
			id: 'expand1-child',
			title: 'expand1-child',
			childrenCount: 0,
			children: []
		}]
	}, {
		childrenCount: 0,
		expanded: false,
		id: 'expand1',
		title: 'expand1',
		children: []
	}];
}

storiesOf('Hierarchy', module)
	.add('General', () => {
		return (
			<div style={{ height: window.innerHeight + 'px' }}>
				<Tree
					onExpandNode={onExpandNode}
					onNodeClick={action('onNodeClick')}
					tree={tree}
				/>
			</div>
		);
	});
