import React from 'react';
import { ImageCell } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of image cell', () => {
	const tree = renderer.create(<ImageCell value="/foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Image cell in edit mode with a value', () => {
	const tree = renderer.create(<ImageCell editMode={true} value="/foo.jpg" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Image cell in edit mode onDeleteClick callback', () => {
	const onDeleteClick = jest.fn();

	const { getByTestId } = render(
		<ImageCell
			colId="foo"
			editMode={true}
			onDeleteClick={onDeleteClick}
			rowId="bar"
		/>
	);

	fireEvent.click(getByTestId('table-image-delete'));
	expect(onDeleteClick).toHaveBeenCalledWith('bar', 'foo');
});
