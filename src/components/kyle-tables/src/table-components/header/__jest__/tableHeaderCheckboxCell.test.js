import React from 'react';
import { TableHeaderCheckboxCell } from '../tableHeaderCheckboxCell';
import renderer from 'react-test-renderer';

test('Default render of table header checkbox cell', () => {
	const tree = renderer.create(<TableHeaderCheckboxCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header checkbox cell with all rows selected', () => {
	const tree = renderer.create(<TableHeaderCheckboxCell allRowsSelected={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header checkbox cell with a select all rows callback', () => {
	function _onRowSelectAll() {}

	const tree = renderer.create(<TableHeaderCheckboxCell _onRowSelectAll={_onRowSelectAll} />).toJSON();

	expect(tree).toMatchSnapshot();
});
