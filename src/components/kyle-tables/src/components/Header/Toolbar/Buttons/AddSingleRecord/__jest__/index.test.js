import React from 'react';
import { AddSingleRecord } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('Add single record button default render is correct', () => {
	const component = renderer.create(
		<AddSingleRecord />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Add single record button disabled render is correct', () => {
	const component = renderer.create(
		<AddSingleRecord disabled={true} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Add single record button returns the correct data on a callback', () => {
	function onClick(insertType) {
		expect(insertType).toBe('single');
	}

	const { container } = render(
		<AddSingleRecord onClick={onClick} />
	);

	fireEvent.click(container.querySelector('button'));
});
