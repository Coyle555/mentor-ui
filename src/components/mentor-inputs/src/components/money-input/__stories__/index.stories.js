import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import MoneyInput from '../moneyInput';


storiesOf('Inputs/MoneyInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		return (
			<MoneyInput
				min={number('min', -5)}
				max={number('max', 1000.5)}
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				placeholder={text('placeholder', 'Enter a value')}
				precision={number('precision', 2)}
				name="example-float-input1"
				required={boolean('required', false)}
			/>
		)
	})		
