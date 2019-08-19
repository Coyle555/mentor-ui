jest.mock('react-dropzone');
jest.mock('../cell-components/listFilter', () => {
	return { TableListFilter: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../cell-components/datePicker', () => {
	return { TableDatePicker: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../cell-components/asyncDropdownCell', () => {
	return { AsyncDropdownCell: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { Cell } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of cell', () => {
	const tree = renderer.create(<Cell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell no edit mode enabled class', () => {
	const tree = renderer.create(<Cell editMode={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell edit mode with the row not selected', () => {
	const tree = renderer.create(<Cell editMode={true} rowSelected={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell without a row selected', () => {
	const tree = renderer.create(<Cell rowSelected={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell edit mode enabled css class', () => {
	const tree = renderer.create(
		<Cell
			editMode={true}
			rowSelected={true}
			updatable={true}
			multiline={false}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell custom class', () => {
	const tree = renderer.create(<Cell customClasses={{ tableCell: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell edit input custom class', () => {
	const tree = renderer.create(<Cell customClasses={{ tableEditCell: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell update is false', () => {
	const tree = renderer.create(<Cell updatable={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell multiline is true', () => {
	const tree = renderer.create(<Cell multiline={true} />).toJSON();
	
	expect(tree).toMatchSnapshot();
});

test('Cell with a value', () => {
	const tree = renderer.create(<Cell value="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell with a customColumn callback', () => {
	const customColumn = jest.fn();

	const tr = document.createElement('tr');
	render(
		<Cell
			colId="foo"
			customColumn={customColumn}
			editMode={false}
			row={{ baz: 1 }}
			rowSelected={false}
			value="bar"
		/>,
		{ container: document.body.appendChild(tr) }
	);

	expect(customColumn).toHaveBeenCalledWith(
		{ baz: 1 },
		{
			colId: 'foo',
			editMode: false,
			rowSelected: false,
			value: 'bar',
			_origValue: 'bar'
		}
	);
});

test('Cell that has an image', () => {
	const tree = renderer.create(<Cell model={{ foo: { image: true } }} value="/src" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a value', () => {
	const tree = renderer.create(<Cell value="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell image has a delete button', () => {
	const tree = renderer.create(
		<Cell
			colId="foo"
			editMode={true}
			model={{ foo: { image: true } }}
			rowSelected={true}
			value="/src"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a color picker', () => {
	const tree = renderer.create(
		<Cell
			colId="foo"
			editMode={true}
			model={{ foo: { color: true } }}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a file dropzone', () => {
	const tree = renderer.create(
		<Cell
			file={{ path: '/src' }}
			editMode={true}
			rowId="foo"
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a lookup', () => {
	const tree = renderer.create(
		<Cell
			colId="foo"
			editMode={true}
			model={{ foo: { lookup: true } }}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a list of options', () => {
	const tree = renderer.create(
		<Cell
			cellOptions={['foo', 'bar', 'baz']}
			editMode={true}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has an async filter', () => {
	const tree = renderer.create(
		<Cell
			asyncFilter="/route"
			editMode={true}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell has a datetime data type', () => {
	const tree = renderer.create(
		<Cell
			editMode={true}
			rowSelected={true}
			type="datetime"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Cell is an editable input', () => {
	const tree = renderer.create(
		<Cell
			editMode={true}
			rowSelected={true}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
