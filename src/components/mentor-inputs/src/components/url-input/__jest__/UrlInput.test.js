import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement, cleanup, act, getByTestId } from '@testing-library/react';

import UrlInput from '../urlInput';

afterEach(cleanup);

test('<UrlInput /> with no props', () => {

	const component = renderer.create(<UrlInput />);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


test('<UrlInput /> with a required attribute', () => {
	const component = renderer.create(
		<UrlInput required />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with a non-string value passed in', () => {
	const component = renderer.create(
		<UrlInput value={4593.3} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with a non-url value passed in', () => {
	const component = renderer.create(
		<UrlInput value="www.goog" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with a value passed in', () => {
	const component = renderer.create(
		<UrlInput value="https://www.gmail.com" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('<UrlInput /> with autocomplete enabled', () => {
	const component = renderer.create(
		<UrlInput autoComplete="true" />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
