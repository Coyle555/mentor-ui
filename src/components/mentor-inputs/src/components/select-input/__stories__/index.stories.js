import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import SelectInput from '../selectInput';

const onBlur = action('onBlur');
const onChange = action('onChange');

const options = [ 'Apple', 'Banana', 'Clementine', 'Mango', 'Grape' ];

storiesOf('Inputs/SelectInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('using an options array of string values', () => {

		

		return (
			<SelectInput 
				name="fruit"
				onBlur={onBlur}
				onChange={onChange}
				options={options}
				required={boolean('Is required?', false, 'Required')}
				value={select('value', options, null, 'Set value from props')}
			/>
		)
	})
	.addWithJSX('using an options array of objects', () => {
		const prices = [1.59, 2.31, 1.22, 0.98, 0.05 ];
		const fruitPrices = options.map((fruit, i) => ({ labelText: fruit, price: prices[i]}))

		return (
			<SelectInput 
				getOptionLabel={opt => opt.labelText}
				getOptionValue={opt => opt.price}
				name="fruitPrice"
				onBlur={onBlur}
				onChange={onChange}
				options={fruitPrices}
				placeholder={text('Set placeholder text', 'Select one fruit')}
				required={boolean('Is required?', false)}
				value={select('value', options, null)}
			/>
		)
	})
	.addWithJSX('using parse function to format return value', () => {
		const prices = [1.59, 2.31, 1.22, 0.98, 0.05 ];
		const fruitPrices = options.map((fruit, i) => ({ labelText: fruit, price: prices[i]}))

		return (
			<SelectInput 
				getOptionLabel={opt => opt.labelText + ' - $' + opt.price}
				getOptionValue={opt => opt.price}
				name="fruitPrice"
				onBlur={onBlur}
				onChange={onChange}
				options={fruitPrices}
				parse={val => parseFloat(val)}
				placeholder={text('Set placeholder text', 'Select one fruit')}
				required={boolean('Is required?', false)}
				value={select('value', options, null)}
			/>
		)
	})	
	.addWithJSX('with custom validation', () => {


		return (
			<SelectInput 
				name="fruit"
				onBlur={onBlur}
				onChange={onChange}
				options={options}
				placeholder="Select a fruit"
				required={boolean('Is required?', false)}
				value={select('value', options, null)}
				validate={ val => val === 'Grape' ? 'Sorry, we\'re out of grapes' : null}
			/>
		)
	})	
