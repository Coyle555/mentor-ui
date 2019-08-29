import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import TextInput from '../textInput';


const actions = {
	onBlur: action('onBlur'),
	onChange: action('onChange')
}

storiesOf('Inputs/TextInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<TextInput
				onBlur={actions.onBlur}
				onChange={actions.onChange}
				placeholder={text('placeholder', 'Enter an some value')}
				name="example-text-input1"
				value={text('overwrite value via props', '')}
				required={boolean('required', false)}
			/>
		)
	})
	.addWithJSX('with custom validation', () => {

		const reservedNames = ['adam', 'barry', 'chris', 'kyle'];
		const noRepeatedNames = value => {
			if (!reservedNames.includes(value.toLowerCase().trim())) {
				return 'That name has already been added.';
			}
		}

		return (
			<div>
				<label>Enter your first name:</label>
				<TextInput
					onBlur={actions.onBlur}
					onChange={actions.onChange}
					name="example-text-input2"
					value={text('overwrite value via props', '')}
					validate={noRepeatedNames}
					required={boolean('required', false)}
				/>
				<code>
					The names 'Adam', 'Barry', 'Chris', and 'Kyle' won't be accepted
				</code>
			</div>
		)
	})			



