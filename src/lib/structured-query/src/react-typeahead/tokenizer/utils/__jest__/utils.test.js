import {
	ASYNC_OPERATIONS,
	ENUM_OPERATIONS,
	NUM_DATE_OPERATIONS,
	STRING_OPERATIONS
} from '../../constants';

import {
	_getCategoryDataType,
	_getCategoryOptions,
	_getHeader,
	_getInputDatatype,
	_isDuplicateToken,
	_getOptionsForTypeahead,
	validateToken
} from '../utils';

describe('Validate token utility function', () => {

	test('Token is not an object', () => {
		expect(validateToken('foo')).toBe(false);
	});

	test('Token has no id', () => {
		expect(validateToken({
			category: 'foo',
			operator: 'equals'
		})).toBe(false);
	});

	test('Token has no category', () => {
		expect(validateToken({
			id: 'foo',
			operator: 'equals'
		})).toBe(false);
	});

	test('Token has no operator', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo'
		})).toBe(false);
	});

	test('Token has no value and invalid operator when no value', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo',
			operator: '=='
		})).toBe(false);
	});

	test('Token has no value but valid "is empty" operator', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo',
			operator: 'is empty'
		})).toBe(true);
	});

	test('Token has no value but valid "is not empty" operator', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo',
			operator: 'is not empty'
		})).toBe(true);
	});

	test('Token has valid value and operator', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo',
			operator: 'contains',
			value: 'bar'
		})).toBe(true);
	});

	test('Token has invalid operator', () => {
		expect(validateToken({
			id: 'foo',
			category: 'foo',
			operator: '==',
			value: 'bar'
		})).toBe(false);
	});
});

describe('Get category data type utility function', () => {

	test('Enum options data type', () => {
		expect(_getCategoryDataType([{ id: 'foo', options: true }], 'foo')).toBe('enumoptions');
	});

	test('Async data type', () => {
		expect(_getCategoryDataType([{ id: 'foo', asyncFilter: true }], 'foo')).toBe('async');
	});

	test('Category data type', () => {
		expect(_getCategoryDataType([{ id: 'foo', type: 'string' }], 'foo')).toBe('string');
	});

	test('No data type attached to the option', () => {
		expect(_getCategoryDataType([{ id: 'foo' }], 'foo')).toBe('string');
	});

	test('Category not found in list of options', () => {
		expect(_getCategoryDataType([{ id: 'foo' }], 'bar')).toBe('string');
	});
});

describe('Get header utility function', () => {

	test('Next token has no category selected yet', () => {
		expect(_getHeader({ category: '', operator: '', value: '' })).toBe('Field');
	});

	test('Next token has no operator selected yet', () => {
		expect(_getHeader({ category: 'foo', operator: '', value: '' })).toBe('Operator');
	});

	test('Next token has no value selected yet', () => {
		expect(_getHeader({ category: 'foo', operator: 'bar', value: '' })).toBe('Value');
	});

	test('Invalid next token object', () => {
		expect(_getHeader()).toBe('Value');
	});
});

describe('Get category options utility function', () => {
	const options = [
		{ id: 'foo', options: ['1', '2'] },
		{ id: 'bar', options: ['a', 'b', 'c'], type: 'boolean' },
		{ id: 'baz', type: 'boolean' }
	];
	
	test('Category not found', () => {
		expect(_getCategoryOptions(options, 'test')).toEqual([]);
	});

	test('No list of options passed in', () => {
		expect(_getCategoryOptions()).toEqual([]);
	});

	test('Found option with a list', () => {
		expect(_getCategoryOptions(options, 'foo')).toEqual(['1', '2']);
	});

	test('Found option with a list and boolean type', () => {
		expect(_getCategoryOptions(options, 'bar')).toEqual(['a', 'b', 'c']);
	});

	test('Found option with a boolean type', () => {
		expect(_getCategoryOptions(options, 'baz')).toEqual(['True', 'False']);
	});
});

describe('Get input data type utility function', () => {
	
	test('Get the data type when category and operator are selected on next token', () => {
		expect(_getInputDatatype(
			{ id: 'foo', category: 'Foo', operator: '==' },
			[{ id: 'foo', type: 'text' }]
		)).toBe('text');
	});

	test('Get data type when token has no category', () => {
		expect(_getInputDatatype({ id: 'foo' })).toBe('string');
	});

	test('Get data type when token has no operator', () => {
		expect(_getInputDatatype({ id: 'foo', category: 'Foo' })).toBe('string');
	});
});

describe('Get options for the typeahead utility function', () => {
	const options = [
		{ id: 'a', category: 'A', type: 'string' },
		{ id: 'b', category: 'B', type: 'text' },
		{ id: 'c', category: 'C', type: 'email' },
		{ id: 'd', category: 'D', options: ['1', '2'] },
		{ id: 'e', category: 'E', type: 'boolean' },
		{ id: 'f', category: 'F', type: 'integer' },
		{ id: 'g', category: 'G', type: 'float' },
		{ id: 'h', category: 'H', type: 'datetime' },
		{ id: 'i', category: 'I', asyncFilter: '/foo' },
		{ id: 'j', category: 'J', type: 'invalid' }
	];

	test('Get empty list on no arguments', () => {
		expect(_getOptionsForTypeahead()).toEqual([]);
	});

	test('Getting category options when token has no category', () => {
		expect(_getOptionsForTypeahead(options, {}))
			.toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
	});

	describe('Getting operator options', () => {

		test('String operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'a', category: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Text operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'b', category: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Email operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'c', category: 'A' }))
				.toEqual(STRING_OPERATIONS);
		});

		test('Enumerated options operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'd', category: 'A' }))
				.toEqual(ENUM_OPERATIONS);
		});

		test('Boolean operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'e', category: 'A' }))
				.toEqual(ENUM_OPERATIONS);
		});

		test('Integer operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'f', category: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Float operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'g', category: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Datetime operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'h', category: 'A' }))
				.toEqual(NUM_DATE_OPERATIONS);
		});

		test('Async operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'i', category: 'A' }))
				.toEqual(ASYNC_OPERATIONS);
		});

		test('Invalid type operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'j', category: 'A' }))
				.toEqual([]);
		});
	});

	test('Get options when category and operator are selected', () => {
		expect(_getOptionsForTypeahead(
			options,
			{ id: 'd', category: 'D', operator: 'equals' }
		)).toEqual(['1', '2']);

		expect(_getOptionsForTypeahead(
			options,
			{ id: 'e', category: 'E', operator: 'equals' }
		)).toEqual(['True', 'False']);
	});
});

describe('Is duplicate token utility function', () => {
	const tokens = [
		{ category: 'Foo', operator: 'equals', value: 'foo' },
		{ category: 'Bar', operator: 'equals', value: 'bar' }
	];

	test('Duplicate token found in list', () => {
		expect(_isDuplicateToken(
			tokens,
			{ category: 'Bar', operator: 'equals', value: 'bar' }
		)).toBe(true);
	});

	test('Duplicate token not found in list', () => {
		expect(_isDuplicateToken(
			tokens,
			{ category: 'Bar', operator: 'equals', value: 'baz' }
		)).toBe(false);
	});
});
