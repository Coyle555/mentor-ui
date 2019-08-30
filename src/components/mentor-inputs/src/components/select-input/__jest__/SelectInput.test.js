import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

import SelectInput from '../selectInput';

afterEach(cleanup);

const fruits = [
	{ label: 'apple', price: 1.40 },
	{ label: 'bananas', price: 0.59 },
	{ label: 'cranberries', price: 5.99 }
];

test('<SelectInput /> with no props', () => {

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

test('<SelectInput /> with options from array of objects w/ parsing props', () => {
 	const component = renderer.create( 
 		<SelectInput 
 			options={fruits}
			parse={val => val.label}
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<SelectInput /> with a parsed value', () => {
 	const component = renderer.create( 
 		<SelectInput 
 			options={fruits}
			parse={val => val.label}
 			value={fruits[1]}
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test.skip('<SelectInput /> with a newly received and parsed value', () => {
	const parse = val => val.label;

 	const component = renderer.create( 
 		<SelectInput options={fruits} parse={parse} value={fruits[1]} /> 
 	);

	component.update(<SelectInput options={fruits} parse={parse} value={fruits[2]} />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});  

test('<SelectInput /> onChange cb returns parsed value with props.parse', () => {
	const onChange = jest.fn();
	const { container, debug } = render(
 		<SelectInput 
			name="foo"
			onChange={onChange}
 			options={fruits}
			parse={val => val.label}
 			value={fruits[1]}
 		/> 
	);

	fireEvent.change(container.querySelector('select'), { target: { value: 'apple' } });
	expect(onChange).toHaveBeenCalledWith(false, { label: 'apple', price: 1.40 }, 'foo');
});

test('<SelectInput /> onBlur cb returns parsed value with props.parse', () => {
	const onBlur = jest.fn();
	const { container } = render(
 		<SelectInput 
			name="foo"
 			onBlur={onBlur}
 			options={fruits}
			parse={val => val.label}
 			value={fruits[1]}
 		/> 
	);

	fireEvent.change(container.querySelector('select'), { target: { value: 'apple' } });
	fireEvent.blur(container.querySelector('select'));
	expect(onBlur).toHaveBeenCalledWith(false, { label: 'apple', price: 1.40 }, 'foo');
});
