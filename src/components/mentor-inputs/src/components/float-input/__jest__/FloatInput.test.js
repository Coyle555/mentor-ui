import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, cleanup, } from '@testing-library/react';

import FloatInput from '../floatInput';

afterEach(cleanup);

test('<FloatInput /> with no props', () => {

	const component = renderer.create(<FloatInput />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Float Input with custom placeholder', () => {
	const tree = renderer.create(<FloatInput placeholder="Test placeholder" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('<FloatInput /> with a custom className', () => {
	const component = renderer.create(<FloatInput className="custom-class" />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<FloatInput /> accepts a valid float value', () => {
	const component = renderer.create(<FloatInput value="3.2" />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Float input with required prop', () => {
	const tree = renderer.create(<FloatInput required={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Float input with an invalid float', () => {
	const component = renderer.create(<FloatInput value="3.2aa" />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Float input blur with a precision', () => {
	const onBlur = jest.fn();
	const { container } = render(<FloatInput name="foo" onBlur={onBlur} precision={2} />);

	fireEvent.change(container.querySelector('input'), { target: { value: '123.423' } });
	fireEvent.blur(container.querySelector('input'));
	// expect anything on last argument because it is a class
	expect(onBlur).toHaveBeenCalledWith('Invalid number', '123.423', 'foo', expect.anything());
});

test('Minimum value passed for float input', () => {
	const component = renderer.create(<FloatInput min={5} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Minimum value failed for float input', () => {
	const component = renderer.create(<FloatInput min={10} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('New minimum value failed for float input', () => {
	const component = renderer.create(<FloatInput min={10} value={5} />);
	component.update(<FloatInput min={3} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Maximum value passed for float input', () => {
	const component = renderer.create(<FloatInput max={5} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Maximum value failed for float input', () => {
	const component = renderer.create(<FloatInput max={0} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('New maximum value failed for float input', () => {
	const component = renderer.create(<FloatInput max={10} value={5} />);
	component.update(<FloatInput max={3} value={5} />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
