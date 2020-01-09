import React from 'react';
import { Field } from '../index';
import renderer from 'react-test-renderer';

test('Default render of the field', () => {
	const tree = renderer.create(<Field />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering field that can go left', () => {
	const handleGoingLeft = jest.fn();

	const tree = renderer.create(
		<Field canGoLeft={true} handleGoingLeft={handleGoingLeft} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering field that can go right', () => {
	const handleGoingRight = jest.fn();

	const tree = renderer.create(
		<Field 
			canGoLeft={false}
			canGoRight={true}
			handleGoingRight={handleGoingRight}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering field that can go left and right', () => {
	const tree = renderer.create(<Field canGoLeft={true} canGoRight={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a field that can be submitted', () => {
	const _onSubmit = jest.fn();
	const tree = renderer.create(<Field canSubmit={true} _onSubmit={_onSubmit} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a field with a string value', () => {
	const Input = (props) => <input type="text">{props.value}</input>;

	const tree = renderer.create(
		<Field
			InputComponent={<Input />}
			value="foo"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a field with a false valid linked value', () => {
	const Input = (props) => <input {...props} type="text" />;

	const tree = renderer.create(
		<Field
			InputComponent={<Input />}
			link={{ valid: false }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a field with a valid linked value', () => {
	const Input = (props) => <input {...props} type="text" />;

	const tree = renderer.create(
		<Field
			InputComponent={<Input />}
			link={{ valid: true }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering field with a onLink callback', () => {
	const onLink = jest.fn(() => ({ value: 'test' }));
	const Input = (props) => <input {...props} type="text" />;

	const tree = renderer.create(
		<Field
			InputComponent={<Input />}
			link={{
				valid: true,
				onLink
			}}
		/>
	).toJSON();

	expect(onLink).toHaveBeenCalled();
	expect(tree).toMatchSnapshot();
});

test('Rendering field with a onLink callback and a link value', () => {
	const onLink = jest.fn((val) => ({}));
	const Input = (props) => <input {...props} type="text" />;

	const tree = renderer.create(
		<Field
			InputComponent={<Input />}
			link={{
				valid: true,
				onLink,
				value: 'foo'
			}}
		/>
	);

	expect(onLink).toHaveBeenCalledWith('foo');
});
