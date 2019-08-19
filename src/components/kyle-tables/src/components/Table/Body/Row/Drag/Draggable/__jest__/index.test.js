import React from 'react';
import { formatDragMessage, getDragType, DragRow } from '../index';
import renderer from 'react-test-renderer';

test('Format drag message in draggable table row', () => {
	const selectedRows = [{ name: 'foo' }, { name: 'bar' }];

	expect(formatDragMessage(selectedRows)).toStrictEqual(['foo', 'bar']);
});

test('Get drag type in draggable table row', () => {
	const props = { dragType: 'foo' };

	expect(getDragType(props)).toBe('foo');
});

test('Default render of draggable table row', () => {
	const connectDragSource = child => child;
	const connectDragPreview = child => child;

	const tree = renderer.create(
		<DragRow
			connectDragPreview={connectDragPreview}
			connectDragSource={connectDragSource}
		>
			test
		</DragRow>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
