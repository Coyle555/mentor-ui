jest.mock('react-intl', () => {
	return {
		FormattedDate: (props) => <div>Date: {JSON.stringify(props)}</div>,
		FormattedTime: (props) => <div>Time: {JSON.stringify(props)}</div>
	};
});

import React from 'react';
import { FilterItem } from '../FilterItem';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';

afterEach(cleanup);

test('Rendering default filter item', () => {
	const tree = renderer.create(<FilterItem />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item with child object', () => {
	const tree = renderer.create(
		<FilterItem>{{ category: 'Foo', operator: 'Bar', value: 'Baz' }}</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item that is disabled', () => {
	const tree = renderer.create(
		<FilterItem disabled={true}>
			{{ category: 'Foo', operator: 'Bar', value: 'Baz' }}
		</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item of type datetime', () => {
	const tree = renderer.create(
		<FilterItem type="datetime">
			{{ category: 'Foo', operator: 'Bar', value: '1995-10-22' }}
		</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item of type date', () => {
	const tree = renderer.create(
		<FilterItem type="date">
			{{ category: 'Foo', operator: 'Bar', value: '1995-10-22' }}
		</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('On remove click callback', () => {
	const tbody = document.createElement('tbody');
	const onRemove = jest.fn();

	const { getByText } = render(
		<FilterItem onRemove={onRemove}>
			{{ category: 'Foo', operator: 'Bar', value: 'Baz' }}
		</FilterItem>,
		{ container: document.body.appendChild(tbody) }
	);

	fireEvent.click(getByText('Clear'));
	expect(onRemove).toHaveBeenCalledWith({ category: 'Foo', operator: 'Bar', value: 'Baz' });
});
