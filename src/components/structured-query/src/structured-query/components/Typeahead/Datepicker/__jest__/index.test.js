jest.mock('moment', () => {
	return () => ({ format: jest.fn((format) => format) });
});

jest.mock('mentor-inputs', () => {
	return { DatePicker: (props) => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { DatePicker } from '../index';
import renderer from 'react-test-renderer';

test('Default render of datepicker', () => {
	const updateDateValue = jest.fn();
	const tree = renderer.create(<DatePicker updateDateValue={updateDateValue} />).toJSON();

	expect(updateDateValue).toHaveBeenCalledWith('YYYY-MM-DD HH:mm');
	expect(tree).toMatchSnapshot();
});

test('Handling change of date', () => {
	const updateDateValue = jest.fn();
	const format = jest.fn();
	const instance = renderer.create(<DatePicker updateDateValue={updateDateValue} />).getInstance();

	instance.handleChange({ format });
	expect(instance.state.datetime).toStrictEqual({ format });
	expect(updateDateValue).toHaveBeenCalledWith('YYYY-MM-DD HH:mm');
});
