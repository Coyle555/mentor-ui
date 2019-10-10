jest.mock('mentor-inputs', () => {
	return { TextInput: props => (
		<input
			{...props}
			onChange={(evt) => {
				props.onChange(false, evt.target.value)
			}} 
		/>
	)};
});

import React from 'react';
import { FieldList } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const fields = [
	{ id: 'foo', label: 'Foo' },
	{ id: 'bar', label: 'Bar' },
	{ id: 'baz', label: 'Baz' }
];

test('List of fields', () => {
	const tree = renderer.create(<FieldList fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Filtering a field', () => {
	const { container, queryByText } = render(<FieldList fields={fields} />);

	fireEvent.change(container.querySelector('input'), { target: { value: 'f' } });
	expect(queryByText('Foo')).toBeTruthy();
	expect(queryByText('Bar')).toBeNull();
	expect(queryByText('Baz')).toBeNull();
});
