import React from 'react';
import { ExpandCell } from '../index';
import renderer from 'react-test-renderer';

function onClick() {}

test('Expand row icon is collapsed on render', () => {
	const component = renderer.create(
		<ExpandCell onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Expand row icon is expanded on render', () => {
	const component = renderer.create(
		<ExpandCell expanded={true} onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
