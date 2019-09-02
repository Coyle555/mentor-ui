import React from 'react';
import { TableMain } from '../index';
import renderer from 'react-test-renderer';

test('Default render of table main', () => {
	const tree = renderer.create(
		<TableMain
			events={{}}
			pageProperties={{ recordCount: 0 }}
			recordProperties={{}}
			rowProperties={{}}
		/>,
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
		<TableMain
			events={{}}
			pageProperties={{ recordCount: 10 }}
			recordProperties={{
				entriesViewable: 10,
				currentPage: 1,
				count: 10
			}}
			rowProperties={{ data: [] }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
