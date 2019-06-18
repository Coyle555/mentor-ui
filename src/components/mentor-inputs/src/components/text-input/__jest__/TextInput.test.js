import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import TextInput from '../textInput';

afterEach(cleanup);

test('<TextInput /> with no props', () => {

	 const component = renderer.create( <TextInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});


test('<TextInput /> with a required attribute', () => {
 	const component = renderer.create( 
 		<TextInput required/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with value of null', () => {
 	const component = renderer.create( 
 		<TextInput value={null} /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with a stringified value', () => {
 	const component = renderer.create( 
 		<TextInput value={4593.3} /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with a string value', () => {
 	const component = renderer.create( 
 		<TextInput value="Bill" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
}); 

test('<TextInput /> with autocomplete enabled', () => {
 	const component = renderer.create( 
 		<TextInput autoComplete="true" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});


test('<TextInput /> onBlur callback returns errors thrown by browser', () => {
	const onChange = jest.fn().mockImplementation((err) => {
		if (err) return 'Constraints not satisfied.';
	});

	const { container } = render(
		<TextInput
			name="email" 
			onBlur={onChange}
			pattern="abc"
		/>
	);
	fireEvent.focus(container.querySelector('input'));
	fireEvent.change(container.querySelector('input'), { target: { value: '1234' }});	
	fireEvent.blur(container.querySelector('input'));
	const onChangeArgs = onChange.mock.results[0];
	expect(onChangeArgs.type).toBe('return');
	expect(onChangeArgs.value).toBe('Constraints not satisfied.');
});

test('<TextInput />  validates when required value is an empty string', () => {
	const onChange = jest.fn().mockImplementation((err) => err);

	const { container } = render(
		<TextInput
			name="address" 
			onChange={onChange}
			required
		/>
	);
	act(() => {
		fireEvent.focus(container.querySelector('input[type="text"]'));
		fireEvent.change(container.querySelector('input[type="text"]'), { target: { value: ' '}});
	});

	expect(onChange.mock.results[0].value).toBe('This field is required.');
});

test('<TextInput /> handles custom validation', () => {
	const onChange = jest.fn().mockImplementation((err) => err);
	const noGmailCheck = (val) => {
		if (/@gmail\.com$/.test(val)) return 'No Gmail Allowed';
	}

	const { container } = render(
		<TextInput
			name="email"
			onBlur={onChange}
			validation={noGmailCheck}
		/>
	);
	fireEvent.focus(container.querySelector('input[type="text"]'));
	fireEvent.change(container.querySelector('input[type="text"]'), { target: { value: 'a@gmail.com' }});
	fireEvent.blur(container.querySelector('input[type="text"]'));		
	
	expect(onChange.mock.results[0].value).toBe('No Gmail Allowed');
});

