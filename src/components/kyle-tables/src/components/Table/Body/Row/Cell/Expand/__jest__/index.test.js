import React from 'react';
import { ExpandRow } from '../index';
import renderer from 'react-test-renderer';

function onClick() {}

test('Expand row icon is collapsed on render', () => {
	const component = renderer.create(
		<ExpandRow onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Expand row icon is expanded on render', () => {
	const component = renderer.create(
		<ExpandRow expanded={true} onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
