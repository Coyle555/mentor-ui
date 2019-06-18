import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import IntegerInput from '../integerInput';

test('<IntegerInput /> with no props', () => {

	 const component = renderer.create( <IntegerInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});

test('<IntegerInput /> disabled w/ a min of 1 and max of 5', () => {
	const component = renderer.create( 
		<IntegerInput
			min={1}
			max={5}
			disabled
		/> 
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<IntegerInput /> with a custom className', () => {
	const component = renderer.create( <IntegerInput className="custom-class"/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

test('<IntegerInput /> accepts a value prop of type number', () => {
	const component = renderer.create( <IntegerInput value={3}/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	

});

test('<IntegerInput /> parses value props of type string to number', () => {
	const component = renderer.create( <IntegerInput value="3"/> );

	const tree = component.toJSON();
	expect(tree.props.value).toBe(3);
});

test('<IntegerInput /> onBlur callback returns errors thrown by browser', () => {
	const onChange = jest.fn().mockImplementation((err) => {
		if (err) return 'NO.';
	});

	const { container } = render(
		<IntegerInput
			name="age" 
			onBlur={onChange}
			min={18}
		/>
	);
	fireEvent.focus(container.querySelector('input[type="number"]'));
	fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '17' }});	
	fireEvent.blur(container.querySelector('input[type="number"]'));

	const onChangeArgs = onChange.mock.results[0];
	expect(onChangeArgs.type).toBe('return');
	expect(onChangeArgs.value).toBe('NO.')
});

test('<IntegerInput /> onBlur callback fires error when theres a float value', () => {
	const onChange = jest.fn().mockImplementation((err) => err);

	const { container } = render(
		<IntegerInput
			name="age" 
			onBlur={onChange}
		/>
	);
	fireEvent.focus(container.querySelector('input[type="number"]'));
	fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '17.9999' }});	
	fireEvent.blur(container.querySelector('input[type="number"]'));

	const onChangeArgs = onChange.mock.results[0];
	expect(onChangeArgs.type).toBe('return');
	expect(onChangeArgs.value).toBe('No decimal values.');
});