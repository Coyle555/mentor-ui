import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import TextAreaInput from '../textareaInput';


storiesOf('TextArea', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<TextAreaInput
				cols={number('cols', 15)}
				rows={number('rows', 5)}
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				placeholder={text('placeholder', 'Enter desciption')}
				name="example-textarea"
				value={text('overwrite value via props', '')}
				required={boolean('required', false)}
			/>
		)
	})		