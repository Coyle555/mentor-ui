import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';
import { withInfo } from '@storybook/addon-info';

import InsertPopupForm from '../index';

storiesOf('InsertPopupForm', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add('General', () => {
		
		return (
			<InsertPopupForm 
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'multiline', label: 'Multiline Text Input', multiline: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false},
					{ id: 'datetime', label: 'DateTime', type: 'datetime', utc: true },
					{ id: 'options', label: 'Options', options: ['foo', 'bar'] },
					{ id: 'listfilter1', label: 'List Filter w/ Options', options: ['foo', 'bar', 'baz'], type: 'listfilter' },
					{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => val.name
					}
				]}
				onDisable={action('onDisable')}
				onSubmit={action('onSubmit')}
			/>
		)
	})
	.add('Initial data', () => {
		return (
			<InsertPopupForm 
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'multiline', label: 'Multiline Text Input', multiline: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false},
					{ id: 'datetime', label: 'DateTime', type: 'datetime', utc: true },
				]}
				initInsertData={{
					text: 'Initial',
					requiredText: 'Initial on required',
					extra: 'Not in form fields',
					datetime: '2019-09-05 17:04:41.2350000',
					date: '2019-09-05'
				}}
				onSubmit={action('onSubmit')}
			/>
		)
	})
	.add('Reset form', () => {
		return (
			<InsertPopupForm 
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'multiline', label: 'Multiline Text Input', multiline: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false},
					{ id: 'datetime', label: 'DateTime', type: 'datetime', utc: true },
					{ id: 'options', label: 'Options', options: ['foo', 'bar'] },
					{ id: 'listfilter1', label: 'List Filter w/ Options', options: ['foo', 'bar', 'baz'], type: 'listfilter' },
					{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => val.name
					}
				]}
				onSubmit={action('onSubmit')}
				resetForm={true}
			/>
		);
	})
	.add('Field dependent on another', () => {
		return (
			<InsertPopupForm 
				formFields={[
					{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => val.name
					},
					{ id: 'text2', label: 'Text Input 2' },
					{
						id: 'dependentField',
						label: 'Dependent field',
						link: {
							to: 'text2',
						},
						required: true
					},
					{ id: 'text3', label: 'Text Input 3' },
					{ id: 'text4', label: 'Text Input 4', required: true },
					{
						id: 'text5',
						label: 'Text Input 5',
						link: {
							to: 'listfilter2',
							onLink: (val) => {
								return { value: 'overwrite value' };
							}
						},
						required: true
					},
					{
						id: 'text6',
						label: 'Text Input 6',
						link: {
							to: 'text3',
						}
					},
					{
						id: 'text7',
						label: 'Text Input 7',
						link: {
							to: 'text4',
						}
					}
				]}
				onSubmit={action('onSubmit')}
			/>
		);
	});
