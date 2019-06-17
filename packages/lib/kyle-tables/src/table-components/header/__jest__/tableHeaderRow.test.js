jest.mock('stickyfilljs');

import React from 'react';
import { TableHeaderRow } from '../tableHeaderRow';
import renderer from 'react-test-renderer';

test('Default render of a table header row', () => {
	const tree = renderer.create(<TableHeaderRow />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with a custom row class', () => {
	const tree = renderer.create(<TableHeaderRow customClasses={{ tableHeaderRow: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with a custom header class', () => {
	const tree = renderer.create(<TableHeaderRow customClasses={{ tableHeaderCell: 'bar' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with an expandable header cell', () => {
	const tree = renderer.create(<TableHeaderRow expandable={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with extra column header cells', () => {
	const tree = renderer.create(
		<TableHeaderRow extraColumns={[{ header: <th /> }, { header: <th /> }]} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row that allows selection', () => {
	const tree = renderer.create(<TableHeaderRow allowSelection={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with header cells', () => {
	const tree = renderer.create(
		<TableHeaderRow
			cells={[
				{ id: 'foo', category: 'Foo' },
				{ id: 'bar', category: 'Bar' }
			]}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with ascending sort', () => {
	const tree = renderer.create(
		<TableHeaderRow
			cells={[{ id: 'foo', category: 'Foo' }]}
			sort={{ id: 'foo', ascending: true }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header row with descending sort', () => {
	const tree = renderer.create(
		<TableHeaderRow
			cells={[{ id: 'foo', category: 'Foo' }]}
			sort={{ id: 'foo', ascending: false }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
