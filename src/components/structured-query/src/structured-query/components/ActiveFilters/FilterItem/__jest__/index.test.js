jest.mock('react-intl', () => {
	return {
		FormattedDate: (props) => <div>Date: {JSON.stringify(props)}</div>,
		FormattedTime: (props) => <div>Time: {JSON.stringify(props)}</div>
	};
});

import React from 'react';
import { FilterItem } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Rendering default filter item', () => {
	const tree = renderer.create(<FilterItem />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item with child object', () => {
	const tree = renderer.create(
		<FilterItem>{{ label: 'Foo', operator: 'Bar', value: 'Baz' }}</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item of type datetime', () => {
	const tree = renderer.create(
		<FilterItem type="datetime">
			{{ label: 'Foo', operator: 'Bar', value: '1995-10-22' }}
		</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filter item of type date', () => {
	const tree = renderer.create(
		<FilterItem type="date">
			{{ label: 'Foo', operator: 'Bar', value: '1995-10-22' }}
		</FilterItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('On remove click callback', () => {
	const tbody = document.createElement('tbody');
	const onRemove = jest.fn();

	const { getByText } = render(
		<FilterItem onRemove={onRemove}>
			{{ label: 'Foo', operator: 'Bar', value: 'Baz' }}
		</FilterItem>,
		{ container: document.body.appendChild(tbody) }
	);

	fireEvent.click(getByText('Clear'));
	expect(onRemove).toHaveBeenCalledWith({ label: 'Foo', operator: 'Bar', value: 'Baz' });
});
