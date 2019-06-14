import React from 'react';
import { CustomButton } from '../customButton';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

test('Custom button default render is correct', () => {
	const component = renderer.create(<CustomButton />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button disabled render is correct', () => {
	const component = renderer.create(<CustomButton disabled={true} />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button className render is correct', () => {
	const component = renderer.create(<CustomButton className="foo" />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button icon render is correct', () => {
	const component = renderer.create(<CustomButton icon={<i />} />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button tip render is correct', () => {
	const component = renderer.create(<CustomButton tip="bar" />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button onClick render is correct', () => {
	function onClick() {}

	const component = renderer.create(<CustomButton onClick={onClick} />);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Custom button returns the correct data on a callback', () => {
	function onClick(selectedRows) {
		expect(selectedRows).toStrictEqual({ a: 1 });
	}

	const { container } = render(
		<CustomButton onClick={onClick} selectedRows={{ a: 1 }} />
	);

	fireEvent.click(container.querySelector('button'));
});

test('Custom button returns the correct data on a validation', () => {
	function validation(selectedRows) {
		expect(selectedRows).toStrictEqual({ a: 1 });
	}

	const { container } = render(
		<CustomButton validation={validation} selectedRows={{ a: 1 }} />
	);

	fireEvent.click(container.querySelector('button'));
});
