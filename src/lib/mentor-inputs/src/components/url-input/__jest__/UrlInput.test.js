import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import UrlInput from '../urlInput';

afterEach(cleanup);

test('<UrlInput /> with no props', () => {

	 const component = renderer.create( <UrlInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});


test('<UrlInput /> with a required attribute', () => {
 	const component = renderer.create( 
 		<UrlInput required/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with a non-string value passed in', () => {
 	const component = renderer.create( 
 		<UrlInput value={4593.3} /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with a value passed in', () => {
 	const component = renderer.create( 
 		<UrlInput value="https://www.gmail.com" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
}); 

test('<UrlInput /> with autocomplete enabled', () => {
 	const component = renderer.create( 
 		<UrlInput autoComplete="true" /> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});


test('<UrlInput /> verifies its an actual url with expected error message', () => {
	const onBlur = jest.fn().mockImplementation((err) => err);

	const { container } = render(
		<UrlInput onBlur={onBlur} value="w.w33notanemail.com" />
	);

	fireEvent.focus(container.querySelector('input[type="url"]'));	
	fireEvent.change(container.querySelector('input[type="url"]'), { target: { value: 'xwd/fakeme-gmail.m' }});
	fireEvent.blur(container.querySelector('input[type="url"]'));	
	
	expect(onBlur.mock.results[0].value).toBe('Not a valid URL.');
});

test('<UrlInput /> handles custom validation', () => {
	const onChange = jest.fn().mockImplementation((err) => err);
	const noSmoothJazz = (val) => {
		if (/kennyg\.com/.test(val)) return 'No smooth jazz allowed.';
	}

	const { container } = render(
		<UrlInput
			onBlur={onChange}
			validation={noSmoothJazz}
		/>
	);

	fireEvent.focus(container.querySelector('input[type="url"]'));	
	fireEvent.change(container.querySelector('input[type="url"]'), { target: { value: 'http://www.kennyg.com/listen' }});
	fireEvent.blur(container.querySelector('input[type="url"]'));		
	
	expect(onChange.mock.results[0].value).toBe('No smooth jazz allowed.');
});


