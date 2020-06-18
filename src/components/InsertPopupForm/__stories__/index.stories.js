import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';
import { withInfo } from '@storybook/addon-info';

import InsertPopupForm from '../index';

storiesOf('InsertPopupForm', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add('Single Field', () => {
		return (
			<InsertPopupForm
				formFields={[{ label: 'Bar', id: 'foo', type: 'string' }]}
				onDisable={action('onDisable')}
				onSubmit={action('onSubmit')}
			/>
		);
	})
	.add('General', () => {

		return (
			<InsertPopupForm
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'boolean', label: 'Boolean Input', type: 'boolean', required: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false },
					{ id: 'datetime', label: 'DateTime', type: 'datetime', utc: true },
					{ id: 'options', label: 'Options', options: ['foo', 'bar'] },
					{ id: 'listfilter1', label: 'List Filter w/ Options', options: ['foo', 'bar', 'baz'], type: 'listfilter' },
					{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => typeof val === 'object' ? val.name : val,
					}
				]}
				onDisable={action('onDisable')}
				onSubmit={action('onSubmit')}
			/>
		);
	})
	.add('Initial data', () => {
		return (
			<InsertPopupForm
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'multiline', label: 'Multiline Text Input', multiline: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false },
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
		);
	})
	.add('Reset form', () => {
		return (
			<InsertPopupForm
				formFields={[
					{ id: 'text', label: 'Text Input' },
					{ id: 'requiredText', label: 'Required Text Input', required: true },
					{ id: 'multiline', label: 'Multiline Text Input', multiline: true },
					{ id: 'date', label: 'Date', type: 'date', utc: false },
					{ id: 'datetime', label: 'DateTime', type: 'datetime', utc: true },
					{ id: 'options', label: 'Options', options: ['foo', 'bar'] },
					{ id: 'listfilter1', label: 'List Filter w/ Options', options: ['foo', 'bar', 'baz'], type: 'listfilter' },
					{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => typeof val === 'object' ? val.name : val,
					}
				]}
				onSubmit={action('onSubmit')}
				resetForm={true}
			/>
		);
	})
	.add('Linked fields', () => {
		return (
			<InsertPopupForm
				formFields={[
					[
						{ id: 'text2', label: 'Text Input 2' },
						{ id: 'dependentField', label: 'Dependent field', onLink: () => ({}) }
					],
					[{
						id: 'listfilter2',
						label: 'List Filter w/ Filter',
						type: 'listfilter',
						options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
						parse: val => typeof val === 'object' ? val.name : val,
						required: true
					},
					{
						id: 'text5',
						label: 'Text Input 5',
						onLink: () => ({})
					}]
				]}
				onSubmit={action('onSubmit')}
			/>
		);
	});
