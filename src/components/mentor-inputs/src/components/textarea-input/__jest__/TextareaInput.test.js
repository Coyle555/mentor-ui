import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import TextareaInput from '../textareaInput';

afterEach(cleanup);

test('<TextareaInput /> with no props', () => {

	const component = renderer.create(<TextareaInput />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


test('<TextareaInput /> with a required attribute', () => {
	const component = renderer.create(
		<TextareaInput required={true} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with value of null', () => {
	const component = renderer.create(
		<TextareaInput value={null} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with a stringified value', () => {
	const component = renderer.create(
		<TextareaInput value={4593.3} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with a string value', () => {
	const component = renderer.create(
		<TextareaInput value="Bill" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with autocomplete enabled', () => {
	const component = renderer.create(
		<TextareaInput autoComplete="true" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with 30 rows', () => {
	const component = renderer.create(
		<TextareaInput rows={30} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<TextareaInput /> with 14 cols', () => {
	const component = renderer.create(
		<TextareaInput cols={14} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

