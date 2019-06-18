import React from 'react';
import { TableMain } from '../tableMain';
import renderer from 'react-test-renderer';

test('Default render of table main', () => {
	const tree = renderer.create(
		<TableMain />,
		{ createNodeMock: element => {
			if (element.type === 'div') {
				return {};
			}

			return null;
		}}
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table main render with records', () => {
	const tree = renderer.create(
		<TableMain pageProperties={{ recordCount: 10 }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
