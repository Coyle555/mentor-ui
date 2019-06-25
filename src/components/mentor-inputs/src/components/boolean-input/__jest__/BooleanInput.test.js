import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import BooleanInput from '../booleanInput';

afterEach(cleanup);

test('<BooleanInput /> with no props', () => {

	 const component = renderer.create( <BooleanInput/> );

	 const tree = component.toJSON();
	 expect(tree).toMatchSnapshot();
});


test('<BooleanInput /> with placeholder option text', () => {
 	const component = renderer.create( 
 		<BooleanInput
 			placeholder="Select true or false"
 		/> 
 	);
 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<BooleanInput /> onBlur cb returns a boolean or null', () => {
 	const onBlur = jest.fn();
 	const { container } = render( 
 		<BooleanInput 
 			name="attending"
 			onBlur={onBlur}
 		/> 
 	);

 	fireEvent.change(container.querySelector('select'), { target: { value: true }});
 	fireEvent.blur(container.querySelector('select'));
 	
 	expect(onBlur).toHaveBeenCalledWith('', true, 'attending');
});