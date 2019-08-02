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
					{ id: 'text', category: 'Text Input' },
					{ id: 'requiredText', category: 'Required Text Input', required: true },
					{ id: 'multiline', category: 'Multiline Text Input', multiline: true },
				]}
				onSubmit={action('onSubmit')}
			/>
		)
	})
	.add('Initial data', () => {
		return (
			<InsertPopupForm 
				formFields={[
					{ id: 'text', category: 'Text Input' },
					{ id: 'requiredText', category: 'Required Text Input', required: true },
					{ id: 'multiline', category: 'Multiline Text Input', multiline: true },
				]}
				initInsertData={{
					text: 'Initial',
					requiredText: 'Initial on required'
				}}
				onSubmit={action('onSubmit')}
			/>
		)
	})
