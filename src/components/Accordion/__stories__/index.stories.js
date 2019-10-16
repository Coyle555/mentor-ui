import React from 'react';
import { storiesOf } from '@storybook/react';

import Accordion from '../index';

storiesOf('Accordion', module)
	.add('general', () => {
		return (
			<Accordion
				list={[
					{ title: 'Foo', content: 'Foo content' },
					{ title: 'Bar', content: 'Bar content' }
				]}
			/>
		);
	});
