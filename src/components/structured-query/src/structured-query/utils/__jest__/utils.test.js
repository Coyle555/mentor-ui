import {
	ENUM_OPERATIONS,
	NUM_DATE_OPERATIONS,
	STRING_OPERATIONS
} from '../../constants';

import {
	_getLabelDataType,
	_getLabelOptions,
	_getHeader,
	_getInputDatatype,
	_isDuplicateToken,
	_getOptionsForTypeahead,
	_getParseForOptions,
	validateToken
} from '../utils';

describe('Validate token utility function', () => {

	test('Token is not an object', () => {
		expect(validateToken('foo')).toBe(false);
	});

	test('Token has no id', () => {
		expect(validateToken({
			label: 'foo',
			operator: 'equals'
		})).toBe(false);
	});

	test('Token has no label', () => {
		expect(validateToken({
			id: 'foo',
			operator: 'equals'
		})).toBe(false);
	});

	test('Token has no operator', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo'
		})).toBe(false);
	});

	test('Token has no value and invalid operator when no value', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo',
			operator: '=='
		})).toBe(false);
	});

	test('Token has no value but valid "is empty" operator', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo',
			operator: 'is empty'
		})).toBe(true);
	});

	test('Token has no value but valid "is not empty" operator', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo',
			operator: 'is not empty'
		})).toBe(true);
	});

	test('Token has valid value and operator', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo',
			operator: 'contains',
			value: 'bar'
		})).toBe(true);
	});

	test('Token has invalid operator', () => {
		expect(validateToken({
			id: 'foo',
			label: 'foo',
			operator: '==',
			value: 'bar'
		})).toBe(false);
	});
});

describe('Get label data type utility function', () => {

	test('Enum options data type', () => {
		expect(_getLabelDataType([{ id: 'foo', options: true }], 'foo')).toBe('enumoptions');
	});

	test('label data type', () => {
		expect(_getLabelDataType([{ id: 'foo', type: 'string' }], 'foo')).toBe('string');
	});

	test('No data type attached to the option', () => {
		expect(_getLabelDataType([{ id: 'foo' }], 'foo')).toBe('string');
	});

	test('label not found in list of options', () => {
		expect(_getLabelDataType([{ id: 'foo' }], 'bar')).toBe('string');
	});
});

describe('Get header utility function', () => {

	test('Next token has no label selected yet', () => {
		expect(_getHeader({ label: '', operator: '', value: '' })).toBe('Field');
	});

	test('Next token has no operator selected yet', () => {
		expect(_getHeader({ label: 'foo', operator: '', value: '' })).toBe('Operator');
	});

	test('Next token has no value selected yet', () => {
		expect(_getHeader({ label: 'foo', operator: 'bar', value: '' })).toBe('Value');
	});

	test('Invalid next token object', () => {
		expect(_getHeader()).toBe('Value');
	});
});

describe('Get label options utility function', () => {
	const options = [
		{ id: 'foo', options: ['1', '2'] },
		{ id: 'bar', options: ['a', 'b', 'c'], type: 'boolean' },
		{ id: 'baz', type: 'boolean' }
	];
	
	test('label not found', () => {
		expect(_getLabelOptions(options, 'test')).toEqual([]);
	});

	test('No list of options passed in', () => {
		expect(_getLabelOptions()).toEqual([]);
	});

	test('Found option with a list', () => {
		expect(_getLabelOptions(options, 'foo')).toEqual(['1', '2']);
	});

	test('Found option with a list and boolean type', () => {
		expect(_getLabelOptions(options, 'bar')).toEqual(['a', 'b', 'c']);
	});

	test('Found option with a boolean type', () => {
		expect(_getLabelOptions(options, 'baz')).toEqual(['True', 'False']);
	});
});

describe('Get input data type utility function', () => {
	
	test('Get the data type when label and operator are selected on next token', () => {
		expect(_getInputDatatype(
			{ id: 'foo', label: 'Foo', operator: '==' },
			[{ id: 'foo', type: 'text' }]
		)).toBe('text');
	});

	test('Get data type when token has no label', () => {
		expect(_getInputDatatype({ id: 'foo' })).toBe('string');
	});

	test('Get data type when token has no operator', () => {
		expect(_getInputDatatype({ id: 'foo', label: 'Foo' })).toBe('string');
	});
});

