import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import FloatInput from '../floatInput';


storiesOf('Inputs/FloatInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<FloatInput
				min={number('min', -5)}
				max={number('max', 1000.5)}
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				placeholder={text('placeholder', 'Enter a float value')}
				precision={number('precision', 3)}
				name="example-float-input1"
				value={text('overwrite value via props', '')}
				required={boolean('required', false)}
			/>
		)
	})
	.add('required', () => {
		return (
			<FloatInput
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				placeholder={text('placeholder', 'Enter a float value')}
				name="example-float-input1"
				required={true}
			/>
		)
	})		
