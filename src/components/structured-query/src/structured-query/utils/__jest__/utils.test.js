import {
	ASYNC_OPERATIONS,
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

	test('Async data type', () => {
		expect(_getLabelDataType([{ id: 'foo', asyncFilter: true }], 'foo')).toBe('async');
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
		{ id: 'i', label: 'I', asyncFilter: '/foo' },
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

		test('Async operators', () => {
			expect(_getOptionsForTypeahead(options, { id: 'i', label: 'A' }))
				.toEqual(ASYNC_OPERATIONS);
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
});
