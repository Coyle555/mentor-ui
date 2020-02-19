jest.mock('react-dnd', () => {
	return {
		DragSource: (type, source, collect) => (row) => null,
		DropTarget: (type, source, collect) => (row) => null
	};
});
jest.mock('../components/Table/Body/Row/Drag/Droppable');
jest.mock('../components/Table/Body/Row/Drag/Draggable');

import React from 'react';
import { Table } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of table', () => {
	const tree = renderer.create(<Table />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table with a custom container class', () => {
	const tree = renderer.create(<Table customClasses={{ container: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table with a custom layout function', () => {
	const customLayout = jest.fn();

	render(<Table customLayout={customLayout} />);

	expect(customLayout).toHaveBeenCalled();
});

test('Table is loading', () => {
	const tree = renderer.create(<Table loading={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table loads the next page', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table currentPage={1} handleTableChange={handleTableChange} />
	);

	tree.getInstance()._loadNextPage();
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 2, 
		sortId: undefined, 
		sortDir: undefined, 
		filters: []
	});
});

test('Table loads the previous page', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table currentPage={2} handleTableChange={handleTableChange} />
	);

	tree.getInstance()._loadPrevPage();
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 1, 
		sortId: undefined, 
		sortDir: undefined, 
		filters: []
	});
});

test('Table loads a user defined page', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table currentPage={1} handleTableChange={handleTableChange} />
	);

	tree.getInstance()._loadGetPage(5);
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 5, 
		sortId: undefined, 
		sortDir: undefined,
		filters: []
	});
});

test('Table sorts an already sorted ascending column', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table
			handleTableChange={handleTableChange}
			sortDir="ASC"
			sortId="foo"
		/>
	);

	tree.getInstance()._loadSort('foo');
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 1, 
		sortId: 'foo',
		sortDir: 'DESC',
		filters: []
	});
});

test('Table sorts an already sorted descending column', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table
			handleTableChange={handleTableChange}
			sortDir="DESC"
			sortId="foo"
		/>
	);

	tree.getInstance()._loadSort('foo');
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 1, 
		sortId: 'foo', 
		sortDir: 'ASC',
		filters: []
	});
});

test('Table sorts an unsorted column', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table
			handleTableChange={handleTableChange}
			sortId="foo"
		/>
	);

	tree.getInstance()._loadSort('bar');
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined, 
		currentPage: 1, 
		sortId: 'bar',
		sortDir: 'DESC',
		filters: []
	});
});

test('Table filters on a filter change', () => {
	const handleTableChange = jest.fn();

	const tree = renderer.create(
		<Table
			handleTableChange={handleTableChange}
			filters={[]}
		/>
	);

	tree.getInstance()._loadFilterChange(['foo', 'bar']);
	expect(handleTableChange).toHaveBeenCalledWith({
		pageSize: undefined,
		currentPage: 1,
		sortId: undefined,
		sortDir: undefined,
		filters: ['foo', 'bar']
	});
});

test('Exporting table has correct filters', () => {
	const exportTable = jest.fn();

	const tree = renderer.create(
		<Table
			exportTable={exportTable}
			filters={[{ foo: 'foo' }, { bar: 'bar' }]}
		/>
	);

	tree.getInstance().exportTableInsert();
	expect(exportTable).toHaveBeenCalledWith([{ foo: 'foo' }, { bar: 'bar' }]);
});

test('Table edit click toggle on and off', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	instance._onEditClick();
	expect(instance.state.editMode).toBe(true);

	instance._onEditClick();
	expect(instance.state.editMode).toBe(false);
});

test('Table activates single insert mode', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	instance._onInsertClick('single');
	expect(instance.state.insertMode).toBe(true);
	expect(instance.state.insertType).toBe('single');
});

test('Table activates multiple insert mode', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	instance._onInsertClick('multiple');
	expect(instance.state.insertMode).toBe(true);
	expect(instance.state.insertType).toBe('multiple');
});

test('Table selects a row', () => {
	const tree = renderer.create(<Table data={[{ id: 'foo' }]} />);
	const instance = tree.getInstance();

	instance._onRowSelect({ id: 'foo' });
	expect(instance.allRowsSelected).toBe(true);
	expect(instance.state.numRowsSelected).toBe(1);
	expect(instance.state.selectedRows).toStrictEqual({ foo: { id: 'foo' } });
});

test('Table deselects a row', () => {
	const tree = renderer.create(<Table data={[{ id: 'foo' }]} />);
	const instance = tree.getInstance();

	instance._onRowSelect({ id: 'foo' });
	instance._onRowSelect({ id: 'foo' });
	expect(instance.allRowsSelected).toBe(false);
	expect(instance.state.numRowsSelected).toBe(0);
	expect(instance.state.selectedRows).toStrictEqual({});
});

test('Table selects all row', () => {
	const tree = renderer.create(<Table data={[{ id: 'foo' }, { id: 'bar' }]} />);
	const instance = tree.getInstance();

	instance._onRowSelectAll({ stopPropagation: () => {} });
	expect(instance.allRowsSelected).toBe(true);
	expect(instance.state.numRowsSelected).toBe(2);
	expect(instance.state.selectedRows).toStrictEqual({
		foo: { id: 'foo' },
		bar: { id: 'bar' }
	});
});

test('Table deselects all row', () => {
	const tree = renderer.create(<Table data={[{ id: 'foo' }, { id: 'bar' }]} />);
	const instance = tree.getInstance();

	instance._onRowSelectAll({ stopPropagation: () => {} });
	instance._onRowSelectAll({ stopPropagation: () => {} });
	expect(instance.allRowsSelected).toBe(false);
	expect(instance.state.numRowsSelected).toBe(0);
	expect(instance.state.selectedRows).toStrictEqual({});
});

