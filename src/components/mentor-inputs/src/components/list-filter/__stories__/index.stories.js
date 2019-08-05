import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import ListFilterInput from '../index';

storiesOf('Inputs/ListFilterInput', module)
	.addWithJSX('General', () => {
		return (
			<ListFilterInput
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={['foo', 'bar', 'baz']}
			/>
		)
	})
	.addWithJSX('Required', () => {
		return (
			<ListFilterInput
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={['foo', 'bar', 'baz']}
				required={true}
			/>
		)
	})
