import { sortFormFields } from '../sortFormFields';

test('Sort empty form fields', () => {
	expect(sortFormFields()).toEqual([]);
});

test('Sort form fields with no linked field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar' }]))
		.toEqual([{ id: 'foo' }, { id: 'bar' }]);
});

test('Sort form fields with the linked field position == 1 behind the field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar', link: { to: 'foo' } }]))
		.toEqual([{ id: 'foo' }, { id: 'bar', link: { to: 'foo' } }]);
});

test('Sort form fields with the linked field position > 1 behind the field', () => {
	expect(sortFormFields([{ id: 'foo' }, { id: 'bar' }, { id: 'baz', link: { to: 'foo' } }]))
		.toEqual([{ id: 'foo' }, { id: 'baz', link: { to: 'foo' } }, { id: 'bar' }]);
});

test('Sort form fields with the linked field position before the field', () => {
	expect(sortFormFields([{ id: 'foo', link: { to: 'baz' } }, { id: 'bar' }, { id: 'baz' } ]))
		.toEqual([{ id: 'baz' }, { id: 'foo', link: { to: 'baz' } }, { id: 'bar' }]);
});

test('Larger list of fields with multiple connects', () => {
	expect(sortFormFields([
		{ id: 'text' },
		{ id: 'text2' },
		{ id: 'dependentField', link: { to: 'text2' } },
		{ id: 'text3' },
		{ id: 'text4' },
		{ id: 'text5', link: { to: 'text' } },
		{ id: 'text6', link: { to: 'text3' } },
		{ id: 'text7', link: { to: 'text4' } }
	])).toEqual([
		{ id: 'text' },
		{ id: 'text5', link: { to: 'text' } },
		{ id: 'text2' },
		{ id: 'dependentField', link: { to: 'text2' } },
		{ id: 'text3' },
		{ id: 'text6', link: { to: 'text3' } },
		{ id: 'text4' },
		{ id: 'text7', link: { to: 'text4' } },
	]);
});
