import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import IntegerInput from '../integerInput';


storiesOf('IntegerInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<IntegerInput
				min={number('min', -5)}
				max={number('max', 1000.5)}
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				placeholder={text('placeholder', 'Enter an integer')}
				name="example-integer-input1"
				value={text('overwrite value via props', '')}
				required={boolean('required', false)}
			/>
		)
	})		