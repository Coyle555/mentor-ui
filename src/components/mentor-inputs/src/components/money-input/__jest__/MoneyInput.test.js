import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import MoneyInput from '../moneyInput';

afterEach(cleanup);

test('<MoneyInput /> with no props', () => {

	 const component = renderer.create( <MoneyInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});

test('<MoneyInput /> disabled w/ a min of 1 and max of 5', () => {
	const component = renderer.create( 
		<MoneyInput
			min={1}
			max={5}
			disabled
		/> 
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<MoneyInput /> with a custom className', () => {
	const component = renderer.create( <MoneyInput className="custom-class"/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

test('<MoneyInput /> where props.value is pi', () => {
	const component = renderer.create( <MoneyInput value={Math.PI}/> );

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});

/// All other tests to this point should be covered by float input
/// Im basically trying to validate that the FloatInput is inheriting all the correct props
/// through the money input
