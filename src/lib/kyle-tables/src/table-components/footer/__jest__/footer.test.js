import React from 'react';
import { TableFooter } from '../footer';
import renderer from 'react-test-renderer';

test('Default render of table footer', () => {
	const tree = renderer.create(<TableFooter />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table footer render with no records', () => {
	const tree = renderer.create(<TableFooter recordCount={0} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table footer render that has a next page', () => {
	const tree = renderer.create(
		<TableFooter
			currentPage={1}
			pageSize={10}
			recordCount={20}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table footer has a previous page', () => {
	const tree = renderer.create(<TableFooter currentPage={2} />).toJSON();

	expect(tree).toMatchSnapshot();
});
