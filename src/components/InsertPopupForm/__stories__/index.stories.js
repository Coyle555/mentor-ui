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
					{ id: 'text', label: 'Text Input' },
					{ id: 'text2', label: 'Text Input', group: 'foo' },
					{
						id: 'dependentField',
						label: 'Dependent field',
						group: 'foo'
					}
				]}
				onSubmit={action('onSubmit')}
			/>
		);
	});
