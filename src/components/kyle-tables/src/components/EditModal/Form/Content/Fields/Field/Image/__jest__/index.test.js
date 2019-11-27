jest.mock('mentor-inputs', () => {
	return { FileInput: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { ImageField } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Image field render with value', () => {
	const tree = renderer.create(<ImageField value="/foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Image field render with no value', () => {
	const tree = renderer.create(<ImageField />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Image field deleting an image', () => {
	const onDeleteClick = jest.fn();

	const { getByText } = render(
		<ImageField
			fieldId="bar"
			onDeleteClick={onDeleteClick}
			rowId="baz"
			value="/foo"
		/>
	);

	fireEvent.click(getByText('Delete Image'));
	expect(onDeleteClick).toHaveBeenCalledWith('baz', 'bar');
});
