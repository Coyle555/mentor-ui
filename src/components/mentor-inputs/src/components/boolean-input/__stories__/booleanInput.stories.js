import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import { BooleanInputComponent } from '../booleanInput';


storiesOf('BooleanInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		const onBlur = action('onBlur');
		const onChange = action('onChange');

		const initialValues = {
			'true (String)': 'true',
			'false (String)': 'false',
			'true (Boolean)': true,
			'false (Boolean)' : false,
			null: null	
		}

		return (
			<BooleanInputComponent 
				onBlur={onBlur}
				onChange={onChange}
				placeholder={text('Set placeholder text', 'Select one', 'Placeholder Value')}
				required={boolean('Is required?', false, 'Required')}
				name="example-boolean-input"
				value={select('value', initialValues, null, 'Set value from props')}
			/>
		)
	})


