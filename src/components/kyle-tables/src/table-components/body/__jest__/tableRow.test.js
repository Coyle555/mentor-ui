jest.mock('../tableRowDroppable');
jest.mock('../tableRowDraggable');

import React from 'react';
import { TableRow } from '../tableRow';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';

afterEach(cleanup);

test('Default render of a table row', () => {
	const tree = renderer.create(<TableRow />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row custom class', () => {
	const tree = renderer.create(<TableRow customClasses={{ tableRow: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row that is expandable', () => {
	const tree = renderer.create(<TableRow expandable={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row with extra columns without an onClick handler', () => {
	const tree = renderer.create(
		<TableRow
			extraColumns={[
				{ cell: 'foo' },
				{ cell: 'bar' }
			]}
			rowId="baz"
		/>
	).toJSON();
});

test('Table row with extra columns with an onClick handler', () => {
	const onClick = jest.fn();

	const tree = renderer.create(
		<TableRow
			extraColumns={[
				{ cell: 'foo', onClick },
				{ cell: 'bar', onClick }
			]}
			rowId="baz"
		/>
	).toJSON();
});

test('Table row with an extra column onClick handler fired', () => {
	const onClick = jest.fn();

	const tableBody = document.createElement('tbody');
	const { getByText } = render(
		<TableRow
			extraColumns={[{ cell: 'foo', onClick }]}
			rowId="baz"
			row={{ a: 1, b: 2, c: 3 }}
		/>,
		{ container: document.body.appendChild(tableBody) }
	);

	fireEvent.click(getByText('foo'));
	expect(onClick).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
});

test('Table row that allows a selection that is unchecked', () => {
	const tree = renderer.create(<TableRow allowSelection={true} rowSelected={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row that allows a selection that is checked', () => {
	const tree = renderer.create(<TableRow allowSelection={true} rowSelected={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row with data cells', () => {
	const tree = renderer.create(
		<TableRow
			columns={[{ id: 'foo' }]}
			row={{ foo: 1 }}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row droppable and not expandable', () => {
	const tree = renderer.create(<TableRow dropType="foo" rowSelected={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row droppable and expandable', () => {
	const tree = renderer.create(
		<TableRow
			dropType="foo"
			expandable={true}
			rowSelected={false}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row not in edit mode and is draggable', () => {
	const tree = renderer.create(
		<TableRow
			draggable={true}
			editMode={false}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row in edit mode and is draggable', () => {
	const tree = renderer.create(
		<TableRow
			draggable={true}
			editMode={true}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table row that generates a custom async filter for a row', () => {
	const generateCustomFilter = jest.fn();

	const tableBody = document.createElement('tbody');
	render(
		<TableRow
			columns={[{ id: 'foo' }]}
			generateCustomFilter={generateCustomFilter}
			row={{ a: 1, b: 2, c: 3 }}
		/>,
		{ container: document.body.appendChild(tableBody) }
	);

	expect(generateCustomFilter).toHaveBeenCalledWith({ id: 'foo' }, { a: 1, b: 2, c: 3 });
});

test('Table row that has a row selected', () => {
	const _onRowSelect = jest.fn();

	const tableBody = document.createElement('tbody');
	const { container } = render(
		<TableRow
			allowSelection={true}
			columns={[{ id: 'foo' }]}
			row={{ a: 1, b: 2, c: 3 }}
			_onRowSelect={_onRowSelect}
		/>,
		{ container: document.body.appendChild(tableBody) }
	);

	fireEvent.click(container.querySelector('input[type=checkbox]'));
	expect(_onRowSelect).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 });
});

test('Table row that has a row expanded', () => {
	const _onExpandClick = jest.fn();

	const tableBody = document.createElement('tbody');
	const { container } = render(
		<TableRow
			expandable={true}
			rowId="foo"
			_onExpandClick={_onExpandClick}
		/>,
		{ container: document.body.appendChild(tableBody) }
	);

	fireEvent.click(container.querySelector('.table-expand-icon'));
	expect(_onExpandClick).toHaveBeenCalledWith('foo');
});
