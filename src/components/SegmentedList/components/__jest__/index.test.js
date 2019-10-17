jest.mock('react-spring/renderprops', () => {
	return props => ({
		config: {},
		Spring: (
			<div>
				{JSON.stringify(props)}
				{ props.children() }
			</div>
		)
	});
});

import React from 'react';
import { SegmentedList } from '../index';
import renderer from 'react-test-renderer';

test('Default render of segmented list', () => {
	const tree = renderer.create(<SegmentedList />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Segmented list with items', () => {
	const tree = renderer.create(
		<SegmentedList items={['Foo', 'Bar', 'Baz']} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Segmented list with title', () => {
	const tree = renderer.create(<SegmentedList title="Test" />).toJSON();

	expect(tree).toMatchSnapshot();
});
