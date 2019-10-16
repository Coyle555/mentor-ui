import React from 'react';
import { storiesOf } from '@storybook/react';

import SegmentedList from '../index';

storiesOf('Segmented List', module)
	.add('general', () => {
		return (
			<SegmentedList
				columns={['name', 'desc', 'Comp1', 'Comp2', 'Comp3']}
				data={[
					{
						name: 'Foo',
						desc: 'Foo desc',
						Comp1: <span>Component 1</span>,
						Comp2: <span>Component 2</span>,
						Comp3: <span>Component 3</span>
					}
				]}
			/>
		);
	});
