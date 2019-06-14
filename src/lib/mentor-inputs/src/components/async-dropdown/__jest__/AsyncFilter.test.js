import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import { AsyncDropdown } from '../index';

afterEach(cleanup);

const fruits = [
	{ label: 'apple', price: 1.40 },
	{ label: 'bananas', price: 0.59 },
	{ label: 'cranberries', price: 5.99 }
];

test('<SelectInput /> with no props', () => {

	 const component = renderer.create( <AsyncDropdown/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});

