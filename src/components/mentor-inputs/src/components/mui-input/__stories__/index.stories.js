import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';

import { action } from 'storybook-utils';
import useStateAddon from 'storybook-useState';
import { MuiInput } from '../index';


storiesOf('Inputs/MuiInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {

		const onBlur = action('onBlur');
		const onChange = action('onChange');

		return (
			<div style={{ width: 400 }}>
				<MuiInput
					onBlur={onBlur}
					onChange={onChange}
					label={text('Set label text', 'Label Text')}
					required={boolean('Is required?', false, 'Required')}
					name="example-mui-input"
					value={text('Set value text', '')}
				/>
			</div>
		)
	})
	.addWithJSX('with custom validation rules', () => {

		const [currVal, setCurrVal] = useStateAddon('');

		function notApple(value) {
			if (/\bapple(s)?\b/gi.test(value))
				return 'Apple?? Are you kidding me??!!?';
		}

		function notBanana(value) {
			if (/\bbanana(s)?\b/gi.test(value))
				return 'We dont accept bananas as a valid option';
		}


		return (
			<div style={{ width: 400 }}>
				<MuiInput
					label="Don't write 'apple' or 'banana' here"
					customValidator={[notApple, notBanana]}
					required={boolean('Is required?', false, 'Required')}
					name="favoriteFruit"
					onChange={e => setCurrVal(e.target.value)}
					value={currVal}
				/>
			</div>
		)

	})


