jest.mock('mentor-inputs', () => {
	return {
		getMentorInput: () => props => <div>{JSON.stringify(props)}</div>,
		ListFilter: props => <div>{JSON.stringify(props)}</div>,
		SelectInput: props => <div>{JSON.stringify(props)}</div>,
		TableInput: props => <div>{JSON.stringify(props)}</div>,
	};
});

import { getInputComponent } from '../getInputComponent';

test('Getting a select input', () => {
	expect(getInputComponent({ options: ['foo', 'bar'] }, { id: 'baz' })).toMatchSnapshot();
});

test('Getting a list filter input w/ a list filter type', () => {
	expect(getInputComponent({ type: 'listfilter' }, { id: 'foo' })).toMatchSnapshot();
});

test('Getting a default input', () => {
	expect(getInputComponent({}, { id: 'default' })).toMatchSnapshot();
});
