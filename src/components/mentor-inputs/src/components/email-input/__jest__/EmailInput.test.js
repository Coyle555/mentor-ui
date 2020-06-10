import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import EmailInput from '../emailInput';

afterEach(cleanup);

test('<EmailInput /> with no props', () => {
	const component = renderer.create(<EmailInput />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Email with a custom placeholder', () => {
	const tree = renderer.create(<EmailInput placeholder="Test Placeholder" />).toJSON();

	expect(tree).toMatchSnapshot();
});


test('<EmailInput /> with a required attribute', () => {
	const component = renderer.create(
		<EmailInput required />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with a non-email value passed in', () => {
	const component = renderer.create(
		<EmailInput value="4593.3" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with a valid value passed in', () => {
	const component = renderer.create(
		<EmailInput value="bill@gmail.com" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with a non valid value passed in', () => {
	const component = renderer.create(
		<EmailInput value="bill@gmail" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<EmailInput /> with autocomplete enabled', () => {
	const component = renderer.create(
		<EmailInput autoComplete="true" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
