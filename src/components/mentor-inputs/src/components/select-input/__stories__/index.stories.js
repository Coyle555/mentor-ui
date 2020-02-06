import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import SelectInput from '../selectInput';

const onBlur = action('onBlur');
const onChange = action('onChange');

const options = [ 'Apple', 'Banana', 'Clementine', 'Mango', 'Grape' ];

// TODO add a story that has a parsed value and a parsed list of options
// 	the value isnt loading correctly when the select input renders
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
				name="fruitPrice"
				onBlur={onBlur}
				onChange={onChange}
				options={fruitPrices}
				parse={opt => opt.labelText}
				placeholder={text('Set placeholder text', 'Select one fruit')}
				required={boolean('Is required?', false)}
				value={{ labelText: 'Apple', price: 1.59 }}
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
				validate={ val => val !== 'Grape'}
			/>
		)
	})	