test('Table deletes a row', () => {
	const deleteCb = jest.fn();
	const tree = renderer.create(
		<Table
			data={[{ id: 'foo' }, { id: 'bar' }]}
			deleteCb={deleteCb}
		/>
	);
	const instance = tree.getInstance();

	instance._onRowSelect({ id: 'foo' });
	instance._onDeleteClick();
	expect(deleteCb).toHaveBeenCalledWith(['foo']);
	expect(instance.state.numRowsSelected).toBe(0);
	expect(instance.state.selectedRows).toStrictEqual({});
});

test('Table deletes all row', () => {
	const deleteCb = jest.fn();
	const tree = renderer.create(
		<Table
			data={[{ id: 'foo' }, { id: 'bar' }]}
			deleteCb={deleteCb}
		/>
	);
	const instance = tree.getInstance();

	instance._onRowSelectAll({ stopPropagation: () => {} });
	instance._onDeleteClick();
	expect(deleteCb).toHaveBeenCalledWith(['foo', 'bar']);
	expect(instance.state.numRowsSelected).toBe(0);
	expect(instance.state.selectedRows).toStrictEqual({});
});

test('Table deletes a file', () => {
	const updateCb = jest.fn();
	const tree = renderer.create(<Table updateCb={updateCb} />);
	const instance = tree.getInstance();

	instance._onDeleteFileClick('foo', 'bar');
	expect(updateCb).toHaveBeenCalledWith('foo', 'bar', null);
});

test('Table displayed column is turned off', () => {
	const onDisplayColChange = jest.fn();
	const tree = renderer.create(
		<Table
			columns={[{ id: 'foo', display: true }]}
			onDisplayColChange={onDisplayColChange}
		/>
	);
	const instance = tree.getInstance();

	instance._onDisplayColChange({ target: { name: 'foo', checked: false } });

	expect(instance.state.columns).toStrictEqual([{ id: 'foo', display: false }]);
	expect(onDisplayColChange).toHaveBeenCalledWith([]);
});

test('Table displayed column is turned on', () => {
	const onDisplayColChange = jest.fn();
	const tree = renderer.create(
		<Table
			columns={[{ id: 'foo', display: false }]}
			onDisplayColChange={onDisplayColChange}
		/>
	);
	const instance = tree.getInstance();

	instance._onDisplayColChange({ target: { name: 'foo', checked: true } });

	expect(instance.state.columns).toStrictEqual([{ id: 'foo', display: true }]);
	expect(onDisplayColChange).toHaveBeenCalledWith(['foo']);
});

test('Table quick view column change', () => {
	const tree = renderer.create(
		<Table columns={[{ id: 'foo', display: false }]} />
	);
	const instance = tree.getInstance();

	instance._onQuickViewColChange(['foo']);
	expect(instance.state.columns[0].display).toBe(true);
});

test('Table input has an onBlur fire', () => {
	const updateCb = jest.fn();
	const tree = renderer.create(<Table updateCb={updateCb} />);
	const instance = tree.getInstance();

	instance._onBlur('foo', 'bar', 'baz');
	expect(updateCb).toHaveBeenCalledWith('foo', 'bar', 'baz');
});

test('Table input matches an option', () => {
	const updateCb = jest.fn();
	const tree = renderer.create(<Table updateCb={updateCb} />);
	const instance = tree.getInstance();

	instance._onOptionMatch('foo', 'bar', 'baz');
	expect(updateCb).toHaveBeenCalledWith('foo', 'bar', 'baz');
});

test('Table input uploads a file', () => {
	const uploadFileCb = jest.fn();
	const tree = renderer.create(<Table uploadFileCb={uploadFileCb} />);
	const instance = tree.getInstance();

	instance._uploadFile('foo', '/bar', null);
	expect(uploadFileCb).toHaveBeenCalledWith('foo', '/bar', null);
});

test('Table has a single record insertion', () => {
	const insertCb = jest.fn();
	const tree = renderer.create(<Table insertCb={insertCb} />);
	const instance = tree.getInstance();

	instance._onSubmitInsertion({ foo: 'bar' });
	expect(insertCb).toHaveBeenCalledWith({ foo: 'bar' }, 'single');
	expect(instance.state.insertMode).toBe(false);
});

test('Table sorts filterable options for the structured query', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	const sorted = instance.sortFilterFields([
		{ label: 'foo' }, 
		{ label: 'bar' }, 
		{ label: 'baz' },
		{ label: 'test' }
	]);

	expect(sorted).toStrictEqual([
		{ label: 'bar' }, 
		{ label: 'baz' },
		{ label: 'foo' }, 
		{ label: 'test' }
	]);
});

test('Table prep columns filter for the header', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	// regular column
	let columns = instance.prepColumnsForHeader([{ label: 'foo', display: true, id: 'foo' }]);
	expect(columns).toStrictEqual([{ label: 'foo', display: true, id: 'foo' }]);

	// no label in column discards the field
	columns = instance.prepColumnsForHeader([{ display: true, id: 'foo' }]);
	expect(columns).toStrictEqual([]);
});

test('Table prep columns sorting for the header', () => {
	const tree = renderer.create(<Table />);
	const instance = tree.getInstance();

	const columns = instance.prepColumnsForHeader([
		{ label: 'foo', display: true, id: 'foo' },
		{ label: 'bar', display: true, id: 'foo' },
		{ label: 'baz', display: true, id: 'foo' }
	]);

	expect(columns).toStrictEqual([
		{ label: 'bar', display: true, id: 'foo' },
		{ label: 'baz', display: true, id: 'foo' },
		{ label: 'foo', display: true, id: 'foo' }
	]);
});