describe('Get options for the typeahead utility function', () => {
	const options = [
		{ id: 'a', label: 'A', type: 'string' },
		{ id: 'b', label: 'B', type: 'text' },
		{ id: 'c', label: 'C', type: 'email' },
		{ id: 'd', label: 'D', options: ['1', '2'] },
		{ id: 'e', label: 'E', type: 'boolean' },
		{ id: 'f', label: 'F', type: 'integer' },
		{ id: 'g', label: 'G', type: 'float' },
		{ id: 'h', label: 'H', type: 'datetime' },
		{ id: 'i', label: 'I', options: () => {} },
		{ id: 'j', label: 'J', type: 'invalid' }
	];

	test('Get empty list on no arguments', () => {
		expect(_getOptionsForTypeahead()).toEqual([]);
	});

	test('Getting label options when token has no label', () => {
		expect(_getOptionsForTypeahead(options, {}))
			.toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
	});

	describe('Getting operator options', () => {

		test('String operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'a', label: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Text operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'b', label: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Email operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'c', label: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Enumerated options operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'd', label: 'A' }))
				.toEqual(ENUM_OPERATIONS);
		});

		test('Boolean operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'e', label: 'A' }))
				.toEqual(ENUM_OPERATIONS);
		});

		test('Integer operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'f', label: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Float operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'g', label: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Datetime operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'h', label: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Invalid type operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'j', label: 'A' }))
				.toEqual([]);
		});
	});

	test('Get options when label and operator are selected', () => {
		expect(_getOptionsForTypeahead(
			options,
			{ id: 'd', label: 'D', operator: 'equals' }
		)).toEqual(['1', '2']);

		expect(_getOptionsForTypeahead(
			options,
			{ id: 'e', label: 'E', operator: 'equals' }
		)).toEqual(['True', 'False']);
	});
});

describe('Is duplicate token utility function', () => {
	const tokens = [
		{ label: 'Foo', operator: 'equals', value: 'foo' },
		{ label: 'Bar', operator: 'equals', value: 'bar' }
	];

	test('Duplicate token found in list', () => {
		expect(_isDuplicateToken(
			tokens,
			{ label: 'Bar', operator: 'equals', value: 'bar' }
		)).toBe(true);
	});

	test('Duplicate token not found in list', () => {
		expect(_isDuplicateToken(
			tokens,
			{ label: 'Bar', operator: 'equals', value: 'baz' }
		)).toBe(false);
	});

	test('Duplicate token not found with an object value and parse', () => {
		const parse = jest.fn(val => val.name);
		const tokens = [{ label: 'Baz', operator: 'equals', value: { name: 'baz' } }];

		expect(_isDuplicateToken(
			tokens,
			{ label: 'Baz', operator: 'equals', value: { name: 'foo' } },
			parse
		)).toBe(false);

		expect(parse).toHaveBeenNthCalledWith(1, { name: 'foo' });
		expect(parse).toHaveBeenNthCalledWith(2, { name: 'baz' });
	});
	
	test('Duplicate token found with an object value and parse', () => {
		const parse = jest.fn(val => val.name);
		const tokens = [{ label: 'Baz', operator: 'equals', value: { name: 'baz' } }];

		expect(_isDuplicateToken(
			tokens,
			{ label: 'Baz', operator: 'equals', value: { name: 'baz' } },
			parse
		)).toBe(true);

		expect(parse).toHaveBeenNthCalledWith(1, { name: 'baz' });
		expect(parse).toHaveBeenNthCalledWith(2, { name: 'baz' });
	});
});

describe('Getting the parse function for an options list', () => {
	test('No fields', () => {
		expect(_getParseForOptions(
			[],
			{ id: 'foo', label: 'Foo', operator: 'equals' })
		).toBeNull();
	});

	test('Token with no id', () => {
		expect(_getParseForOptions([], {})).toBeNull();
	});

	test('Token with no label', () => {
		expect(_getParseForOptions([], { id: 'foo' })).toBeNull();
	});

	test('Token with no operator', () => {
		expect(_getParseForOptions([], { id: 'foo', label: 'Foo' })).toBeNull();
	});

	test('Token with no parse', () => {
		expect(_getParseForOptions(
			[{ id: 'foo' }],
			{ id: 'foo', label: 'Foo', operator: 'equals' })
		).toBe(undefined);
	});

	test('Token with a parse', () => {
		const parse = () => {}
		expect(_getParseForOptions(
			[{ id: 'foo', parse }],
			{ id: 'foo', label: 'Foo', operator: 'equals' })
		).toEqual(parse);
	});
});
