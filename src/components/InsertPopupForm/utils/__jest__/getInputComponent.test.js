jest.mock('mentor-inputs', () => {
	return {
		getMentorInput: () => props => <div>{JSON.stringify(props)}</div>,
		ListFilter: props => <div>{JSON.stringify(props)}</div>,
		SelectInput: props => <div>{JSON.stringify(props)}</div>,
		TableInput: props => <div>{JSON.stringify(props)}</div>,
		TextareaInput: props => <div>{JSON.stringify(props)}</div>
	};
});

import { getInputComponent } from '../getInputComponent';

test('Getting a select input', () => {
	expect(getInputComponent({ options: ['foo', 'bar'] }, { id: 'baz' })).toMatchSnapshot();
});

test('Getting a list filter input w/ a custom filter', () => {
	expect(getInputComponent({ filter: '/filter' }, { id: 'foo' })).toMatchSnapshot();
	expect(getInputComponent(
		{ options: ['foo', 'bar', 'baz'], type: 'listfilter' },
		{ id: 'foo' })
	).toMatchSnapshot();
});

test('Getting a list filter input w/ a list filter type', () => {
	expect(getInputComponent({ type: 'listfilter' }, { id: 'foo' })).toMatchSnapshot();
});

test('Getting a multiline input', () => {
	expect(getInputComponent({ multiline: true }, { id: 'multi' })).toMatchSnapshot();
});

test('Getting a default input', () => {
	expect(getInputComponent({}, { id: 'default' })).toMatchSnapshot();
});
