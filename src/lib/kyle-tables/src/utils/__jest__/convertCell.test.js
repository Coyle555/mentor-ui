import { convertCellToString } from '../utils';

test('Converting cell value to string with an invalid argument', () => {
	let value = convertCellToString();

	expect(convertCellToString(null)).toBe('');
	expect(convertCellToString()).toBe('');
});

test('Converting cell value to string with a string arg', () => {
	expect(convertCellToString('foo')).toBe('foo');
});

test('Converting cell value to string with a number arg', () => {
	expect(convertCellToString(5)).toBe('5');
	expect(convertCellToString(0.25)).toBe('0.25');
});

test('Converting cell value to string with a boolean arg', () => {
	expect(convertCellToString(true)).toBe('true');
	expect(convertCellToString(false)).toBe('false');
});

test('Converting cell value to string with an object arg', () => {
	expect(convertCellToString([])).toBe('');
	expect(convertCellToString(['foo', 'bar', 'baz'])).toBe('');
	expect(convertCellToString({ name: 'foo' })).toBe('foo');
	expect(convertCellToString({})).toBe('');
	expect(convertCellToString({ test: '' })).toBe('');
});
