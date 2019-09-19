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

test('<MoneyInput /> required', () => {
	const component = renderer.create( <MoneyInput required={true} /> );

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

test('<MoneyInput /> with proper money', () => {
	const component = renderer.create(<MoneyInput value="12.23" />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();	
});
