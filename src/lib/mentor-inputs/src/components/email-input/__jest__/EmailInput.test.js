import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import EmailInput from '../emailInput';

afterEach(cleanup);

test('<EmailInput /> with no props', () => {

	 const component = renderer.create( <EmailInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});


test('<EmailInput /> with a required attribute', () => {
 	const component = renderer.create( 
 		<EmailInput required/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with a non-string value passed in', () => {
 	const component = renderer.create( 
 		<EmailInput value={4593.3} /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with a value passed in', () => {
 	const component = renderer.create( 
 		<EmailInput value="bill@gmail.com" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
}); 

test('<EmailInput /> with autocomplete enabled', () => {
 	const component = renderer.create( 
 		<EmailInput autoComplete="true" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});


test('<EmailInput /> verifies its an actual email with expected error message', () => {
	const onBlur = jest.fn().mockImplementation((err) => err);

	const { container } = render(
		<EmailInput onBlur={onBlur} value="notanemail.com" />
	);

	fireEvent.focus(container.querySelector('input[type="email"]'));	
	fireEvent.change(container.querySelector('input[type="email"]'), { target: { value: 'fakeme-gmail.com' }});
	fireEvent.blur(container.querySelector('input[type="email"]'));	
	
	expect(onBlur.mock.results[0].value).toBe('Not a valid email address.');
});

test('<EmailInput /> handles custom validation', () => {
	const onChange = jest.fn().mockImplementation((err) => err);
	const noGmailCheck = (val) => {
		if (/@gmail\.com$/.test(val)) return 'No Gmail Allowed';
	}

	const { container } = render(
		<EmailInput
			onBlur={onChange}
			validation={noGmailCheck}
		/>
	);

	fireEvent.focus(container.querySelector('input[type="email"]'));	
	fireEvent.change(container.querySelector('input[type="email"]'), { target: { value: 'a@gmail.com' }});
	fireEvent.blur(container.querySelector('input[type="email"]'));		
	
	expect(onChange.mock.results[0].value).toBe('No Gmail Allowed');
});


