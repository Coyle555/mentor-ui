import React from 'react';
import { storiesOf } from '@storybook/react';

import Tree from '../index';

const nodes = [
	{
		childrenCount: 2,
		expanded: true,
		id: 'foo',
		level: 0,
		title: 'Foo',
		subtitle: 'Foo subtitle',
		data: {}
	},
	{
		childrenCount: 0,
		expanded: false,
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
