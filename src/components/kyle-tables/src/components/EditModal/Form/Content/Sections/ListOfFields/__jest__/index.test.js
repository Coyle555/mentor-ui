import React from 'react';
import { ListOfFields } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const fields = [
	{ id: 'foo', label: 'Foo' },
	{ id: 'bar', label: 'Bar' },
	{ id: 'baz', label: 'Baz' }
];

test('Default render of list of fields', () => {
	const tree = renderer.create(<ListOfFields />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('List of fields render with a list', () => {
	const tree = renderer.create(<ListOfFields fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Selecting a field from the list of fields', () => {
	const selectField = jest.fn();
	const { getByText } = render(<ListOfFields fields={fields} selectField={selectField} />);

	fireEvent.click(getByText('Bar'));
	expect(selectField).toHaveBeenCalledWith('Bar');
});

test('Filtering a field', () => {
	const { container, queryByText } = render(<ListOfFields fields={fields} />);

	fireEvent.change(container.querySelector('input'), { target: { value: 'f' } });
	expect(queryByText('Foo')).toBeTruthy();
	expect(queryByText('Bar')).toBeNull();
	expect(queryByText('Baz')).toBeNull();
});
