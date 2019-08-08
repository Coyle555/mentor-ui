import React from 'react';
import { TableBody } from '../tableBody';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of table body', () => {
	const tree = renderer.create(<TableBody />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Custom class on table body', () => {
	const tree = renderer.create(<TableBody customClasses={{ tableBody: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table body with a couple rows', () => {
	const tree = renderer.create(
		<TableBody rowData={[{ id: 'foo' }, { id: 'bar' }]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table body with an expandable row', () => {
	const tree = renderer.create(
		<TableBody
			expandedRows={{ foo: true }}
			rowData={[{ id: 'foo' }]}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table body with an expanded row', () => {
	const tree = renderer.create(
		<TableBody
			expandable={true}
			rowData={[{ id: 'foo' }]}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table body with an expanded row and an expand component', () => {
	const ExpandComponent = <h1>Test</h1>;

	const table = document.createElement('table');
	const { container, getByText } = render(
		<TableBody
			expandable={true}
			ExpandComponent={ExpandComponent}
			rowData={[{ id: 'foo' }]}
		/>,
		{ container: document.body.appendChild(table) }
	);

	fireEvent.click(container.querySelector('.table-expand-icon'));
	getByText('Test');
});
