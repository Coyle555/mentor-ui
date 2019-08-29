import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import FloatInput from '../floatInput';

test('<FloatInput /> with no props', () => {

	 const component = renderer.create( <FloatInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});

test('Float Input with custom placeholder', () => {
	const tree = renderer.create(<FloatInput placeholder="Test placeholder" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('<FloatInput /> with a custom className', () => {
	const component = renderer.create( <FloatInput className="custom-class"/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

test('<FloatInput /> accepts a valid float value', () => {
	const component = renderer.create( <FloatInput value="3.2" /> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	

});

test('Float input with required prop', () => {
	const tree = renderer.create(<FloatInput required={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Float input with an invalid float', () => {
	const component = renderer.create( <FloatInput value="3.2aa" /> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});
