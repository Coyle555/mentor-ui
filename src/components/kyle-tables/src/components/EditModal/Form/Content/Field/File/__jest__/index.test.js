jest.mock('mentor-inputs', () => {
	return { FileInput: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { FileField } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('File field render with value', () => {
	const tree = renderer.create(<FileField value="/foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('File field render with no value', () => {
	const tree = renderer.create(<FileField />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('File field deleting a file', () => {
	const onDeleteClick = jest.fn();

	const { getByText } = render(
		<FileField
			fieldId="bar"
			onDeleteClick={onDeleteClick}
			rowId="baz"
			value="/foo"
		/>
	);

	fireEvent.click(getByText('Delete File'));
	expect(onDeleteClick).toHaveBeenCalledWith('baz', 'bar');
});

