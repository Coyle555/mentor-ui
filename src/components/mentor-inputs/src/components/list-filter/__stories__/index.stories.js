import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import ListFilterInput from '../index';

storiesOf('Inputs/ListFilterInput', module)
	.addWithJSX('General', () => {
		return (
			<ListFilterInput
				name="listFilter"
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={['foo', 'bar', 'baz']}
			/>
		)
	})
	.addWithJSX('Options with subtitles', () => {
		return (
			<ListFilterInput
				name="listFilter"
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={[{
					title: 'foo',
					subtitle: 'Foo subtitle'
				}, {
					title: 'bar',
					subtitle: 'Bar subtitle'
				}, {
					title: 'baz',
					subtitle: 'Baz subtitle'
				}]}
			/>
		)
	})
	.addWithJSX('Required', () => {
		return (
			<ListFilterInput
				name="listFilter"
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={['foo', 'bar', 'baz']}
				required={true}
			/>
		)
	})
	.addWithJSX('Custom filtering', () => {
		const filter = (val) => {
			return val.split('');
		}

		return (
			<ListFilterInput
				name="listFilter"
				filter={filter}
				onChange={action('onChange')}
				onMatch={action('onMatch')}
			/>
		)
	})
