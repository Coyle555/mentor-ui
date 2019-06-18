import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import FloatInput from '../floatInput';

test('<FloatInput /> with no props', () => {

	 const component = renderer.create( <FloatInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});

test('<FloatInput /> disabled w/ a min of 1 and max of 5', () => {
	const component = renderer.create( 
		<FloatInput
			min={1}
			max={5}
			disabled
		/> 
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<FloatInput /> with a custom className', () => {
	const component = renderer.create( <FloatInput className="custom-class"/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

test('<FloatInput /> accepts a value prop of type number', () => {
	const component = renderer.create( <FloatInput value={3.2}/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	

});

test('<FloatInput /> parses value props of type string to float', () => {
	const component = renderer.create( <FloatInput value="3.14"/> );

	const tree = component.toJSON();
	expect(tree.props.value).toBe(3.14);
});

test('<FloatInput /> onBlur callback returns errors thrown by browser', () => {
	const onChange = jest.fn().mockImplementation((err) => {
		if (err) return 'NO.';
	});

	const { container } = render(
		<FloatInput
			name="price" 
			onBlur={onChange}
			min={0.5}
		/>
	);
	fireEvent.focus(container.querySelector('input[type="number"]'));
	fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '0.25' }});	
	fireEvent.blur(container.querySelector('input[type="number"]'));
	const onChangeArgs = onChange.mock.results[0];
	expect(onChangeArgs.type).toBe('return');
	expect(onChangeArgs.value).toBe('NO.')
});

test('<FloatInput /> onBlur callback returns float at specified precision', () => {
	const onChange = jest.fn().mockImplementation((err, val) => err ? err : val);

	const { container } = render(
		<FloatInput
			name="price"
			precision={3} 
			onBlur={onChange}
		/>
	);
	fireEvent.focus(container.querySelector('input[type="number"]'));
	fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '17.136832354' }});	
	fireEvent.blur(container.querySelector('input[type="number"]'));
	const onChangeArgs = onChange.mock.results[0];
	expect(onChangeArgs.type).toBe('return');
	expect(onChangeArgs.value).toBe(17.137);
});
