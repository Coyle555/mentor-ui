import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import UrlInput from '../urlInput';


const actions = {
	onBlur: action('onBlur'),
	onChange: action('onChange')
}

storiesOf('Inputs/UrlInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<UrlInput
				onBlur={actions.onBlur}
				onChange={actions.onChange}
				placeholder={text('placeholder', 'Enter a URL')}
				name="example-url-input1"
				value={text('overwrite value via props', '')}
				required={boolean('required', false)}
			/>
		)
	})
	.addWithJSX('with custom validation', () => {

		const noRepeatedNames = value => {
			if (/pirate/gi.test(value)) {
				return 'URLs with the word pirate in them are invalid';
			}
		}

		return (
			<div>
				<label>Enter a url:</label>
				<UrlInput
					onBlur={actions.onBlur}
					onChange={actions.onChange}
					name="example-url-input2"
					value={text('overwrite value via props', '')}
					validate={noRepeatedNames}
					required={boolean('required', false)}
				/>
				<code>
					URLs with the word <em>pirate</em> in them are invalid
				</code>
			</div>
		)
	})			


