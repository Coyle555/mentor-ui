import React from 'react';
import { EditImageCell } from '../editImageCell';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';

afterEach(cleanup);

test('Default render of edit image cell', () => {
	const tree = renderer.create(<EditImageCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Edit image cell with a value', () => {
	const tree = renderer.create(<EditImageCell value="/foo.jpg" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Edit image cell onDeleteClick callback', () => {
	const onDeleteClick = jest.fn();

	const { getByTestId } = render(
		<EditImageCell
			colId="foo"
			onDeleteClick={onDeleteClick}
			rowId="bar"
		/>
	);

	fireEvent.click(getByTestId('table-image-delete'));
	expect(onDeleteClick).toHaveBeenCalledWith('bar', 'foo');
});
