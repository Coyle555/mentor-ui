import React from 'react';
import { storiesOf } from '@storybook/react';

import SegmentedList, { ListItem } from '../index';

storiesOf('Segmented List', module)
	.add('general', () => {
		return (
			<SegmentedList
				insertable={true}
				title="Segmented List Title"
			>
				<ListItem>Foo</ListItem>
				<ListItem>Bar</ListItem>
				<ListItem>Baz</ListItem>
			</SegmentedList>
		);
	});
