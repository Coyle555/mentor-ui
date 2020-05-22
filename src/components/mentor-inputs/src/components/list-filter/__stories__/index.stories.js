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
	.addWithJSX('Disabled', () => {
		const options = (val) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(['foo', 'bar', 'baz']);
				}, 500);
			});
		}

		return (
			<ListFilterInput
				disabled
				name="listFilter"
				options={options}
				value="f"
			/>
		)
	})
	.addWithJSX('Custom filtering', () => {
		const options = (val) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(['foo', 'bar', 'baz']);
				}, 500);
			});
		}

		return (
			<ListFilterInput
				disabled={true}
				name="listFilter"
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={options}
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
					subtitle: 'This will be a really long subtitle --- Foo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitleFoo subtitle'
				}, {
					title: 'bar',
					subtitle: 'Bar subtitle'
				}, {
					title: 'baz',
					subtitle: 'Baz subtitle'
				}]}
			/>
		);
	})
