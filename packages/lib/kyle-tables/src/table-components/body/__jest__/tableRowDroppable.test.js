import React from 'react';
import { DroppableRow } from '../tableRowDroppable';
import renderer from 'react-test-renderer';

test('Default droppable table row render', () => {
	const connectDropTarget = (child) => child;

	const tree = renderer.create(
		<DroppableRow connectDropTarget={connectDropTarget}>
			test
		</DroppableRow>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Droppable table row with canDrop and isOver', () => {
	const connectDropTarget = (child) => child;

	const tree = renderer.create(
		<DroppableRow
			canDrop={true}
			colSpan={3}
			connectDropTarget={connectDropTarget}
			desc="bar"
			isOver={true}
			name="foo"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
