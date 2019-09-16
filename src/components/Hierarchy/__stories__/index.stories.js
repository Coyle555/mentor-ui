import React from 'react';
import { storiesOf } from '@storybook/react';

import Tree from '../index';

const nodes = [{
	children: () => ({
		expanded: false,
		id: 'foo',
		title: 'Bar',
		subtitle: 'Bar subtitle'
	}),
	childrenCount: 1,
	expanded: false,
	id: 'foo',
	title: 'Foo',
	subtitle: 'Foo subtitle',
	data: {}
}];

storiesOf('Hierarchy', module)
	.add('General', () => {
		return (
			<Tree 
				nodeCount={1}
				nodes={nodes}
			/>
		)
	});
