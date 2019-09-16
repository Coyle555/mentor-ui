import React from 'react';
import { storiesOf } from '@storybook/react';

import Tree from '../index';

const nodes = [
	{
		children: [
			{
				children: [
					{
						childrenCount: 0,
						expanded: false,
						id: 'barchild2',
						level: 2,
						title: 'Bar Child 2',
						subtitle: 'Bar child 2 subtitle',
						data: {}
					},
					{
						children: [
							{
								childrenCount: 2,
								expanded: false,
								id: 'rr',
								level: 3,
								title: 'rando',
								data: {}
							},
						],
						childrenCount: 1,
						expanded: true,
						id: 'barchild',
						level: 2,
						title: 'Bar Child',
						subtitle: 'Bar child subtitle',
						data: {}
					},
				],
				childrenCount: 2,
				expanded: true,
				id: 'bar',
				level: 1,
				title: 'Bar',
				subtitle: 'Bar subtitle',
				data: {}
			},
			{
				childrenCount: 0,
				expanded: false,
				id: 'baz',
				level: 1,
				title: 'Baz',
				subtitle: 'Baz subtitle',
				data: {}
			}
		],
		childrenCount: 2,
		expanded: true,
		id: 'foo',
		level: 0,
		title: 'Foo',
		subtitle: 'Foo subtitle',
		data: {}
	},
];

storiesOf('Hierarchy', module)
	.add('General', () => {
		return (
			<Tree 
				nodeCount={2}
				nodes={nodes}
			/>
		)
	});
