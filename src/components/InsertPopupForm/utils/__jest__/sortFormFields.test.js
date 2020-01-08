import { sortFormFields } from '../sortFormFields';

test('Sort empty form fields', () => {
	expect(sortFormFields()).toEqual([]);
});

test('Sort form fields with no linked field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar' }]))
		.toEqual([{ id: 'foo' }, { id: 'bar' }]);
});

test('Sort form fields with the linked field position == 1 behind the field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar', linkTo: 'foo' }]))
		.toEqual([{ id: 'foo' }, { id: 'bar', linkTo: 'foo' }]);
});

test('Sort form fields with the linked field position > 1 behind the field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar' }, { id: 'baz', linkTo: 'foo' } ]))
		.toEqual([{ id: 'foo' }, { id: 'baz', linkTo: 'foo' }, { id: 'bar' }]);
});

test.only('Sort form fields with the linked field position before the field', () => {
	expect(sortFormFields([{ id: 'foo', linkTo: 'baz' }, { id: 'bar' }, { id: 'baz' } ]))
		.toEqual([{ id: 'baz' }, { id: 'foo', linkTo: 'baz' }, { id: 'bar' }]);
});
