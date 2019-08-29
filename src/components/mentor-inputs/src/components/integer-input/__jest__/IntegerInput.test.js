import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import IntegerInput from '../integerInput';

test('<IntegerInput /> with no props', () => {
	 const component = renderer.create( <IntegerInput/> );

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

test('Integer input with a decimal value', () => {
	const component = renderer.create( <IntegerInput value={3.24}/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

test('Integer input with a non integer value', () => {
	const component = renderer.create( <IntegerInput value="test"/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});
