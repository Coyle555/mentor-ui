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
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

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

test.skip('Segmented list with an insertable item', () => {
	const InsertItemComponent = jest.fn(props => <div>Add Item Render</div>);
	const { getByText } = render(<SegmentedList InsertItemComponent={InsertItemComponent} />);

	fireEvent.click(getByText('Add Item'));
	expect(getByText('Add Item Render')).toBeTruthy();
});
