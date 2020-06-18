import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import BooleanInput from '../booleanInput';


storiesOf('Inputs/BooleanInput', module)
	.addDecorator(withKnobs)
	.add('general', () => {

		const onBlur = action('onBlur');
		const onChange = action('onChange');

		const initialValues = {
			'true (String)': 'true',
			'false (String)': 'false',
			'true (Boolean)': true,
			'false (Boolean)': false,
			null: null
		};

		return (
			<BooleanInput
				onBlur={onBlur}
				onChange={onChange}
				name="example-boolean-input"
				placeholder={text('Set placeholder text', 'Select one', 'Placeholder Value')}
				required={boolean('Is required?', false, 'Required')}
				value={select('value', initialValues, null, 'Set value from props')}
			/>
		);
	})
	.add('required', () => {

		const onBlur = action('onBlur');
		const onChange = action('onChange');

		const initialValues = {
			'true (String)': 'true',
			'false (String)': 'false',
			'true (Boolean)': true,
			'false (Boolean)': false,
			null: null
		};

		return (
			<BooleanInput
				onBlur={onBlur}
				onChange={onChange}
				name="example-boolean-input"
				placeholder={text('Set placeholder text', 'Select one', 'Placeholder Value')}
				required={true}
				value={select('value', initialValues, null, 'Set value from props')}
			/>
		);
	});
