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
		);
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
		);
	})
	.addWithJSX('Disabled', () => {
		const options = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(['foo', 'bar', 'baz']);
				}, 500);
			});
		};

		return (
			<ListFilterInput
				disabled
				name="listFilter"
				options={options}
				value="foo"
			/>
		);
	})
	.addWithJSX('Custom filtering', () => {
		const options = (val) => {
			action('filter')(val);
			const valRegex = new RegExp(val, 'gi');
			return new Promise(resolve => {
				console.log('firing query', Date.now());
				fetch('https://jsonplaceholder.typicode.com/users')
				  .then(response => response.json())
				  .then(users => 
				  	users.map(user => user.name)
				  		.filter(user => valRegex.test(user))
				  )
				  .then(users => resolve(users))
			})

			 
		};

		return (
			<ListFilterInput
				name="listFilter"
				onChange={action('onChange')}
				onMatch={action('onMatch')}
				options={options}
				value="Leanne Graham"
			/>
		);
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
	});
