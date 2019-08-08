jest.mock('mentor-inputs', () => {
	return { getMentorInput: (type) => (props) => <div>{JSON.stringify(props)}</div> }
});

import React from 'react';
import { EditInputCell } from '../editInputCell';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of edit input cell', () => {
	const tree = renderer.create(
		<EditInputCell
			colId="foo"
			inputClass="bar"
			required={false}
			value="baz"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Edit input cell onBlur callback', () => {
	const onBlur = jest.fn();

	const instance = renderer.create(
		<EditInputCell
			colId="edit-input"
			onBlur={onBlur}
			rowId="foo"
		/>
	).getInstance();
			
	instance._onBlur(false, 'bar', 'edit-input');
	expect(onBlur).toHaveBeenCalledWith('foo', { 'edit-input': 'bar' });
});

test('Edit input cell onBlur callback with a valid change of a float type', () => {
	const onBlur = jest.fn();

	const instance = renderer.create(
		<EditInputCell
			colId="edit-input"
			onBlur={onBlur}
			rowId="foo"
			type="float"
			value="1"
		/>
	).getInstance();
			
	instance._onBlur(false, '1.5', 'edit-input');
	expect(onBlur).toHaveBeenCalledWith('foo', { 'edit-input': '1.5' });
});

test('Edit input cell onBlur callback with an invalid change of a float type', () => {
	const onBlur = jest.fn();

	const instance = renderer.create(
		<EditInputCell
			colId="edit-input"
			onBlur={onBlur}
			rowId="foo"
			type="float"
			value="1"
		/>
	).getInstance();
			
	expect(instance._onBlur(false, '1.00000000000000000005', 'edit-input')).toBe(undefined);
});
