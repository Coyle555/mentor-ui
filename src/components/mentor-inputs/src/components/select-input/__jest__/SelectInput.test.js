import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import SelectInput from '../selectInput';

afterEach(cleanup);

const fruits = [
	{ label: 'apple', price: 1.40 },
	{ label: 'bananas', price: 0.59 },
	{ label: 'cranberries', price: 5.99 }
];

test.only('<SelectInput /> with no props', () => {

	 const component = renderer.create( <SelectInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});


test('<SelectInput /> with placeholder option text', () => {
 	const component = renderer.create( 
 		<SelectInput
 			placeholder="Select one por favor"
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<SelectInput /> with a required attribute', () => {
 	const component = renderer.create( 
 		<SelectInput required/> 
 	);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
 	expect(component.root.findByType('option').props.disabled).toBe(true);
});

test('<SelectInput /> with options from array of strings', () => {
 	const component = renderer.create( 
 		<SelectInput
 			options={['apples', 'bananas', 'cranberries']}
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<SelectInput /> with options from array of objects w/ no parsing props', () => {
 	const component = renderer.create( 
 		<SelectInput options={fruits}/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<SelectInput /> with options from array of objects w/ parsing props', () => {
 	const component = renderer.create( 
 		<SelectInput 
 			options={fruits}
 			getOptionLabel={v => v.label}
 			getOptionValue={v => v.price}
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<SelectInput /> with a parsed value', () => {
 	const component = renderer.create( 
 		<SelectInput 
 			options={fruits}
 			getOptionLabel={v => v.label}
 			getOptionValue={v => v.price}
 			value={fruits[1]}
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});  

test('<SelectInput /> onblur cb returns parsed value with props.parse', () => {
	const onBlur = jest.fn().mockImplementation((x, val) => val);
	const { container } = render(
 		<SelectInput 
 			onBlur={onBlur}
 			options={fruits}
 			getOptionLabel={v => v.label}
 			getOptionValue={v => v.price}
 			parse={v => parseFloat(v) || ''}
 			value={fruits[1]}
 		/> 
	);

	fireEvent.change(container.querySelector('select'), { target: { value: '5.99' }});
	fireEvent.blur(container.querySelector('select'));
	expect(onBlur).toHaveReturnedWith(5.99);
});
