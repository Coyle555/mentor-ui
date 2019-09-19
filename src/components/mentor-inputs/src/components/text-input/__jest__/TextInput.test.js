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

test('<TextInput /> with a disabled attribute', () => {
 	const component = renderer.create(<TextInput disabled={true} />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with a required attribute', () => {
 	const component = renderer.create(<TextInput required={true} />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with value of null', () => {
 	const component = renderer.create(<TextInput value={null} />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with a stringified value', () => {
 	const component = renderer.create(<TextInput value={4593.3} />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
});

test('<TextInput /> with a string value', () => {
 	const component = renderer.create(<TextInput value="Bill" />);

 	const tree = component.toJSON();
 	expect(tree).toMatchSnapshot();
}); 

test('Text input with custom class', () => {
	const tree = renderer.create(<TextInput className="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Text input onChange callback', () => {
	const onChange = jest.fn();
	const { container } = render(<TextInput name="text" onChange={onChange} />);

	fireEvent.change(container.querySelector('input'), { target: { value: 'foo' } });
	expect(onChange).toHaveBeenCalledWith(false, 'foo', 'text');
});

test('Text input onBlur callback', () => {
	const onBlur = jest.fn();
	const { container } = render(<TextInput name="text" onBlur={onBlur} />);

	fireEvent.change(container.querySelector('input'), { target: { value: 'foo' } });
	fireEvent.blur(container.querySelector('input'));
	expect(onBlur).toHaveBeenCalledWith(false, 'foo', 'text');
});

test('Custom validation on text input', () => {
	const onChange = jest.fn();
	const validate = jest.fn(val => val === 'adam' ? false : true);
	const { container } = render(<TextInput name="text" onChange={onChange} validate={validate} />);

	fireEvent.change(container.querySelector('input'), { target: { value: 'adam' } });
	expect(onChange).toHaveBeenCalledWith(true, 'adam', 'text');
});
