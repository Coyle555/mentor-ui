jest.mock('stickyfilljs');

import React from 'react';
import { TableHeaderCell } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of table header cell', () => {
	const tree = renderer.create(<TableHeaderCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header cell with a custom class', () => {
	const tree = renderer.create(<TableHeaderCell customClasses={{ tableHeaderCell: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header cell with a title', () => {
	const tree = renderer.create(<TableHeaderCell title="Foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header cell that is sorted', () => {
	const tree = renderer.create(<TableHeaderCell sorted={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header cell that is sorted with a sort icon', () => {
	const tree = renderer.create(<TableHeaderCell sorted={true} sortIcon={<i />} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header cell sort click callback', () => {
	const onClick = jest.fn();

	const tr = document.createElement('tr');
	const { getByText } = render(
		<TableHeaderCell
			id="foo"
			onClick={onClick}
			title="Foo"
		/>,
		{ container: document.body.appendChild(tr) }
	);

	fireEvent.click(getByText(/foo/i));
	expect(onClick).toHaveBeenCalledWith('foo');
});
