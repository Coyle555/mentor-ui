jest.mock('mentor-inputs', () => {
	return { AsyncDropdown: (props) => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { AsyncDropdownCell } from '../asyncDropdownCell';
import renderer from 'react-test-renderer';

test('Default render of async dropdown cell', () => {
	const tree = renderer.create(<AsyncDropdownCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('onBlur callback of async dropdown cell', () => {
	const onBlur = jest.fn();
	const instance = renderer.create(<AsyncDropdownCell onBlur={onBlur} rowId="foo" />).getInstance();

	instance._onBlur(false, 'bar', 'baz');
	expect(onBlur).toHaveBeenCalledWith('foo', { baz: 'bar' });
});
