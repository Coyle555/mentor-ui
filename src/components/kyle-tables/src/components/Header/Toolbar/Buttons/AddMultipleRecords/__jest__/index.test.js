import React from 'react';
import { AddMultipleRecords } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('Add multiple records button default render is correct', () => {
	const component = renderer.create(
		<AddMultipleRecords />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Add multiple records button disabled render is correct', () => {
	const component = renderer.create(
		<AddMultipleRecords disabled={true} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('ADd multiple records button returns the correct data on a callback', () => {
	function onClick(insertType) {
		expect(insertType).toBe('multiple');
	}

	const { container } = render(
		<AddMultipleRecords onClick={onClick} />
	);

	fireEvent.click(container.querySelector('button'));
});
