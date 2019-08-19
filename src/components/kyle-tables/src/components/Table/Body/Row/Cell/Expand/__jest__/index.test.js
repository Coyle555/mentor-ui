import React from 'react';
import { ExpandIcon } from '../index';
import renderer from 'react-test-renderer';

function onClick() {}

test('Expand icon is collapsed on render', () => {
	const component = renderer.create(
		<ExpandIcon onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Expand icon is expanded on render', () => {
	const component = renderer.create(
		<ExpandIcon expanded={true} onClick={onClick} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
